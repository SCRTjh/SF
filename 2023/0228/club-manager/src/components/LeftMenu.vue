<template>
  <el-menu
      background-color="#304156"
      text-color="#ffffff"
      class="el-menu-vertical-demo"
      :unique-opened="true"
      :router="true"
      :collapse="isCollapse"
      :default-active="$route.fullPath">
    <el-menu-item class="bg-[#222e3d] font-bold">
      <el-icon size="28px" class="is-loading">
        <Loading/>
      </el-icon>
      <span class="ml-[5px] italic" v-show="!isCollapse">高校社团·系统后台</span>
    </el-menu-item>
    <!-- <el-sub-menu index="a">
      <template #title>
        <el-icon>
          <Platform/>
        </el-icon>
        <span>社团信息</span>
      </template>
      <el-menu-item index="/Manager/AddClubInfo">
        <el-icon>
          <Menu/>
        </el-icon>
        <template #title>新增社团</template>
      </el-menu-item>
      <el-menu-item index="/Manager/ClubInfoList">
        <el-icon>
          <Menu/>
        </el-icon>
        <template #title>社团列表</template>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="b">
      <template #title>
        <el-icon>
          <Shop/>
        </el-icon>
        <span>申请信息</span>
      </template>
      <el-menu-item index="/Manager/ActivityInfoList">
        <el-icon>
          <Menu/>
        </el-icon>
        <template #title>活动申请信息列表</template>
      </el-menu-item>
      <el-menu-item index="/Manager/JoinApplyInfoList">
        <el-icon>
          <Menu/>
        </el-icon>
        <template #title>入部申请信息列表</template>
      </el-menu-item>
      <el-menu-item index="/Manager/ClubApplyInfoList">
        <el-icon>
          <Menu/>
        </el-icon>
        <template #title>社团入部申请信息列表</template>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="c">
      <template #title>
        <el-icon>
          <Avatar/>
        </el-icon>
        <span>用户信息</span>
      </template>
      <el-menu-item index="/Manager/UserInfoList">
        <el-icon>
          <Menu/>
        </el-icon>
        <template #title>用户信息列表</template>
      </el-menu-item>
      <el-menu-item index="/Manager/ClubMemberInfoList">
        <el-icon>
          <Menu/>
        </el-icon>
        <template #title>社团成员信息列表</template>
      </el-menu-item>
      <el-menu-item index="/Manager/addUserInfo">
        <el-icon>
          <Menu/>
        </el-icon>
        <template #title>新增用户</template>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="d">
      <template #title>
        <el-icon>
          <Promotion/>
        </el-icon>
        <span>活动</span>
      </template>
      <el-menu-item index="/Manager/ActivityShow">
        <el-icon>
          <Menu/>
        </el-icon>
        <template #title>活动展示</template>
      </el-menu-item>
      <el-menu-item index="/Manager/AddActivityInfo">
        <el-icon>
          <Menu/>
        </el-icon>
        <template #title>新增活动</template>
      </el-menu-item>
      <el-menu-item index="/Manager/CommentInfoList">
        <el-icon>
          <Menu/>
        </el-icon>
        <template #title>活动评论列表</template>
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="g">
      <template #title>
        <el-icon>
          <Tools/>
        </el-icon>
        <span>账号信息</span>
      </template>
      <el-menu-item index="/Manager/UpdateUserPwd">
        <el-icon>
          <Menu/>
        </el-icon>
        <template #title>修改密码</template>
      </el-menu-item>
    </el-sub-menu> -->
    <el-menu-item v-for="(item,index) of navData[userInfo?.role_id]" :index="item.index">
      <template #title>
        <el-icon>
          <Menu/>
        </el-icon>
        <span>{{ item.title }}</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>
<script setup>
import {ref, computed} from 'vue';
import navData from "@/utils/navData.js"
import {
  Menu,
  Promotion,
  Avatar,
  Shop,
  List,
  Comment,
  Platform,
  Tools,
  Loading
} from '@element-plus/icons-vue';

import {mainStore} from "../store";
import {storeToRefs} from "pinia";


const store = mainStore();
const { userInfo } = storeToRefs(store);
//store里面的值最好不要解构
// const isCollapse = store.isCollapse;
//用计算属性得到这个值
// const isCollapse = computed(() => store.isCollapse);

//一般情况下store是不解构的 ，如果非要解构，要使用特定的方法storeToRefs
const {isCollapse} = storeToRefs(store);


</script>
<style lang="scss" scoped>
.el-menu-vertical-demo {
  overflow-x: hidden;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>