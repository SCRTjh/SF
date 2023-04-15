<template>
  <div class=" p-12"> <el-card class="w-[300px]" :body-style="{ padding: '0px' }">
      <img v-if="info.activity_img" :src="baseURL + info.activity_img" class="image" />
      <img v-else src="../assets/img/s8.jpg" class="image" />
      <div style="padding: 14px">
        <span class="mr-5">{{ info.activity_name }}</span>
        <el-tag size="small" type="success">{{ info.activity_type }}</el-tag>
        <div class="bottom">
          <time class="time">{{ formatDateTime(info.start_time, "YYYY-MM-DD") + "至" +
            formatDateTime(info.end_time, "YYYY-MM-DD") }}</time>
          <el-button text class="button" @click="$router.push({name:'ActivityDetail',params:{id:info.id}})" >查看详情</el-button>
        </div>
      </div>
    </el-card></div>
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
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>