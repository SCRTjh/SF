<template>
    <page-view class="relative flex flex-row justify-center items-center">
        <img src="../assets/img/leishen.jpg" class="absolute w-full h-full -z-10 blur-[30px]" alt="">
        <div class="login-box">
            <div class="flex flex-row justify-center items-center py-10">
                <el-icon size="36px" class="text-cyan-500">
                    <Eleme />
                </el-icon>
                <span class="text-[26px] font-bold text-cyan-500">欢迎使用饿了么点餐后台</span>
            </div>
            <el-form :model="adminInfo" ref="loginFormEL" class="box-border px-20 mt-10" :rules="adminInfoRules">
                <el-form-item prop="zh">
                    <el-input v-model="adminInfo.zh" placeholder="请输入账号">
                        <template #prepend>账号</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="admin_pwd">
                    <el-input v-model="adminInfo.admin_pwd" type="password" placeholder="请输入密码">
                        <template #prepend>密码</template>
                    </el-input>
                </el-form-item>
                <div class="flex flex-row justify-evenly">
                    <el-button type="primary" :loading-icon="Loading" :loading="isLoading" @click="submitLoginForm">登录系统
                    </el-button>
                    <el-button type="primary">忘记密码</el-button>
                </div>
            </el-form>
        </div>
    </page-view>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Eleme, Loading } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import API from "../utils/API";
import { mainStore } from "../store";


const isLoading = ref(false);

//创建路由
const router = useRouter();
//创建mainStore
const store = mainStore();
console.log(store);

const adminInfo = reactive({
    zh: "",
    admin_pwd: ""
})


//验证规则
const adminInfoRules = {
    zh: [
        { required: true, message: "请输入账号", trigger: blur }
    ],
    admin_pwd: [
        { required: true, message: "请输入密码", trigger: blur }
    ]
}

const loginFormEL = ref(null);

const submitLoginForm = () => {
    loginFormEL.value.validate((valid) => {
        if (valid) {
            console.log("验证成功");
            console.log(adminInfo);
            checkLogin();

        } else {
            console.log("验证失败");
        }
    })
}

const checkLogin = () => {
    isLoading.value = true;
    API.adminInfo.checkLogin({ zh: adminInfo.zh, admin_pwd: adminInfo.admin_pwd }).then(result => {
        console.log(result);
        store.setToken(result.token);
        store.setLoginUserInfo(result.loginUserInfo);
        ElNotification({
            title: "提示",
            message: "登录成功",
            type: "success"
        })

        //跳转路由
        router.replace({
            name: "DataView"
        })

    }).catch(error => {
        console.log(error);
    }).finally(() => {
        isLoading.value = false;

    })
}



</script>
<style scoped lang="scss">
.login-box {
    @apply w-[420px] p-20;
    box-shadow: 0 0 25px 10px white;
}
</style>