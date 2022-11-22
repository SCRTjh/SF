<template>
    <page-view>
        <el-card>
            <template #header>
                <div class="font-bold">
                    新增菜品分类信息列表
                </div>
            </template>
            <el-form :model="queryFormData" :rules="rules" ref="FormEl">
                <el-form-item label="菜品分类" prop="category_name">
                    <el-input v-model="queryFormData.category_name" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="isLoading" @click="UpdateData">保存数据</el-button>
                    <el-button type="info" @click="resetForm(FormEl)">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </page-view>

</template>
<script setup>
import { reactive, ref, onMounted } from "vue"
import API from "../../utils/API";
import { useRoute } from "vue-router";
import { ElMessage, ElNotification } from "element-plus";


const route = useRoute();
const isLoading = ref(false);

const FormEl = ref();

const rules = {
    category_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
}

const queryFormData = reactive({
    id: "",
    category_name: ""
})

const UpdateData = () => {
    isLoading.value = true;
    API.categoryInfo.update(queryFormData)
        .then(result => {
            console.log(result);
            ElNotification({
                type: "success",
                title: "提示",
                message: "更新数据成功"
            })
        }).catch(error => {
            ElNotification({
                type: "error",
                title: "提示",
                message: "更新数据失败"
            })
            console.log(error);
        }).finally(() => {
            isLoading.value = false;
        })

}

const getById = (id) => {
    isLoading.value = true;
    API.categoryInfo.getById({ id })
        .then(result => {
            console.log(result);
            queryFormData.category_name = result.category_name;
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            isLoading.value = false;

        })
}

const resetForm = (FormEl) => {
    if (!FormEl) return
    FormEl.resetFields()
}

onMounted(() => {
    queryFormData.id = route.params.id;
    getById(queryFormData.id);
})


</script>
<style scoped>

</style>