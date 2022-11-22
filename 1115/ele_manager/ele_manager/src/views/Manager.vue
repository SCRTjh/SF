<template>
    <page-view class="flex flex-row">
        <LeftMenu />
        <div class="flex-1 overflow-auto flex flex-col">
            <div class="nav-bar h-[55px] border border-solid bg-white flex items-center justify-between px-10">
                <el-icon @click="toggleIsCollapse" size="20px" class="cursor-pointer ">
                    <Fold class="hover:text-primaryColor transition-all" />
                </el-icon>
                <div class="history-list space-x-[4px]">
                    <router-link :to="{ name: item.routerName }" #default="{ navigate, isActive }" custom
                        v-for="item in historyList" :key="item.routerName">
                        <div @click="navigate" :class="{ active: isActive }" class="history-item">
                            {{ item.title }}
                            <span v-if="item.routerName != 'DataView'" class="close"
                                @click.stop="store.removeHistoryByRouterName(item.routerName)"></span>
                        </div>
                    </router-link>
                </div>
                <!-- 右边的用户下拉菜单 -->
                <el-dropdown @command="handleCommand">
                    <span class="text-primaryColor">
                        欢迎登录：{{ loginUserInfo?.admin_name }}
                        <el-icon class="text-primaryColor">
                            <ArrowDown />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>我的信息</el-dropdown-item>
                            <!-- <el-dropdown-item>修改密码</el-dropdown-item> -->
                            <el-dropdown-item command="logOut" divided>退出登录</el-dropdown-item>
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
import { ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

const store = mainStore();
const router = useRouter();

const { isCollapse, historyList, loginUserInfo } = storeToRefs(store);

const toggleIsCollapse = () => {
    store.setIsCollapse(!store.isCollapse);
}

const handleCommand = (command) => {
    switch (command) {
        case "logOut":
            logOut();
            break
    }
}

const logOut = () => {
    ElMessageBox.confirm("你确定要退出吗", "系统提示", {
        confirmButtonText: "确定退出",
        cancelButtonText: "我点错了",
        type: "warning"
    }).then(() => {
        store.logOut();
        router.replace({
            name: "Login"
        })
    }).catch(() => {

    })
}


</script>
<style scoped lang="scss">
.history-list {
    @apply px-[4px] flex-1 h-full flex flex-row items-center;

    .history-item {
        @apply relative border border-solid border-gray-700 text-gray-700 h-[30px] px-[5px] text-[12px] flex flex-row justify-center items-center cursor-pointer;

        &:hover {
            @apply text-cyan-500;

            .close {
                display: flex;
            }
        }

        .close {
            border: 1px solid currentColor;
            @apply w-[10px] h-[10px] absolute -right-[5px] -top-[5px] rounded-full flex flex-row justify-center items-center bg-white;
            display: none;

            &:hover {
                @apply text-red-500;
            }
        }
    }

    & .active {
        @apply bg-primaryColor text-white;
    }

}
</style>