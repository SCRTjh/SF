<template>
    <el-menu background-color="#304156" text-color="#ffffff" class="el-menu-vertical-demo" :unique-opened="true"
        :router="true" :collapse="isCollapse" :default-active="$router.fullPath">
        <el-menu-item class="bg-[#222e3d] font-bold">
            <el-icon size="28px" class="is-loading">
                <Loading />
            </el-icon>
            <span class="ml-[5px] italic" v-show="!isCollapse">点餐平台·系统后台</span>
        </el-menu-item>
        <el-sub-menu index="a">
            <template #title>
                <el-icon>
                    <Platform />
                </el-icon>
                <span>菜品分类</span>
            </template>
            <el-menu-item index="/Manager/AddCategoryInfo">
                <el-icon>
                    <Plus />
                </el-icon>
                <template #title>新增分类</template>
            </el-menu-item>
            <el-menu-item index="/Manager/CategoryInfoList">
                <el-icon>
                    <Menu />
                </el-icon>
                <template #title>分类列表</template>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="b">
            <template #title>
                <el-icon>
                    <Shop />
                </el-icon>
                <span>菜品名称</span>
            </template>
            <el-menu-item index="/Manager/AddFoodInfo">
                <el-icon>
                    <Plus />
                </el-icon>
                <template #title>新增菜品</template>
            </el-menu-item>
            <el-menu-item index="/Manager/FoodInfoList">
                <el-icon>
                    <Menu />
                </el-icon>
                <template #title>菜品列表</template>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="c">
            <template #title>
                <el-icon>
                    <Avatar />
                </el-icon>
                <span>用户信息</span>
            </template>

            <el-menu-item index="/Manager/UserInfoList">
                <el-icon>
                    <Menu />
                </el-icon>
                <template #title>用户信息列表</template>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="d">
            <template #title>
                <el-icon>
                    <Promotion />
                </el-icon>
                <span>收货地址信息</span>
            </template>
            <el-menu-item index="/Manager/AddressInfoList">
                <el-icon>
                    <Menu />
                </el-icon>
                <template #title>收货地址列表</template>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="e">
            <template #title>
                <el-icon>
                    <List />
                </el-icon>
                <span>订单管理</span>
            </template>
            <el-menu-item index="/Manager/OrderInfoList">
                <el-icon>
                    <Menu />
                </el-icon>
                <template #title>订单列表</template>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="f">
            <template #title>
                <el-icon>
                    <Comment />
                </el-icon>
                <span>评论管理</span>
            </template>
            <el-menu-item index="/Manager/CommentInfoList">
                <el-icon>
                    <Menu />
                </el-icon>
                <template #title>评论列表</template>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="g">
            <template #title>
                <el-icon>
                    <Tools />
                </el-icon>
                <span>管理员信息</span>
            </template>
            <el-menu-item index="/Manager/AddAdminInfo">
                <el-icon>
                    <Menu />
                </el-icon>
                <template #title>新增管理员</template>
            </el-menu-item>
            <!-- <el-menu-item index="10">
                <el-icon>
                    <Menu />
                </el-icon>
                <template #title>修改密码</template>
            </el-menu-item> -->
            <el-menu-item index="/Manager/AdminInfoList">
                <el-icon>
                    <Menu />
                </el-icon>
                <template #title>管理员列表</template>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import {
    Menu,
    Promotion,
    Avatar,
    Shop,
    List,
    Comment,
    Platform,
    Tools,
    Loading,
    Plus
} from '@element-plus/icons-vue';
import { mainStore, } from "../store";

const store = mainStore();


const { isCollapse } = storeToRefs(store);


</script>
<style lang="scss" scoped>
:deep(.el-menu-vertical-demo:not(.el-menu--collapse)) {
    width: 200px;
    min-height: 400px;
}

:deep(.el-menu) {
    border-right: none !important;
}
</style>