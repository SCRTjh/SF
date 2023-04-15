<template>
  <page-view>
    <el-card>
      <template #header>
        <div class="flex flex-row justify-between">
          <div class="font-bold">新增社团</div>
          <el-link type="primary" @click="$router.back()">返回列表</el-link>
        </div>
      </template>
      <el-form :model="formInfoData" label-width="120" :rules="formInfoDataRules" ref="formEl">
        <el-form-item label="社团名称" prop="club_name">
          <el-input placeholder="请输入社团名称" v-model="formInfoData.club_name" />
        </el-form-item>
        <el-form-item label="社团描述" prop="club_desc">
          <el-input placeholder="请输入社团描述" v-model="formInfoData.club_desc" />
        </el-form-item>
        <el-form-item label="社团长" prop="club_master">
          <el-input placeholder="请输入社团长名称" v-model="formInfoData.club_master" />
        </el-form-item>
        <el-form-item label="指导老师" prop="club_teacher">
          <el-input placeholder="请输入指导老师名称" v-model="formInfoData.club_teacher" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="isSubmiting" :loading-icon="Loading" @click="submitForm">保存数据
          </el-button>
          <el-button type="danger" @click="resetForm">重置表单</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </page-view>
</template>
  
<script setup>
import { ref, reactive, onMounted } from "vue";
import { Loading } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import API from "@/utils/API/index.js";
import { mainStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";


const router = useRouter();
const store = mainStore();
const { userInfo } = storeToRefs(store);



const formInfoData = reactive({
  club_name: "",
  club_desc: "",
  club_master: "",
  club_teacher: "",
});
const formInfoDataRules = {
  club_name: [{ required: true, message: "社团名称不能为空", trigger: "blur" }],
  club_desc: [{ required: true, message: "社团描述不能为空", trigger: "blur" }],
  club_master: [{ required: true, message: "社团长不能为空", trigger: "blur" }],
  club_teacher: [{ required: true, message: "指导老师不能为空", trigger: "blur" }],
}


const formEl = ref(null);

const isSubmiting = ref(false);
const submitForm = () => {
  formEl.value.validate(valid => {
    if (valid) {
      addClubInfo();
    } else {
      ElNotification({
        type: "warning",
        title: "表单错误",
        message: "请将表单信息输入完整"
      });
    }
  })
}


const addClubInfo = () => {
  isSubmiting.value = true;
  API.clubInfo.add(formInfoData)
    .then(result => {
      ElNotification({
        type: "success",
        title: "保存成功",
        message: "社团数据保存成功"
      });
      //   router.replace({name: "ClubInfoList"})
    })
    .finally(() => {
      isSubmiting.value = false;
    })
}

//重表单表
const resetForm = () => {
  formEl.value.resetFields();
}

onMounted(() => {
  if (!userInfo.value) {
    router.replace({
      name: "Login"
    })
  }
})

</script>
  
<style scoped></style>