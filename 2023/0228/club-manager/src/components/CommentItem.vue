<template>
    <div class="flex" >
        <div class="avater-box w-[50px] h-full">
            <img class="block rounded-full w-[40px] h-[40px] mx-5 object-fill " :src="info.userInfo.user_photo?baseURL + info.userInfo.user_photo:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
        </div>
        <div class="content-box flex flex-col p-5">
            <span class="name pb-5">{{info.userInfo.user_name}}</span>
            <p class="content text-[20px]">{{info.comment_desc}}</p>
            <p class="time text-gray-400 text-[14px]">{{formatDateTime(info.create_time)}}</p>
        </div>
    </div>

</template>
<script setup>
import {  ref, inject } from 'vue';
import { txtEllipsis } from "@/utils/StringUtils.js";
import { formatDateTime } from "@/utils/DateTimeUtils.js"



const baseURL = inject("baseURL");

const props = defineProps({
  info: Object,
})




</script>
<style scoped>

</style>