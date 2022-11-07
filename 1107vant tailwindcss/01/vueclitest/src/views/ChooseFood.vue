<template>
    <page-view class="flex flex-col">
        <title-bar>
            点餐
        </title-bar>
        <div class="flex-1 overflow-auto">
            <Swipe class="h-[200px]" :autoplay="5000">
                <SwipeItem>
                    <img src="../assets/img/edu.jpg" alt="" class="w-full h-full">
                </SwipeItem>
                <SwipeItem>
                    <img src="../assets/img/edu.jpg" alt="" class="w-full h-full">
                </SwipeItem>
                <SwipeItem>
                    <img src="../assets/img/edu.jpg" alt="" class="w-full h-full">
                </SwipeItem>
                <SwipeItem>
                    <img src="../assets/img/edu.jpg" alt="" class="w-full h-full">
                </SwipeItem>
            </Swipe>
            <!-- 菜单列表 -->
            <food-item v-for="(item,index) in 10" :key="index"></food-item>
        </div>
    </page-view>
</template>
<script>
import {Swipe,SwipeItem} from "vant"
import FoodItem from "../components/FoodItem.vue"
export default {
    name: "ChooseFood",
    components:{
        Swipe,
        SwipeItem,
        FoodItem
    }
}
</script>
<style>

</style>