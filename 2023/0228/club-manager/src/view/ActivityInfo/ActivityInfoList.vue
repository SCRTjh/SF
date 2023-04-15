<template>
    <page-view>
        <el-card>
            <template #header>
                活动申请列表
            </template>
            <!-- 搜索表单 -->
            <el-form :model="queryFormData" :inline="true">
                <el-form-item label="活动名称">
                    <el-input placeholder="输入活动名称查询" v-model="queryFormData.activity_name" />
                </el-form-item>
                <el-form-item label="举办社团">
                    <el-select v-model="queryFormData.club_id" clearable>
                        <el-option v-for="item in allClubInfoList" :key="item.id" :label="item.club_name" :value="item.id">
                            {{ item.club_name }}
                        </el-option>
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
                    <el-table-column label="活动名称" prop="activity_name" width="150"></el-table-column>
                    <el-table-column label="活动描述">
                        <template #default="{ row, column, $index }">
                            <el-popover placement="top-start" title="社团简述" width="300" trigger="hover"
                                :content="row.activity_desc">
                                <template #reference>
                                    <el-link underline>
                                        {{ txtEllipsis(row.activity_desc, 30) }}
                                    </el-link>
                                </template>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column label="活动图片" width="120">
                        <template #default="{ row }">
                            <el-image  v-if="row.activity_img" :src="baseURL + row.activity_img" lazy fit="contain"
                                class="w-[100px] h-[100px]"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column label="活动区域" prop="activity_area" width="150"></el-table-column>
                    <el-table-column label="活动类型" prop="activity_type" width="150"></el-table-column>
                    <el-table-column label="开始时间" prop="start_time" width="200">
                        <template #default="{row}">
                            {{ formatDateTime(row.start_time) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="结束时间" prop="end_time" width="200">
                        <template #default="{row}">
                            {{ formatDateTime(row.end_time) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="状态"  width="150">
                        <template #default="{row}">
                            <el-tag :type="activityType[row.status]" >{{activityName[row.status]}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150" align="center">
                        <template #default="{ row }">
                            <el-button v-if="row.status==0" type="success" size="small"
                                @click="permitCurrentItem(row.id)">
                                同意
                            </el-button>                            
                            <el-button v-if="row.status==0" type="danger" size="small"
                                @click="rejectCurrentItem(row.id)">
                                拒绝
                            </el-button>                            
                            <!-- <el-button v-if="row.status!=0" type="warning" size="small"
                                @click="$router.push({ name: 'EditUserInfo', params: { id: row.id } })">
                                编辑
                            </el-button> -->
                            <el-popconfirm v-if="row.status!=0" title="你确定要删除吗" @confirm="deleteCurrentItem(row.id)">
                                <template #reference>
                                    <el-button type="danger" size="small">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
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
        </el-card>
    </page-view>
</template>
<script setup>
import { ref, reactive, onMounted, inject } from "vue";
import { Search } from "@element-plus/icons-vue";
import { txtEllipsis } from "@/utils/StringUtils.js";
import {formatDateTime} from "@/utils/DateTimeUtils.js"
import API from "@/utils/API/index.js";
import { ElNotification } from "element-plus"

const baseURL = inject("baseURL");
const queryFormData = reactive({
    activity_name: "",
    club_id: "",
    pageIndex: 1
});

const resultData = reactive({
    listData: [],
    pageCount: 0,
    totalCount: 0
});

//所有社团的数据
const allClubInfoList = ref([]);
API.clubInfo.getAllList().then(result => allClubInfoList.value = result);

const activityType = reactive(['','success','danger',]);
const activityName = reactive(['未处理','已同意','已拒绝']);

const isLoading = ref(false);
const queryData = () => {
    isLoading.value = true;
    API.activityInfo.getListByPage(queryFormData).then(result => {
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

//同意按钮操作
const permitCurrentItem = (id) => {
    API.activityInfo.permit(id).then(result =>{
        ElNotification({
            type:"success",
            title:"同意成功",
            message:"当前记录同意成功"
        });
        queryData();
    }).catch(error => {
        ElNotification({
            type: "error",
            title: "删除失败",
            message: "当前记录同意失败，请刷新重试或联系管理员"
        });
    })
}

//同意按钮操作
const rejectCurrentItem = (id) => {
    API.activityInfo.reject(id).then(result =>{
        ElNotification({
            type:"success",
            title:"拒绝成功",
            message:"当前记录拒绝成功"
        });
        queryData();
    }).catch(error => {
        ElNotification({
            type: "error",
            title: "拒绝失败",
            message: "当前记录拒绝失败，请刷新重试或联系管理员"
        });
    })
}

//删除按钮操作
const deleteCurrentItem = (id) => {
    API.activityInfo.deleteById(id).then(result => {
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
    queryData();
})

</script>
<style scoped></style>