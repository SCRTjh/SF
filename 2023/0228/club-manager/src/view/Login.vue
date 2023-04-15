<template>
    <div class="login-page w-full h-full border-gray-800 overflow-auto">
      <transition enter-active-class="animate__animated animate__bounceInUp">
        <div class="big-box" v-if="isShowLoginBox">
          <div class="left-box relative">
            <h2 class="text-3xl py-2 mb-2 flex flex-row items-center justify-center">
              <el-icon style="font-size: 50px" class="is-loading mr-2.5">
                <loading/>
              </el-icon>
              高校学生社团管理后台
            </h2>
            <div class="outer-login-box flex-1 relative">
              <!--登录的表单的盒子-->
              <div class="form-box absolute left-0 top-0 w-full h-full px-[30px] box-border">
                <el-form ref="loginFormEl" :rules="userInfoRules" :model="userInfo" class="login-form">
                  <el-form-item prop="zh">
                    <el-input placeholder="手机号" v-model="userInfo.user_tel">
                      <template slot="prepend">账号</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="pwd">
                    <el-input placeholder="密码" show-password v-model="userInfo.user_pwd">
                      <template slot="prepend">密码</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button class="w-full" type="primary" @click="submitLoginForm" :loading="isLoading"
                               :loading-icon="Loading">登录系统
                    </el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="right-box">
            <img src="../assets/img/s8.jpg" class="w-full" alt="">
          </div>
        </div>
      </transition>
      <p class="fixed bottom-10 w-full left-0 flex flex-row justify-center text-white">&copy;copyright 武汉华夏理工学院·汤俊豪
        2023</p>
    </div>
  </template>
  
  <script setup>
  // 所见即所得，所见即所用
  import {reactive, ref,onMounted} from "vue";
  import {useRouter} from "vue-router";
  import {Eleme, Loading} from "@element-plus/icons-vue";
  import {ElNotification} from 'element-plus'
  import API from "../utils/API";
  // 因为导出的时候没有加default，所以这里导入就要解构
  import {mainStore} from "../store";
  
  const isLoading = ref(false);
  
  //得到路由管理对象
  const router = useRouter();
  
  //创建这个store
  const store = mainStore();
  
  const userInfo = reactive({
    user_tel: "15172227901",
    user_pwd: "1234567"
  });
  
  //这里就是验证规则
  const userInfoRules = {
    user_tel: [
      {required: true, message: "请输入账号", trigger: "blur"}
    ],
    user_pwd: [
      {required: true, message: "请输入密码", trigger: "blur"}
    ]
  }
  
  const isShowLoginBox = ref(false);
  onMounted(() => {
    isShowLoginBox.value = true;
  })
  
  
  const loginFormEl = ref(null);
  
  const submitLoginForm = () => {
    loginFormEl.value.validate(valid => {
      if (valid) {
        checkLogin();
      } else {
        console.log("验证失败");
      }
    });
  }
  
  
  const checkLogin = () => {
    isLoading.value = true;
    API.userInfo.checkLogin(userInfo)
        .then(result => {
          //登录成功的结果要干什么？
          store.setToken(result.token);
          store.setUserInfo(result.userInfo);
          //登录成功以后，还需要跳转页面····
          ElNotification({
            type: "success",
            title: "提示",
            message: "登录成功",
          });
        //   跳转路由
          router.replace({
            name: "MyInfo"
          });
        })
        .catch(error => {
          ElNotification({
            type: "error",
            title: "登录",
            message: error.msg,
          });
        }).finally(() => {
      isLoading.value = false;
    })
  }
  
  </script>
  
  <style scoped lang="scss">
  
  .login-page {
    background-image: url(../assets/img/login_bg2.jpg);
    background-size: 100% 100%;
  
    .big-box {
      width: 900px;
      box-shadow: 0px 0px 20px #ececec;
      border-radius: 6px;
      overflow: hidden;
      @apply flex flex-row m-auto mt-40 bg-white;
      .left-box {
        @apply w-1/2 p-[20px] text-gray-700 flex flex-col;
      }
  
      .right-box {
        @apply w-1/2 h-[250px];
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  </style>