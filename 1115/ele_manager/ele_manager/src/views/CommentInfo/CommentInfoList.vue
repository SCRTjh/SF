<template>
    <page-view>
        <el-card>
            <!-- 标题 -->
            <template #header>
                <div class="font-bold">评论列表</div>
            </template>
            <!-- 查询表单 -->
            <el-form :model="queryFormData" :inline="true">
                <el-form-item label="菜品名称">
                    <el-input placeholder="请输入菜品名称" v-model="queryFormData.food_name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-form-item label="时间">
                        <el-date-picker v-model="timeArr" type="daterange" start-placeholder="开始日期"
                            end-placeholder="结束日期" :default-value="[new Date(2020, 1, 1), new Date(2023, 10, 1)]" />
                    </el-form-item>
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
                    <el-table-column label="id" prop="id" width="80"></el-table-column>
                    <el-table-column label="菜品名称" prop="foodInfo.food_name"></el-table-column>
                    <el-table-column label="评论时间" align="center">
                        <template #default="{ row }">
                            {{ formatDateTime(row.create_time) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="用户" prop="userInfo.nickName" width="80"></el-table-column>

                    <el-table-column label="评论内容" width="300">
                        <template #default="{ row }">
                            <el-link :underline="true" type="primary">{{ txtEllipsis(row.comment_text, 15) }}
                                <el-Icon>
                                    <View />
                                </el-Icon>
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="星级" prop="star" align="center">
                        <template #default="{ row }">
                            <el-rate v-model="row.star" />
                            <span class="text-[#f7ba2a]">{{ row.star }}分</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="80">
                    </el-table-column>
                    <el-table-column width="80">
                    </el-table-column>
                    <el-table-column width="80">
                    </el-table-column>
                    <el-table-column>
                        <template #default="{ row }">
                            <el-switch v-model="row.isShow" class="ml-2"
                                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
                            <span>{{ row.isShow ? "显示" : "不显示" }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template #default="{ row }">
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
import { reactive, onMounted, ref } from "vue"
import { Search, View } from "@element-plus/icons-vue";
import API from "../../utils/API";
import { txtEllipsis } from "@/utils/StringUtils.js";
import { formatDateTime } from "../../utils/DateTimeUtils";




const isLoading = ref(true);

const timeArr = ref("");


//表单请求参数
const queryFormData = reactive({
    food_name: "",
    start_time: timeArr.value ? timeArr.value[0].getTime() : "",
    end_time: timeArr.value ? timeArr.value[1].getTime() : "",
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
    API.commentInfo.getListByPage(queryFormData)
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