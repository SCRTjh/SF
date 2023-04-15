<template>
  <page-view>
    <el-card>
      <template #header>
        <div class="font-bold">修改密码</div>
      </template>
      <el-form :model="formInfoData" :rules="formInfoDataRules" label-width="120" ref="formEl">
        <el-form-item label="用户名称">
          <el-input readonly :model-value="userInfo?.user_name"></el-input>
        </el-form-item>
        <el-form-item label="原始密码" prop="oldPwd">
          <el-input v-model="formInfoData.oldPwd" placeholder="请输入原始密码" show-password/>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="formInfoData.newPwd" placeholder="请输入新密码" show-password/>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm_pwd">
          <el-input v-model="formInfoData.confirm_pwd" placeholder="请输入确认密码" show-password/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">确认修改</el-button>
          <el-button type="danger">重置表单</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </page-view>
</template>

<script setup>
import {ref, reactive,onMounted} from "vue";
import {mainStore} from "@/store/index.js";
import {storeToRefs} from "pinia";
import {ElNotification} from "element-plus";
import API from "@/utils/API/index.js";
import {useRouter} from "vue-router";

const router = useRouter();
const store = mainStore();
const {userInfo} = storeToRefs(store);
const formInfoData = reactive({
  id:"",
  oldPwd: "",
  newPwd: "",
  confirm_pwd: ""
})
const formInfoDataRules = {
  oldPwd: [{required: true, message: "原始密码不能为空", trigger: "blur"}],
  newPwd: [{required: true, message: "新密码密码不能为空", trigger: "blur"}],
  confirm_pwd: [{required: true, message: "确认密码不能为空", trigger: "blur"}, {
    validator(rule, value, callBack) {
      if (value === "") {
        callBack(new Error("确认密码不能为空"))
      }
      if (value != formInfoData.newPwd) {
        callBack(new Error("确认密码与新密码不一致"))
      }
      callBack();
    }
  }],
}

const formEl = ref(null);

const submitForm = () => {
  formEl.value.validate(valid => {
    if (valid) {
      updateAdminPwd();
    } else {
      ElNotification({
        type: "warning",
        title: "表单错误",
        message: "请将表单信息输入完整"
      });
    }
  })
}

const updateAdminPwd = () => {
  API.userInfo.updateUserPwd(formInfoData)
      .then(result => {
        router.replace({name: "Login"})
        store.logOut();
        ElNotification({
          type: "success",
          title: "修改成功",
          message: "密码修改成功，请重新登录"
        });
      })
      .catch(error => {
        ElNotification({
          type: "warning",
          title: "修改失败",
          message: error?.msg
        })
      })
}

onMounted(()=>{
  formInfoData.id = userInfo.value.id;
})

</script>

<style scoped>

</style>