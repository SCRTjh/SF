<template>
    <page-view class="flex flex-col">
        <title-bar :show-back="true">购物车</title-bar>
        <div class="flex-1 overflow-auto pb-[var(--van-submit-bar-height)]">
            <Tabs animated v-model:active="selectedIndex">
                <Tab title="购物车列表">
                    <List :loading="isLoading" loading-text="加载下一页" :finished="finished" finished-text="没有更多了"
                        @load="loadNextPage">
                        <transition-group leave-active-class="animate__animated animate__bounceOutLeft">
                            <SwipeCell v-for="item in shopCartListData" :key="item.id">
                                <Card :thumb="baseURL + item.foodInfo.food_img" :title="item.foodInfo.food_name"
                                    :price="item.foodInfo.price">
                                    <template #tags>
                                        <Stepper @plus="plusOne(item.fid)" @minus="minusOne(item.fid)" class="num-box"
                                            min="1" max="100" v-model="item.count" theme="round" button-size="16">
                                        </Stepper>
                                    </template>
                                    <template #num>
                                        <span class="text-red-500">小计:￥{{ (item.foodInfo.price * item.count).toFixed(2)
                                        }}</span>
                                    </template>
                                </Card>
                                <template #right>
                                    <Button type="danger" square="" class="h-full"
                                        @click="deleteCurrentItem(item.id)">删除</Button>
                                </template>
                            </SwipeCell>
                        </transition-group>
                    </List>
                </Tab>
                <Tab title="地址列表">
                    <AddressList :list="myAddressInfoList" v-model="chosenAddressId">

                    </AddressList>
                </Tab>
            </Tabs>
        </div>
        <SubmitBar :price="totalMoney" button-text="提交订单" @click="submitOrder"></SubmitBar>
    </page-view>
</template>
<script>
import { Tab, Tabs, Card, Stepper, SwipeCell, Button, Dialog, SubmitBar, List, AddressList, Toast, Notify } from 'vant';
import API from '@/utils/API';

export default {
    name: "ShopCartList",
    inject: ["baseURL"],
    data() {
        return {
            test: 1,
            pageIndex: 1,
            pageCount: 0,
            shopCartListData: [],
            isLoading: false,
            myAddressInfoList: [],
            chosenAddressId: "",
            //tab页面的选中的那个索引
            selectedIndex: 0
        }
    },
    created() {
        // 获取我的购物车
        this.getShopCartListByPage({ pageIndex: this.pageIndex });
        // 获取我的地址
        this.getMyAddressInfoList();
    },
    computed: {
        //小计
        totalMoney() {
            let sum = 0;
            this.shopCartListData.forEach(item => {
                sum += item.count * item.foodInfo.price;
            })
            return sum * 100;
        },
        finished() {
            return this.pageIndex >= this.pageCount;
        }
    },
    methods: {
        //根据页码获取购物车数据
        async getShopCartListByPage({ pageIndex }) {
            this.isLoading = true;
            let result = await API.shopCart.getShopCartListByPage({ pageIndex });
            console.log(result);
            this.pageCount = result.pageCount;
            this.shopCartListData.push(...result.listData);
            this.isLoading = false;
        },
        //删除当前菜品
        async deleteCurrentItem(id) {
            console.log(id);
            Dialog.confirm({
                title: "请确定",
                message: "你确定要删除吗？"
            }).then(async () => {
                await API.shopCart.deleteMyShopCartById(id);
                //本地删除
                let index = this.shopCartListData.findIndex(item => item.id == id);
                if (index != -1) {
                    this.shopCartListData.splice(index, 1);
                }
            }).catch(() => {

            })
        },
        plusOne(fid) {
            API.shopCart.addToShopCart({ fid, count: 1 })
        },
        minusOne(fid) {
            API.shopCart.addToShopCart({ fid, count: -1 })

        },
        loadNextPage() {
            if (this.pageIndex < this.pageCount) {
                this.pageIndex++;
                this.getShopCartListByPage({ pageIndex: this.pageIndex });
            }
        },
        async getMyAddressInfoList() {
            let result = await API.addressInfo.getMyAddressInfoList();
            let list = result.map(item => {
                return {
                    id: item.id,
                    name: item.person_name,
                    tel: item.phone,
                    address: item.address,
                    tag: item.tag
                }
            })
            this.myAddressInfoList = list;
            console.log(list);
        },
        async submitOrder() {
            //确认地址
            if (this.chosenAddressId) {
                let orderData = {
                    aid: this.chosenAddressId,
                    foodList: this.shopCartListData.map(item => {
                        return {
                            fid: item.fid,
                            count: item.count
                        }
                    })
                }
                console.log(orderData);

                await API.orderInfo.submitOrder(orderData);
                Toast.success("订单提交成功");
                this.$router.replace({ name: "Order" });

            } else {
                Notify({
                    type: "warning",
                    message: "请先选择地址"
                });
                this.selectedIndex = 1;
            }
        }
    },
    components: {
        Tab,
        Tabs,
        Card,
        Stepper,
        SwipeCell,
        Button,
        SubmitBar,
        List,
        AddressList
    }
}
</script>
<style scoped lang="scss">
.num-box {
    height: 100%;
    display: flex;
    // align-items: center;
}

// 样式穿透
:deep(.van-address-list__bottom) {
    display: none;
}
</style>