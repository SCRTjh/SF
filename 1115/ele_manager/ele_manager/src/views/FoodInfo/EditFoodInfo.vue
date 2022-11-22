<template>
    <page-view>
        <el-card>
            <!-- 标题 -->
            <template #header>
                <div class="font-bold flex flex-row justify-between"><span>编辑菜品</span>
                    <el-link type="primary" @click="$router.push({ name: 'FoodInfoList' })">返回菜品列表
                    </el-link>
                </div>
            </template>
            <el-skeleton :rows="6" animated :loading="isLoading">
                <!-- 查询表单 -->
                <el-form :model="queryFormData" :rules="foodInfoDataRules" ref="FormEl">
                    <el-form-item label="菜品名称" prop="food_name">
                        <el-input v-model="queryFormData.food_name"></el-input>
                    </el-form-item>
                    <el-form-item label="菜品价格" prop="price">
                        <el-input v-model="queryFormData.price"></el-input>
                    </el-form-item>
                    <el-form-item label="菜品分类" prop="cid">
                        <el-select placeholder="请选择" v-model="queryFormData.cid" class="w-full">
                            <el-option v-for="item in queryFormData.categoryNameList " :key="item.id" :value="item.id"
                                :label="item.category_name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上传菜品图片" prop="food_img">
                        <el-upload v-loading="isUploadImg" element-loading-text="正在上传图片"
                            class="w-[200px] h-[300px] border border-dashed border-gray-400 flex flex-row justify-center items-center"
                            :action="baseURL + '/foodInfo/uploadFoodImg'" name="food_img"
                            :headers="{ softeem_ele_admin_token: store.token }" :show-file-list="false"
                            :on-success="handleImgSuccess" :before-upload="beforeImgUpload">
                            <el-image lazy v-if="queryFormData.food_img" :src="baseURL + queryFormData.food_img"
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
                    <el-form-item label="菜品描述" prop="food_desc">
                        <el-input type="textarea" v-model="queryFormData.food_desc"></el-input>
                    </el-form-item>
                    <el-form-item label="菜品权重" prop="weight">
                        <div class="flex flex-row justify-center items-center ml-10 w-[450px]">
                            <el-slider :min="0" :max="100" :step="0.1" v-model="queryFormData.weight">
                            </el-slider>
                            <el-tag class="ml-10 w-[24px] h-[24px] text-[12px]">{{ queryFormData.weight
                            }}
                            </el-tag>
                        </div>
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
import { useRouter, useRoute } from "vue-router";



const store = mainStore();

const route = useRoute();
const router = useRouter();
const baseURL = inject("baseURL");

const isLoading = ref(true);
const isUploadImg = ref(false);
const FormEl = ref(null);


const findById = () => {
    isLoading.value = true;
    let id = route.params.id;
    API.foodInfo.findById(id).then(result => {
        queryFormData.value = result;
    }).catch(error => {
        console.log(error);
    }).finally(() => {
        isLoading.value = false;
    })
}


//表单请求参数
const queryFormData = ref({
    categoryNameList: [],
    id: "",
    cid: "",
    food_name: "",
    price: 0,
    food_desc: "",
    food_img: "",
    weight: 0,

})

const foodInfoDataRules = {
    food_name: [{ required: true, message: "请输入菜品名称", trigger: "blur" }],
    price: [{ required: true, message: "请输入菜品价格", trigger: "blur" }],
    cid: [{ required: true, message: "请选择菜品类型", trigger: "blur" }],
    food_desc: [{ required: true, message: "请输入菜品描述", trigger: "blur" }],
    weight: [{ required: true, message: "请输入菜品菜品权重", trigger: "blur" }],
    food_img: [{ required: true, message: "请选择菜品图片", trigger: "blur" }],
}



//查询操作
const queryData = () => {
    isLoading.value = true;
    API.categoryInfo.getAllList(queryFormData)
        .then(result => {
            console.log(result);
            queryFormData.value.categoryNameList = result;

        }).catch(error => {
            console.log(error);
        }).finally(() => {
            isLoading.value = false;
        })
}

const handleImgSuccess = (result) => {
    console.log('图片上传成功');
    queryFormData.value.food_img = result.data;
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
            updateFoodInfo()
        } else {
            ElNotification({
                type: "warning",
                title: "提示",
                message: "请正确填写表单的内容"
            })
        }
    })
}



const updateFoodInfo = () => {
    isLoading.value = true;
    API.foodInfo.update(queryFormData.value)
        .then(result => {
            console.log(result);
            ElNotification({
                type: "success",
                title: "提示",
                message: "修改菜品成功"
            })
        }).catch(error => {
            ElNotification({
                type: "danger",
                title: "提示",
                message: "修改菜品失败"
            })
            console.log(error);
        }).finally(() => {
            isLoading.value = false;
        })
}

const resetForm = () => {
    if (!FormEl.value) return
    FormEl.value.resetFields()
}




onMounted(() => {
    queryData();
    findById();
})

</script>
<style scoped>
:deep(el-load) {
    @apply w-full h-full overflow-hidden
}
</style>