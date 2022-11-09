<template>
    <page-view class="flex flex-col">
        <title-bar>我的</title-bar>
        <div class="flex-1 overflow-auto">
            <div
                class="h=[200px] flex flex-col justify-center items-center h-[160px] bg-gradient-to-b from-primaryColor to-green-300">
                <img src="../assets/img/edu.jpg" alt="" class="w-[80px] h-[80px] rounded-full">
                <p @click="$router.push({ name: 'Login' })" class="text-[14px] text-gray-700 mt-[10px]">欢迎登录：</p>
            </div>
            <CellGroup title="操作信息">
                <Cell icon="shopping-cart-o" title="购物车列表" :is-link="true"></Cell>
                <Cell icon="shop-o" title="我的订单" :is-link="true"></Cell>
                <Cell icon="location-o" title="收货地址" :is-link="true"></Cell>
            </CellGroup>
        </div>
    </page-view>
</template>
<script>
import { CellGroup, Cell } from 'vant';
export default {
    name: "My",
    components: {
        CellGroup,
        Cell
    }
}
</script>
<style scoped>

</style>