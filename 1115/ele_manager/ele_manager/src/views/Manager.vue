<template>
    <page-view class="flex flex-row">
        <LeftMenu />
        <div class="flex-1 overflow-auto flex flex-col">
            <div class="nav-bar h-[55px] border border-solid bg-white flex items-center justify-between px-10">
                <div class="flex items-center justify-center">
                    <el-icon @click="toggleIsCollapse" size="20px" class="cursor-pointer ">
                        <Fold class="hover:text-primaryColor transition-all" />
                    </el-icon>
                    <el-button class="ml-10" type="info" size="small">首页</el-button>
                    <el-button class="ml-10" type="info" size="small">用户信息列表</el-button>
                    <el-button class="ml-10" type="primary" size="small">分类列表</el-button>
                </div>
                <!-- 右边的用户下拉菜单 -->
                <el-dropdown>
                    <span class="text-primaryColor">
                        欢迎登录：杨标
                        <el-icon class="text-primaryColor">
                            <ArrowDown />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>我的信息</el-dropdown-item>
                            <el-dropdown-item>修改密码</el-dropdown-item>
                            <el-dropdown-item divided>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <div class="bg-[#f5f7f9] flex-1 overflow-auto box-border p-5">
                <router-view></router-view>
            </div>
        </div>
    </page-view>
</template>
<script setup>
import { Fold, ArrowDown } from "@element-plus/icons-vue";

import LeftMenu from '../components/LeftMenu.vue';
import { mainStore } from "../store";
import { storeToRefs } from "pinia"
const store = mainStore();

const { isCollapse } = storeToRefs(store);

const toggleIsCollapse = () => {
    store.setIsCollapse(!store.isCollapse);
}
</script>
<style scoped lang="scss">
.collapse-width {
    width: calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2)
}
</style>