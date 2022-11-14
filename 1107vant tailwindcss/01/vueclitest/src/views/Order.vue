<template>
    <page-view class="flex flex-col ">
        <title-bar>订单</title-bar>
        <div class="flex-1 overflow-auto bg-gray-200">
            <my-loading :isLoading="isFirstLoading" v-if="loginUserInfo">
                <PullRefresh v-model="isLoading" @refresh="refreshData">
                    <List finished-text="没有更多的数据了" loading-text="正在加载数据..." :finished="pageIndex >= pageCount"
                        :loading="isLoading" @load="loadNextPageOrder">
                        <TransitionGroup enter-active-class="animate__animated animate__slideInUp">
                            <OrderItem v-for="item in orderList" :key="item.id" :orderList="item"></OrderItem>
                        </TransitionGroup>
                    </List>
                </PullRefresh>
            </my-loading>
            <p v-else class="text-center py-10 text-[14px]">你还没有登录，请先去
                <router-link class="text-primaryColor" :to="{ name: 'Login' }">
                    登录
                </router-link>
            </p>
        </div>
    </page-view>

</template>
<script>
import OrderItem from "../components/OrderItem.vue";
import { List, PullRefresh } from "vant";
import API from "@/utils/API";
import { mapGetters } from "vuex";
export default {
    name: "Order",
    data() {
        return {
            orderList: [],
            listData: [],
            pageIndex: 1,
            pageCount: 0,
            isLoading: true,
            isFirstLoading: true
        }
    },
    computed: {
        ...mapGetters(["loginUserInfo"])
    },
    activated() {
        if (this.loginUserInfo && this.isFirstLoading) {

            this.getMyOrderListByPage({ pageIndex: this.pageIndex });
        }
    },
    // created() {
    //     if (this.loginUserInfo) {
    //         this.getMyOrderListByPage({ pageIndex: this.pageIndex });

    //     }
    // },
    methods: {
        async getMyOrderListByPage({ pageIndex, isRefresh = false }) {
            this.isLoading = true;
            let result = await API.orderInfo.getMyOrderListByPage({ pageIndex: this.pageIndex });
            console.log(result);
            this.pageCount = result.pageCount;
            this.pageIndex = result.pageIndex;
            if (isRefresh) {
                this.listData = result.listData;
            } else {
                this.listData.push(...result.listData);
            }
            this.listData.forEach((item, index) => {
                this.orderList[index] = item;
                this.orderList[index].formatOrderDetailList = [];
                item.orderDetailList
                    .forEach(async item2 => {
                        this.orderList[index].formatOrderDetailList.push(await this.getFoodInfoById(item2.fid))
                    })
            })
            console.log(this.orderList);
            this.isLoading = false;
            this.isFirstLoading = false;
        },
        async getFoodInfoById(id) {
            let result = await API.foodInfo.findById(id);
            return result;
        },
        // async findOrderDetailById(id) {
        //     let result = await API.orderInfo.findById(id);

        // },
        loadNextPageOrder() {
            this.pageIndex++;
            this.getMyOrderListByPage(this.pageIndex)
        },
        refreshData() {
            this.pageIndex = 1;
            this.getMyOrderListByPage({ pageIndex: this.pageIndex, isRefresh: true })
        }
    },
    components: {
        OrderItem,
        List,
        PullRefresh
    }
}
</script>
<style>

</style>