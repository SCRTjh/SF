<template>
    <div v-if="isLoading" class="flex flex-row justify-center py-[5px]">
        <Loading type="sponner" color="#1989fa">正在加载中...</Loading>
    </div>
    <slot v-else></slot>
</template>
<script>
import {Loading} from "vant";
export default{
    name:"MyLoading",
    props:{
        isLoading:{
            type:Boolean,
            default:true,
            require:true
        }
    },
    components:{
        Loading
    }
}
</script>
<style>
</style>