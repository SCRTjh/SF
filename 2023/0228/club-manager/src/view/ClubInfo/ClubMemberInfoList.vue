<template>
    <page-view>
        <el-card>
            <template #header>
                用户列表
            </template>
            <!-- 搜索表单 -->
            <div v-if="queryFormData.user_club">
                <el-form  :model="queryFormData" :inline="true">
                    <el-form-item label="用户名称">
                        <el-input placeholder="输入用户名称查询" v-model="queryFormData.user_name" />
                    </el-form-item>
                    <el-form-item label="用户性别">
                        <el-select placeholder="选择用户性别" v-model="queryFormData.user_sex" clearable>
                            <el-option :value="'男'">男</el-option>
                            <el-option :value="'女'">女</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="queryData" :isLoading="isLoading">
                            <el-icon>
                                <Search />
                            </el-icon>
                            查询
                        </el-button>
                    </el-form-item>
                </el-form>
                <div v-loading="isLoading">
                    <el-table :data="resultData.listData" border stripe max-height="550">
                        <el-table-column label="id" prop="id" align="center" width="150"></el-table-column>
                        <el-table-column label="用户名称" prop="user_name" width="150"></el-table-column>
                        <el-table-column label="用户性别" prop="user_sex" width="100"></el-table-column>
                        <el-table-column label="用户头像" width="120">
                            <template #default="{ row }">
                            <el-image   :src="row?.user_photo?baseURL + row.user_photo:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" lazy fit="contain"
                                class="w-[100px] h-[100px]"></el-image>
                        </template>
                        </el-table-column>
                        <el-table-column label="所在学院" prop="user_institute" width="150"></el-table-column>
                        <el-table-column label="所在社团" prop="user_club" width="150"></el-table-column>
                        <el-table-column label="用户电话" prop="user_tel" width="150"></el-table-column>
                         <el-table-column label="角色"  width="150">
                            <template #default="{row}">
                                <el-tag :type="roleType[row.role_id]" >{{roleName[row.role_id]}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="用户邮箱" prop="user_email" ></el-table-column>
                        <!--
                        <el-table-column label="操作" width="150" align="center">
                            <template #default="{ row }">
                                <el-button type="warning" size="small"
                                    @click="$router.push({ name: 'EditUserInfo', params: { id: row.id } })">
                                    编辑
                                </el-button>
                                <el-popconfirm title="你确定要删除吗" @confirm="deleteCurrentItem(row.id)">
                                    <template #reference>
                                        <el-button type="danger" size="small">删除</el-button>
                                    </template>
                                </el-popconfirm>
                            </template>
                        </el-table-column> -->
                    </el-table>
                    <!-- 页码 -->
                    <div class="flex flex-row justify-between items-center mt-[10px]">
                        <div class="text-[14px]">
                            当前第{{ queryFormData.pageIndex }}页,共{{ resultData.pageCount }}条
                        </div>
                        <el-pagination background layout="prev,pager,next" :total="resultData.totalCount"
                            @current-change="currentChange" />
                    </div>
                </div>
            </div>
        </el-card>
    </page-view>
</template>
<script setup>
import { ref, reactive, onMounted, inject } from "vue";
import { Search } from "@element-plus/icons-vue";
import { mainStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import { txtEllipsis } from "@/utils/StringUtils.js";
import API from "@/utils/API/index.js";
import { ElNotification } from "element-plus"
import {useRouter} from "vue-router";


const router = useRouter();

const baseURL = inject("baseURL");
const store = mainStore();
const { userInfo } = storeToRefs(store);

const queryFormData = reactive({
    user_sex:"",
    user_name:"",
    user_club:"",
    pageIndex: 1
})
const resultData = reactive({
    listData: [],
    pageCount: 0,
    totalCount: 0
})

const roleType = reactive(['danger','warning','success','']);
const roleName = reactive(['超级管理员','管理员','社长','学生']);

const isLoading = ref(false);
const queryData = () => {
    isLoading.value = true;
    API.userInfo.getListByPage(queryFormData).then(result => {
        resultData.listData = result.listData;
        resultData.pageCount = result.pageCount;
        resultData.totalCount = result.totalCount;
    }).finally(() => {
        isLoading.value = false;
    })
}

// 页码发生变化
const currentChange = (index) => {
    queryFormData.pageIndex = index;
    queryData();
}
//删除按钮操作
const deleteCurrentItem = (id) => {
    API.userInfo.deleteById(id).then(result => {
        ElNotification({
            type: "success",
            title: "删除成功",
            message: "当前记录删除成功"
        });
        queryData();
    }).catch(error => {
        ElNotification({
            type: "error",
            title: "删除失败",
            message: "当前记录删除失败，请刷新重试或联系管理员"
        });
    })
}

onMounted(() => {
    queryFormData.user_club = userInfo.value.user_club;
    queryData();
})

</script>
<style scoped></style>