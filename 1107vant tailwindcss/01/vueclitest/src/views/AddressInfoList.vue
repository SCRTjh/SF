<template>
    <page-view class="flex flex-col address-list-page">
        <title-bar :show-back="true">我的收货地址</title-bar>
        <div class="flex-1 overflow-auto">
            <my-loading :isLoading="isLoading">
                <AddressList :list="list" @edit="editCurrentAddress">
                    <template #tag="item">
                        <Tag type="danger">{{ item.tag }}</Tag>
                    </template>
                    <template #item-bottom="item">
                        <div class="flex flex-row justify-end">
                            <Button type="danger" size="mini" @click="deleteAddressInfoListById(item.id)">删除</Button>
                        </div>
                    </template>
                </AddressList>
            </my-loading>
        </div>
        <div class="box-border px-4 py-2">
            <Button type="primary" block round plain size="small"
                @click="$router.push({ name: 'AddAddressInfo' })">新增地址</Button>
        </div>
    </page-view>
</template>
<script>
import { Button, AddressList, Tag, Notify, Toast, Dialog } from 'vant';
import API from '@/utils/API';
export default {
    name: "AddressInfoList",
    data() {
        return {
            list: [],
            isLoading: true
        }
    },
    created() {
        this.getMyAddressInfoList();
    },
    methods: {
        // 获取地址数据并处理
        async getMyAddressInfoList() {
            this.isLoading = true;
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
            this.list = list;
            this.isLoading = false;
        },
        //根据id删除地址数据
        async deleteAddressInfoListById(id) {
            Dialog.confirm({
                title: "请确认",
                message: "你确定要删除这一项地址吗？"
            }).then(async () => {
                await API.addressInfo.deleteById(id);
                let index = this.list.findIndex(item => item.id == id)
                if (index != -1) {
                    this.list.splice(index, 1);
                    Toast.success("删除地址成功");
                }
            }).catch(() => {
                Toast.fail("删除失败");
            })
        },
        //编辑地址
        editCurrentAddress(item, index) {
            console.log(item);
            this.$router.push({
                name: "EditAddressInfo",
                params: {
                    id: item.id
                }
            })
        }
    },
    components: {
        Button,
        AddressList,
        Tag
    }
}
</script>
<style scoped lang="scss">
.address-list-page {

    // 样式穿透
    :deep(.van-address-list__bottom) {
        display: none;
    }
}
</style>