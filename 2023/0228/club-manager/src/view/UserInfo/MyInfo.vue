<template>
    <page-view>
      <el-card>
        <el-descriptions title="我的信息" :column="1" border size="large" >
          <el-descriptions-item label="昵称" label-align="center" label-class-name="w-[120px]">{{userInfo.user_name}}</el-descriptions-item>
          <el-descriptions-item label="性别" label-align="center">{{ userInfo.user_sex }}</el-descriptions-item>
          <el-descriptions-item label="手机号" label-align="center">{{ userInfo.user_tel }}</el-descriptions-item>
          <el-descriptions-item label="邮箱" label-align="center">{{ userInfo.user_email }}</el-descriptions-item>
          <el-descriptions-item label="所在学院" label-align="center">{{ userInfo.user_institute }}</el-descriptions-item>
          <el-descriptions-item label="所在社团" label-align="center">{{ userInfo.user_club }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </page-view>
  </template>
  
  <script setup>
  import { onMounted } from "vue";
  import {mainStore} from "@/store/index.js";
  import {storeToRefs} from "pinia";
  import {useRouter} from "vue-router";
  
  const store = mainStore();
  const router = useRouter();
  const {userInfo} = storeToRefs(store);

  onMounted(()=>{
    if(!userInfo.value){
      router.replace({
        name:"Login"
      })
    }
  })
  </script>
  
  <style scoped>
  
  </style>