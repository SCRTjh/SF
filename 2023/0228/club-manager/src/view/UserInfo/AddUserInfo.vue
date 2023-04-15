<template>
    <page-view>
      <el-card>
        <template #header>
          <div class="flex flex-row justify-between">
            <div class="font-bold">新增用户</div>
            <el-link type="primary" @click="$router.back()">返回列表</el-link>
          </div>
        </template>
        <el-form :model="formInfoData" label-width="120" :rules="formInfoDataRules" ref="formEl">
            <el-form-item label="用户头像" prop="user_photo">
          <el-upload
              v-loading="isUploadingImg"
              element-loading-text="正在上传图片"
              :action="baseURL+'/userInfo/uploadUserPhoto'"
              :headers="{authorization:store.token}"
              name="user_photo"
              class="w-[200px] h-[200px] border border-dashed border-gray-400 flex flex-row justify-center items-center"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :on-success="uploadSuccess">
            <el-image
                :src="baseURL+formInfoData.user_photo" v-if="formInfoData.user_photo" fit="contain"
                class="w-full h-full" lazy>
              <template #placeholder>
                <div class="text-primaryColor text-[14px] w-full h-full flex flex-row justify-center items-center">
                  正在加载图片...
                </div>
              </template>
            </el-image>
            <el-icon size="65px" color="#808080" v-else>
              <PictureFilled/>
            </el-icon>
          </el-upload>
        </el-form-item>
          <el-form-item label="用户名称" prop="user_name">
            <el-input placeholder="请输入管理员名称" v-model="formInfoData.user_name"/>
          </el-form-item>
          <el-form-item label="用户密码" prop="user_pwd">
            <el-input placeholder="请输入密码" v-model="formInfoData.user_pwd" show-password/>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm_pwd">
            <el-input placeholder="请输入确认密码" v-model="formInfoData.confirm_pwd" show-password/>
          </el-form-item>
          <el-form-item label="用户性别" prop="user_sex">
            <el-select v-model="formInfoData.user_sex" placeholder="请选择别性别">
              <el-option value="男">男</el-option>
              <el-option value="女">女</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户手机号" prop="user_tel">
            <el-input v-model="formInfoData.user_tel" placeholder="请输入用户手机号"/>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="user_email">
            <el-input v-model="formInfoData.user_email" placeholder="请输入用户邮箱"/>
          </el-form-item>
          <el-form-item label="所在社团" prop="user_club">
            <el-input v-model="formInfoData.user_club" placeholder="请输入所在社团"/>
          </el-form-item>
          <el-form-item label="所在学院" prop="user_institute">
            <el-select v-model="formInfoData.user_institute" placeholder="请选择所在学院">
                <el-option value="信息工程学院">信息工程学院</el-option>
                <el-option value="商学院">商学院</el-option>
                <el-option value="外国语学院">外国语学院</el-option>
                <el-option value="汽车学院">汽车学院</el-option>
                <el-option value="生物与制药学院">生物与制药学院</el-option>
                <el-option value="艺术学院">艺术学院</el-option>
                <el-option value="体育学院">体育学院</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色" prop="role_id">
            <el-select v-model="formInfoData.role_id" placeholder="请选择角色">
                <el-option :value="3" label="学生"></el-option>
                <el-option :value="2" label="社长"></el-option>
                <el-option :value="1" label="管理员"></el-option>
            </el-select>
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
  import {ref, reactive,inject} from "vue";
  import {mainStore} from "../../store/index.js";
  import {PictureFilled,Loading} from "@element-plus/icons-vue";
  import {ElNotification} from "element-plus";
  import API from "@/utils/API/index.js";
  import {useRouter} from "vue-router";
  
  const baseURL = inject("baseURL");
  const store = mainStore();

  const router = useRouter();
  
  const formInfoData = reactive({
    user_name: "",
    user_photo:"",
    user_pwd: "",
    confirm_pwd: "",     //确认密码
    user_sex: "",
    user_tel: "",
    user_email: "",
    user_club:"",
    user_institute:"",
    role_id:""
  });
  const formInfoDataRules = {
    user_name: [{required: true, message: "用户名称不能为空", trigger: "blur"}],
    user_pwd: [{required: true, message: "用户密码不能为空", trigger: "blur"}],
    confirm_pwd: [{required: true, message: "确认密码不能为空", trigger: "blur"}, {
      validator(rule, value, callBack) {
        if (value === "") {
          callback(new Error('请输入确认密码'))
        }
        if (value != formInfoData.user_pwd) {
          callBack(new Error("再次密码必须相同"))
        }
        callBack();
      }, trigger: "blur"
    }],
    user_sex: [{required: true, message: "用户性别不能为空", trigger: "blur"}],
    user_tel: [{required: true, message: "用户手机号不能为空", trigger: "blur"}, {
      validator(rule, value, callBack) {
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(value)) {
          callBack();
        } else {
          callBack(new Error("请输入正确的手机号"));
        }
      },
      trigger: "blur"
    }],
    user_email: [{required: true, message: "用户邮箱不能为空", trigger: "blur"}, {
      validator(rule, value, callBack) {
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (reg.test(value)) {
          callBack();
        } else {
          callBack(new Error("请输入正确的邮箱"));
        }
      }, trigger: "blur"
    }],
    user_institute: [{required: true, message: "用户所在学院不能为空", trigger: "blur"}],
  }
  
  
  const formEl = ref(null);
  
  const isSubmiting = ref(false);
  const submitForm = () => {
    formEl.value.validate(valid => {
      if (valid) {
        addUserInfo();
      } else {
        ElNotification({
          type: "warning",
          title: "表单错误",
          message: "请将表单信息输入完整"
        });
      }
    })
  }

  //上传图片之前的操作
const isUploadingImg = ref(false);
const beforeUpload = (rawFile) => {
  let reg = /^image\/(jpe?g|png|webp|gif|bmp)$/;
  if (reg.test(rawFile.type)) {
    //说明是个图片
    if (rawFile.size / 1024 / 1024 > 5) {
      //说明图片大于5M
      ElNotification({
        type: "error",
        title: "错误",
        message: "图片的大小不能大于5M"
      });
      return false;
    } else {
      //开始上传了
      isUploadingImg.value = true;
    }
  } else {
    //说明不是一个图片
    ElNotification({
      type: "error",
      title: "错误",
      message: "请选择图片文件，图片格式必须是jpg,jpeg,png,webp,gif,bmp格式"
    });
    return false;
  }
}

//上传图片成功以后的操作
const uploadSuccess = (result) => {
  console.log(result);
  formInfoData.user_photo = result.data;
  isUploadingImg.value = false;
}
  
  
  const addUserInfo = () => {
    isSubmiting.value = true;
    API.userInfo.add(formInfoData)
        .then(result => {
          ElNotification({
            type: "success",
            title: "保存成功",
            message: "用户数据保存成功"
          });
          router.replace({name: "UserInfoList"})
        })
        .finally(() => {
          isSubmiting.value = false;
        })
  }
  
  //重表单表
  const resetForm = () => {
    formEl.value.resetFields();
  }
  </script>
  
  <style scoped>
  
  </style>