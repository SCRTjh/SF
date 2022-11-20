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
                    <el-input placeholder="请输入菜品分类名称" v-model="queryFormData.category_name" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="isLoading" @click="saveData">保存数据</el-button>
                    <el-button type="info" @click="resetForm(FormEl)">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </page-view>

</template>
<script setup>
import { reactive, ref } from "vue"
import API from "../../utils/API";

const isLoading = ref(false);

const FormEl = ref();

const rules = {
    category_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
}

const queryFormData = reactive({
    category_name: ""
})

const saveData = () => {
    isLoading.value = true;
    API.categoryInfo.add({ category_name: queryFormData.category_name })
        .then(result => {
            console.log(result);
        })
    isLoading.value = false;

}

const resetForm = (FormEl) => {
    if (!FormEl) return
    FormEl.resetFields()
}


</script>
<style scoped>

</style>