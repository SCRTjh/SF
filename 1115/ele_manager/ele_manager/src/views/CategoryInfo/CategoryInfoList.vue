<template>
    <page-view>
        <el-card>
            <!-- 标题 -->
            <template #header>
                <div class="font-bold">菜品分类信息列表</div>
            </template>
            <!-- 查询表单 -->
            <el-form :model="queryFormData" :inline="true">
                <el-form-item label="分类名称">
                    <el-input placeholder="请输入分类名称" v-model="queryFormData.category_name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="queryData" :loading="isLoading">
                        <el-icon>
                            <Search />
                        </el-icon>
                        查询
                    </el-button>
                </el-form-item>
            </el-form>
            <div v-loading="isLoading">
                <!-- 展示数据 -->
                <el-table max-height="500" :data="resultData.listData" class="border stripe">
                    <el-table-column label="id" prop="id" align="center" width="50"></el-table-column>
                    <el-table-column label="菜品分类名称" align="center" prop="category_name" width="150"></el-table-column>
                    <el-table-column label="菜品总数" prop="foodInfoList.length" width="150" align="center">
                    </el-table-column>
                    <el-table-column align="center" label="添加时间">
                        <template #default="{ row }">
                            {{ formatDateTime(row.create_time) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template #default="{ row }">
                            <el-button type="info" size="small"
                                @click="$router.push({ name: 'EditCategoryInfo', params: { id: row.id } })">编辑</el-button>
                            <el-button type="danger" size="small" @click="deleteCategoryInfo(row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 页码 -->
                <div class="flex flex-row justify-between items-center mt-[10px]">
                    <div class="text-[14px]">
                        当前第{{ queryFormData.pageIndex }}页,
                        共{{ resultData.pageCount }}页,
                        共{{ resultData.totalCount }}页
                    </div>
                    <el-pagination background layout="prev,pager,next" :total="resultData.totalCount"
                        @current-change="currentChange"></el-pagination>
                </div>
            </div>
        </el-card>
    </page-view>
</template>
<script setup>
import { reactive, onMounted, inject, ref } from "vue"
import { Search } from "@element-plus/icons-vue";
import API from "../../utils/API";
import { formatDateTime } from "../../utils/DateTimeUtils"




const isLoading = ref(true);


//表单请求参数
const queryFormData = reactive({
    category_name: "",
    pageIndex: 1
})
//请求返回数据
const resultData = reactive({
    listData: [],
    pageCount: 0,
    pageStart: 0,
    pageEnd: 0,
    totalCount: 0
})


//查询操作
const queryData = () => {
    isLoading.value = true;
    API.categoryInfo.getListByPage(queryFormData)
        .then(result => {
            console.log(result);
            resultData.listData = result.listData;
            resultData.pageCount = result.pageCount;
            resultData.totalCount = result.totalCount;
            resultData.pageStart = result.pageStart;
            resultData.pageEnd = result.pageEnd;

        }).catch(error => {
            console.log(error);
        }).finally(() => {
            isLoading.value = false;
        })
}

const deleteCategoryInfo = (id) => {
    console.log(id);
    API.categoryInfo.deleteById({ id })
        .then(result => {
            console.log(result);
        })
    queryData();

}

const currentChange = (index) => {
    console.log(index);
    queryFormData.pageIndex = index;
    queryData();
}




onMounted(() => {
    queryData();
})

</script>
<style scoped>

</style>