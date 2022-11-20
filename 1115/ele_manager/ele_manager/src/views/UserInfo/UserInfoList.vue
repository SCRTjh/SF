<template>
    <page-view>
        <el-card>
            <!-- 标题 -->
            <template #header>
                <div class="font-bold">用户列表</div>
            </template>
            <!-- 查询表单 -->
            <el-form :model="queryFormData" :inline="true">
                <el-form-item label="用户昵称">
                    <el-input placeholder="请输入用户昵称" v-model="queryFormData.nickName"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select placeholder="请输入性别" v-model="queryFormData.user_sex">
                        <el-option v-for="item in ['男', '女']" :key="item" :value="item" :label="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input placeholder="请输入手机号" v-model="queryFormData.user_phone"></el-input>
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
                    <el-table-column type="expand" width="50">
                        <template #default="{ row }">
                            <div class="flex justify-center items-center">
                                <el-image :src="baseURL + row.user_photo" class="w-[100px] h-[100px]" fit="cover"
                                    :preview-src-list="[baseURL + row.user_photo]" :preview-teleported="true">
                                </el-image>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="id" prop="id" width="50"></el-table-column>
                    <el-table-column label="昵称" prop="nickName" width="70"></el-table-column>
                    <el-table-column label="性别" prop="user_sex" width="70" align="center">
                    </el-table-column>
                    <el-table-column label="手机号" align="center" prop="user_phone"></el-table-column>
                    <el-table-column label="邮箱" prop="user_email" align="center"></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template #default="{ row }">
                            <el-button type="danger" size="small" @click="deleteUserInfo(row.id)">删除</el-button>
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
import { Search } from "@element-plus/icons-vue";
import API from "../../utils/API";



const baseURL = inject("baseURL");

const isLoading = ref(true);


//表单请求参数
const queryFormData = reactive({
    nickName: "",
    user_sex: "",
    user_phone: "",
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
    API.userInfo.getListByPage(queryFormData)
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

const deleteUserInfo = (id) => {
    API.userInfo.deleteUserInfoItem({ id });
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