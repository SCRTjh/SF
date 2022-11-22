<template>
    <page-view>
        <el-card>
            <!-- 标题 -->
            <template #header>
                <div class="font-bold">新增管理员</div>
            </template>
            <el-skeleton :rows="6" animated :loading="isLoading">
                <!-- 查询表单 -->
                <el-form :model="queryFormData" :rules="adminInfoDataRules" ref="FormEl">
                    <el-form-item label="管理员名称" prop="admin_name">
                        <el-input v-model="queryFormData.admin_name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="admin_pwd">
                        <el-input type="password" v-model="queryFormData.admin_pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="re_admin_pwd">
                        <el-input type="password" v-model="queryFormData.re_admin_pwd"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="admin_sex">
                        <el-select placeholder="请选择" v-model="queryFormData.admin_sex" class="w-full">
                            <el-option v-for="item in ['男', '女'] " :key="item" :value="item" :label="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上传管理员照片" prop="admin_photo">
                        <el-upload v-loading="isUploadImg"
                            class="w-[200px] h-[300px] border border-dashed border-gray-400 flex flex-row justify-center items-center"
                            :action="baseURL + '/adminInfo/uploadAdminPhoto'" name="admin_photo"
                            :headers="{ softeem_ele_admin_token: store.token }" :show-file-list="false"
                            :on-success="handleImgSuccess" :before-upload="beforeImgUpload">
                            <el-image v-if="queryFormData.admin_photo" :src="baseURL + queryFormData.admin_photo"
                                fit="cover">
                                <template #placeholder>
                                    <div
                                        class="text-primaryColor text-[14px] flex justify-center items-center w-full h-full">
                                        正在加载图片...</div>
                                </template>
                            </el-image>
                            <el-icon v-else size="65px" color="#808080">
                                <PictureFilled />
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="admin_tel">
                        <el-input v-model="queryFormData.admin_tel"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="admin_email">
                        <el-input v-model="queryFormData.admin_email"></el-input>
                    </el-form-item>
                    <el-form-item label="管理员类型" prop="admin_type">
                        <el-select placeholder="请选择" v-model="queryFormData.admin_type" class="w-full">
                            <el-option v-for="(item, index) in ['普通管理员', '超级管理员'] " :key="item" :value="index"
                                :label="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()" :loading="isLoading" :loading-icon="Loading">
                            保存数据
                        </el-button>
                        <el-button :loading="isLoading" @click="resetForm()">
                            重置
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-skeleton>
        </el-card>
    </page-view>
</template>
<script setup>
import { reactive, onMounted, inject, ref } from "vue"
import { PictureFilled, Loading } from "@element-plus/icons-vue";
import { ElMessage, ElNotification } from "element-plus"
import API from "../../utils/API";
import { mainStore } from "../../store";
import { useRoute } from "vue-router";

const route = useRoute();
const store = mainStore();



const baseURL = inject("baseURL");

const isLoading = ref(false);
const isUploadImg = ref(false);
const FormEl = ref(null);


//表单请求参数
const queryFormData = ref({
    id: "",
    admin_name: "",
    admin_pwd: "",
    re_admin_pwd: "",
    admin_sex: "",
    admin_tel: "",
    admin_email: "",
    admin_photo: "",
    admin_type: ""

})

const confirmAgain = (rule, value, callback) => {
    if (value === queryFormData.value.admin_pwd) {
        callback()
    } else {
        callback(new Error("两次密码不一致,请再次输入!"))
    }
}
const adminInfoDataRules = {
    admin_name: [{ required: true, message: "请输入管理员名称", trigger: "blur" }],
    admin_pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
    re_admin_pwd: [{ required: true, message: "请再次确认密码", trigger: "blur" }, { validator: confirmAgain, trigger: "blur" }],
    admin_sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
    admin_tel: [{ required: true, message: "请输入手机号", trigger: "blur" }, { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: "请输入手机号", trigger: "blur" }],
    admin_email: [{ required: true, message: "请输入电子邮箱", trigger: "blur" }, { pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, message: "请输入电子邮箱", trigger: "blur" }],
    admin_photo: [{ required: true, message: "请选择管理员照片", trigger: "blur" }],
    admin_type: [{ required: true, message: "请选择管理员类型", trigger: "blur" }],
}





const handleImgSuccess = (result) => {
    console.log('图片上传成功');
    queryFormData.value.admin_photo = result.data;
    isUploadImg.value = false;
}

const beforeImgUpload = (rawFile) => {
    isUploadImg.value = true;
    if (!/^image\/(jpe?g|png|webp|gif|bmp)$/.test(rawFile.type)) {
        ElMessage.error('文件必须是图片格式！')
        return false
    } else if (rawFile.size / 1024 / 1024 > 5) {
        ElMessage.error('图片大小不能超过 5MB!')
        return false
    }
    return true
}

// 发送新增数据
const submitForm = () => {
    FormEl.value.validate(valid => {
        if (valid) {
            updateAdminInfo()
        } else {
            ElNotification({
                type: "warning",
                title: "提示",
                message: "请正确填写表单的内容"
            })
        }
    })
}



const updateAdminInfo = () => {
    isLoading.value = true;
    API.adminInfo.update(queryFormData.value)
        .then(result => {
            console.log(result);
            ElNotification({
                type: "success",
                title: "提示",
                message: "更新管理员成功"
            })
        }).catch(error => {
            ElNotification({
                type: "danger",
                title: "提示",
                message: "更新管理员失败"
            })
            console.log(error);
        }).finally(() => {
            isLoading.value = false;

        })
}

const getById = ({ id }) => {
    API.adminInfo.findById({ id })
        .then(result => {
            queryFormData.value = result
        }).catch(error => {
            console.log(error);
        })
}

const resetForm = () => {
    if (!FormEl.value) return
    FormEl.value.resetFields()
}

onMounted(() => {
    queryFormData.value.id = route.params.id;
    getById({ id: queryFormData.value.id });
})




</script>
<style scoped>
:deep(el-load) {
    @apply w-full h-full overflow-hidden
}
</style>