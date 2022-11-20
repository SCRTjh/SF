<template>
    <page-view>
        <el-card>
            <!-- 标题 -->
            <template #header>
                <div class="font-bold">菜品列表</div>
            </template>
            <!-- 查询表单 -->
            <el-form :model="queryFormData" :inline="true">
                <el-form-item label="菜品名称">
                    <el-input placeholder="请输入菜品名称" v-model="queryFormData.food_name"></el-input>
                </el-form-item>
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
                    <el-button plain type="info" :icon="CirclePlus">新增菜品</el-button>
                </el-form-item>
            </el-form>
            <div v-loading="isLoading">
                <!-- 展示数据 -->
                <el-table max-height="550" :data="resultData.listData" class="border stripe">
                    <el-table-column label="id" prop="id" width="70"></el-table-column>
                    <el-table-column label="菜品名称" prop="food_name" width="150"></el-table-column>
                    <el-table-column label="菜品分类" prop="categoryInfo.categoryName" width="120" align="center">
                    </el-table-column>
                    <el-table-column label="价格" prop="price" width="100"></el-table-column>
                    <el-table-column label="销售数量" prop="saleCount" width="100" align="center"></el-table-column>
                    <el-table-column label="菜品图片" prop="food_img">
                        <template #default="{ row }">
                            <el-image :src="baseURL + row.food_img" class="w-[50px] h-[50px]" fit="cover"
                                :preview-src-list="[baseURL + row.food_img]" :preview-teleported="true"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column label="菜品简述" prop="food_desc">
                        <template #default="{ row }">
                            <el-popover placement="top-start" title="菜品简述" width="200" trigger="hover"
                                :content="row.food_desc">
                                <template #reference>
                                    <el-link>
                                        {{ txtEllipsis(row.food_desc, 15) }}
                                    </el-link>
                                </template>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column label="菜品权重" width="230">
                        <template #default="{ row }">
                            <div class="flex flex-row justify-between items-center">
                                <el-slider :min="0" :max="100" :step="0.1" @change="val => weightChange(val, row.id)"
                                    v-model="row.weight" class="w-[250px]"></el-slider>
                                <span class="ml-10 w-[80px] text-[12px]">{{ row.weight }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template #default>
                            <el-button type="warning" size="small">编辑</el-button>
                            <el-button type="danger" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 页码 -->
                <div class="flex flex-row justify-between items-center mt-[10px]">
                    <div class="text-[14px]">
                        当前第{{ queryFormData.pageIndex }}页,
                        共{{ resultData.pageCount }}页,
                        共{{ resultData.totalCount }}记录
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
import { Search, CirclePlus } from "@element-plus/icons-vue";
import API from "../../utils/API";
import { txtEllipsis } from "@/utils/StringUtils.js"


const baseURL = inject("baseURL");

const isLoading = ref(true);

//表单请求参数
const queryFormData = reactive({
    food_name: "",
    category_name: "",
    pageIndex: 1
})
//请求返回数据
const resultData = reactive({
    listData: [],
    pageCount: 0,
    totalCount: 0
})


//查询操作
const queryData = () => {
    isLoading.value = true;
    API.foodInfo.getListByPage(queryFormData)
        .then(result => {
            console.log(result);
            resultData.listData = result.listData;
            resultData.pageCount = result.pageCount;
            resultData.totalCount = result.totalCount;


        }).catch(error => {
            console.log(error);
        }).finally(() => {
            isLoading.value = false;
        })
}

const currentChange = (index) => {
    console.log(index);
    queryFormData.pageIndex = index;
    queryData();
}

const weightChange = (weight, id) => {
    console.log('设置权重');
    API.foodInfo.setFoodInfoWeight({ weight, id });
}


onMounted(() => {
    queryData();
})

</script>
<style scoped>

</style>