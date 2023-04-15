<template>
    <page-view>
        <el-card>
            <template #header>
                <div class="flex flex-row justify-between">
                    <div class="font-bold">新增活动</div>
                    <el-link type="primary" @click="$router.back()">返回列表</el-link>
                </div>
            </template>
            <el-form :model="formInfoData" label-width="120" :rules="formInfoDataRules" ref="formEl">
                <el-form-item label="活动图片" prop="activity_img">
                    <el-upload v-loading="isUploadingImg" element-loading-text="正在上传图片"
                        :action="baseURL + '/activityInfo/uploadActivityImage'" :headers="{ authorization: store.token }"
                        name="activity_img"
                        class="w-[200px] h-[200px] border border-dashed border-gray-400 flex flex-row justify-center items-center"
                        :before-upload="beforeUpload" :show-file-list="false" :on-success="uploadSuccess">
                        <el-image :src="baseURL + formInfoData.activity_img" v-if="formInfoData.activity_img" fit="contain"
                            class="w-full h-full" lazy>
                            <template #placeholder>
                                <div
                                    class="text-primaryColor text-[14px] w-full h-full flex flex-row justify-center items-center">
                                    正在加载图片...
                                </div>
                            </template>
                        </el-image>
                        <el-icon size="65px" color="#808080" v-else>
                            <PictureFilled />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="活动名称" prop="activity_name">
                    <el-input placeholder="请输入活动名称" v-model="formInfoData.activity_name" />
                </el-form-item>
                <el-form-item label="活动描述" prop="activity_desc">
                    <el-input placeholder="请输入活动描述" v-model="formInfoData.activity_desc" />
                </el-form-item>
                <el-form-item label="活动地点" prop="activity_area">
                    <el-input placeholder="请输入活动地点" v-model="formInfoData.activity_area" />
                </el-form-item>
                <el-form-item label="活动类型" prop="activity_type">
                    <el-select v-model="formInfoData.activity_type" placeholder="请选择活动类型">
                        <el-option value="社团招新">社团招新</el-option>
                        <el-option value="日常活动">日常活动</el-option>
                        <el-option value="社团比赛">社团比赛</el-option>
                        <el-option value="社团展示">社团展示</el-option>
                        <el-option value="其他">其他</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="评论时间">
                    <el-date-picker v-model="formInfoData.dateRange" type="daterange" range-separator="To"
                        start-placeholder="开始时间" end-placeholder="结束时间" value-format="YYYY-MM-DD" />
                </el-form-item>
                <el-form-item label="社团">
                    <el-select v-model="formInfoData.club_id" clearable>
                        <el-option v-for="item in allClubInfoList" :key="item.id" :label="item.club_name" :value="item.id">
                            {{ item.club_name }}
                        </el-option>
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
import { ref, reactive, inject, watch } from "vue";
import { mainStore } from "../../store/index.js";
import { PictureFilled, Loading } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import API from "@/utils/API/index.js";
import { useRouter } from "vue-router";

const baseURL = inject("baseURL");
const store = mainStore();

const router = useRouter();

const formInfoData = reactive({
    activity_name: "",
    activity_img: "",
    activity_desc: "",
    activity_area: "",
    activity_type: "",
    start_time: "",
    end_time: "",
    // status:"",
    club_id: "",
    dateRange: []
});


watch(() => formInfoData.dateRange, (newValue) => {
    if (Array.isArray(newValue)) {
        formInfoData.start_time = newValue[0];
        formInfoData.end_time = newValue[1];
    } else {
        formInfoData.start_time = "";
        formInfoData.end_time = "";
    }
})


//所有社团的数据
const allClubInfoList = ref([]);
API.clubInfo.getAllList().then(result => allClubInfoList.value = result);

const formInfoDataRules = {
    activity_name: [{ required: true, message: "活动名称不能为空", trigger: "blur" }],
    activity_desc: [{ required: true, message: "活动描述不能为空", trigger: "blur" }],
    activity_area: [{ required: true, message: "活动地点不能为空", trigger: "blur" }],
    activity_type: [{ required: true, message: "活动类型不能为空", trigger: "blur" }],
    start_time: [{ required: true, message: "开始时间不能为空", trigger: "blur" }],
    end_time: [{ required: true, message: "结束时间不能为空", trigger: "blur" }],
}

const formEl = ref(null);

const isSubmiting = ref(false);
const submitForm = () => {
    formEl.value.validate(valid => {
        if (valid) {
            addActivityInfo();
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
    formInfoData.activity_img = result.data;
    isUploadingImg.value = false;
}


const addActivityInfo = () => {
    isSubmiting.value = true;
    API.activityInfo.add(formInfoData)
        .then(result => {
            ElNotification({
                type: "success",
                title: "保存成功",
                message: "用户数据保存成功"
            });
            router.replace({ name: "UserInfoList" })
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
  
<style scoped></style>