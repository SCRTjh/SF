<template>
    <page-view class="flex flex-col">
        <title-bar>
            点餐
        </title-bar>
        <div class="flex-1 overflow-auto">
            <Skeleton :row="8" :loading="isFirstLoading">
                <Swipe class="h-[200px]" :autoplay="5000">
                    <SwipeItem v-for="item in swiperImg" :key="item">
                        <img :src="baseURL + item" alt="" class="w-full h-full">
                    </SwipeItem>
                </Swipe>
                <List v-model:loading="isLoading" :finished="finished" finished-text="没有更多了" @load="loadNextPage"
                    loading-text="正在加载下一页">
                    <!-- 菜单列表 -->
                    <transition-group enter-active-class="animate__animated animate__flipInY">
                        <food-item v-for="(item, index) in listData" :key="item.id" :item-data="item"></food-item>
                    </transition-group>
                </List>
            </Skeleton>
        </div>
    </page-view>
</template>
<script>
import { Swipe, SwipeItem, List, Skeleton } from "vant"
import FoodItem from "../components/FoodItem.vue"
import API from "@/utils/API"
export default {
    name: "ChooseFood",
    inject: ["baseURL"],
    data() {
        return {
            pageIndex: 1,
            listData: [],
            pageCount: 0,
            isLoading: false,
            isFirstLoading: true,
            swiperImg: []
        }
    },
    created() {
        this.getListByPage();
    },
    methods: {
        async getListByPage(pageIndex = 1) {
            this.isLoading = true;
            try {
                let result = await API.foodInfo.getListByPage({ pageIndex });
                console.log(result);
                this.pageIndex = result.pageIndex;
                this.listData.push(...result.listData);
                this.pageCount = result.pageCount
                if (this.pageIndex == 1) {
                    this.swiperImg = result.listData.slice(0, 4).map(item => {
                        return item.food_img
                    });
                }
                this.isFirstLoading = false;
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },
        loadNextPage() {
            this.pageIndex++;
            this.getListByPage(this.pageIndex);
        }
    },
    computed: {
        finished() {
            return this.pageIndex >= this.pageCount;
        }
    },
    components: {
        Swipe,
        SwipeItem,
        List,
        Skeleton,
        FoodItem
    }
}
</script>
<style>

</style>