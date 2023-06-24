<template>
  <page-view class="flex flex-row">
    <LeftMenu/>
    <div class="flex-1 overflow-auto flex flex-col">
      <div class="nav-bar h-[55px]  bg-white flex items-center justify-between px-10">
        <el-icon @click="toggleIsCollapse" size="20px" class="cursor-pointer ">
          <Fold class="hover:text-primaryColor transition-all"/>
        </el-icon>

        <!-- <div class="history-list space-x-[5px]">
          <router-link
              :to="{name:item.routeName}" custom v-for="item in historyList" :key="item.routeName"
              #default="{navigate,isActive}">
            <div class="history-item" :class="{active:isActive}" @click="navigate">
              {{ item.title }}
              <span v-if="item.routeName!='MyInfo'" class="close"
                    @click.stop="store.removeHisotryByRouteName(item.routeName)">x</span>
            </div>
          </router-link>
        </div> -->

        <!-- 右边的用户下拉菜单 -->
        <el-dropdown @command="handleCommand">
              <span class="text-primaryColor flex justify-center items-center">
                  欢迎登录：
                  <img class="block rounded-full w-[40px] h-[40px] mx-5 object-fill " :src="userInfo?.user_photo?baseURL + userInfo.user_photo:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
                  {{ userInfo?.user_name }}
                  <el-icon class="text-primaryColor">
                      <ArrowDown/>
                  </el-icon>
              </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="myInfo">我的信息</el-dropdown-item>
              <el-dropdown-item command="updateUserPwd">修改密码</el-dropdown-item>
              <el-dropdown-item divided command="logOut">退出登录</el-dropdown-item>
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
import {Fold, ArrowDown} from "@element-plus/icons-vue";
import {computed,inject, onMounted} from "vue";
import LeftMenu from '../components/LeftMenu.vue';
import {mainStore} from "../store";
import {storeToRefs} from "pinia";
import {ElMessageBox} from "element-plus";
import {useRouter} from "vue-router";

const baseURL = inject("baseURL");
const store = mainStore();
const {isCollapse, userInfo} = storeToRefs(store);
const router = useRouter();


const toggleIsCollapse = () => {
  store.setIsCollapse(!store.isCollapse);
}

const handleCommand = (command) => {
  switch (command) {
    case "logOut":
      logOut();
      break;
    case "updateUserPwd":
      router.push({name: "UpdateUserPwd"})
      break;
    case "myInfo":
      router.push({name: "MyInfo"});
      break;
  }
}

const logOut = () => {
  ElMessageBox.confirm("你确定要退出吗", "系统提示", {
    confirmButtonText: '确定退出',
    cancelButtonText: '我点错了',
    type: 'warning',
  }).then(() => {
    store.logOut();
    router.replace({
      name: "Login"
    });
  }).catch(() => {
  });
}



</script>
<style scoped lang="scss">

.history-list {
  @apply box-border px-[4px] flex-1 h-full flex flex-row items-center;
  .history-item {
    @apply text-gray-700 relative border border-solid border-current h-[26px] px-[5px] text-[12px] flex flex-row justify-center items-center cursor-pointer;
    &:hover {
      @apply text-primaryColor;
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

    &.active {
      @apply bg-primaryColor text-white border-gray-700;
    }
  }
}
</style>