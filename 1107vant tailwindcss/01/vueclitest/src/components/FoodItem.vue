<template>
    <div class="h-[90px]  flex flex-row relative p-[4px] border-0 border-b border-solid border-gray-400">
        <img src="../assets/img/edu.jpg" class="w-[110px] h-full" alt="">
        <ul class="flex-1 overflow-auto text-[12px] flex flex-col justify-between ml-[4px]">
            <li class="text-[18px] font-bold">麻球</li>
            <li class="text-red-500">月售：</li>
            <li>价格：14.00</li>
            <li>分类：饿菜</li>
        </ul>
        <div class="absolute right-[5px] top-[5px]  rounded-full p-[2px]">
            <span class="iconfont icon-heart text-[24px] text-red-600"></span>
        </div>
    </div>
</template>
<script>
export default {
    name: "FoodItem"
}
</script>
<style lang="scss" scoped>

</style>