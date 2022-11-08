<template>
    <page-view>
        <title-bar :show-back="true">【{{foodDetail?.food_name}}】菜品详情</title-bar>
        <my-loading :isLoading="!foodDetail">
            <div class="flex-1 overflow-auto" v-if="foodDetail">
               <div class="w-full h-[230px]">
                <img v-lazy="baseURL + foodDetail.food_img" class="w-full h-full object-cover">
               </div>
               <ul class="text-[14px] leading-[22px] box-border p-[5px] border-0 border-b border-dash border-gray-200">
                <li><span class="font-bold">菜品名称：</span>{{foodDetail.food_name}}</li>
                <li><span class="font-bold">价格：</span>{{foodDetail.price}}</li>
                <li><span class="font-bold">类别：</span>{{foodDetail.categoryInfo.category_name}}</li>
                <li class="indent-[2em]">{{foodDetail.food_desc}}</li>
               </ul>
            </div>
            <ActionBar>
                <ActionBarIcon class="cart-o" text="购物车" badge="0"></ActionBarIcon>
                <ActionBarIcon class="balance-o" text="金额" badge="0"></ActionBarIcon>
                <ActionBarIcon class="star" text="已收藏" color="#ff5500"></ActionBarIcon>
                <ActionBarButton type="warning" text="加入购物车"></ActionBarButton>
                <ActionBarButton type="danger" text="立即购买"></ActionBarButton>
            </ActionBar>
        </my-loading>
    </page-view>
</template>
<script>
import { ActionBar,ActionBarIcon,ActionBarButton} from 'vant';
import API from '@/utils/API';
export default {
    name: "FoodDetail",
    inject:["baseURL"],
    data() {
        return {
            isLoading:false,
            foodDetail:null
        }
    },
    created(){
        this.findById(this.$route.params.id);
        console.log(this.$route.params.id);
    },
    methods: {
        async findById(id){
            let result = await API.foodInfo.findById(id);
            this.foodDetail = result;
        }
    },
    components:{
        ActionBar,ActionBarIcon,ActionBarButton
    }
}
</script>
<style>

</style>