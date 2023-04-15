<template>
    <page-view>
        <el-card>
            <template #header>
                入社申请列表
            </template>
            <!-- 搜索表单 -->
            <el-form :model="queryFormData" :inline="true">
                <el-form-item label="用户">
            <el-select v-model="queryFormData.user_id" clearable filterable>
              <el-option v-for="item in allUserInfoList" :key="item.id" :label="item.user_name" :value="item.id">
                {{ item.user_name }}
              </el-option>
            </el-select>
          </el-form-item>           
                <el-form-item label="状态">
                    <el-select v-model="queryFormData.status" clearable>
                        <el-option v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="评论时间">
                    <el-date-picker v-model="queryFormData.dateRange" type="daterange" range-separator="To"
                        start-placeholder="开始时间" end-placeholder="结束时间" value-format="YYYY-MM-DD" />
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
                    <el-table-column label="用户名称" prop="userInfo.user_name" width="150"></el-table-column>
                    <el-table-column label="社团名称" prop="clubInfo.club_name" width="150"></el-table-column>
                    <el-table-column label="上次更新时间" prop="create_time" width="200">
                        <template #default="{ row }">
                            {{ formatDateTime(row.create_time) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" width="150">
                        <template #default="{ row }">
                            <el-tag :type="activityType[row.status]">{{ activityName[row.status] }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150" align="center">
                        <template #default="{ row }">
                            <el-button v-if="row.status == 0" type="success" size="small" @click="permitCurrentItem(row.id)">
                                同意
                            </el-button>
                            <el-button v-if="row.status == 0" type="danger" size="small" @click="rejectCurrentItem(row.id)">
                                拒绝
                            </el-button>
                            <!-- <el-button v-if="row.status!=0" type="warning" size="small"
                                @click="$router.push({ name: 'EditUserInfo', params: { id: row.id } })">
                                编辑
                            </el-button> -->
                            <el-popconfirm v-if="row.status != 0" title="你确定要删除吗" @confirm="deleteCurrentItem(row.id)">
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
import { ref, reactive, onMounted, inject, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
import { formatDateTime } from "@/utils/DateTimeUtils.js"
import { mainStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import API from "@/utils/API/index.js";
import { ElNotification } from "element-plus"

const store = mainStore();
const { userInfo } = storeToRefs(store);

const baseURL = inject("baseURL");
const queryFormData = reactive({
    user_id:"",
    user_club:"",
    status: "",
    startTime: "",
    endTime: "",
    pageIndex: 1,
    dateRange: []
});

watch(() => queryFormData.dateRange, (newValue) => {
    if (Array.isArray(newValue)) {
        queryFormData.startTime = newValue[0];
        queryFormData.endTime = newValue[1];
    } else {
        queryFormData.startTime = "";
        queryFormData.endTime = "";
    }
});

  //所有用户数据
  const allUserInfoList = ref([]);
  API.userInfo.getAllList().then(result => allUserInfoList.value = result);
  

const statusOption = ref([
    {label:"未处理",value:"0"},
    {label:"已同意",value:"1"},
    {label:"已拒绝",value:"2"},
])

const resultData = reactive({
    listData: [],
    pageCount: 0,
    totalCount: 0
});

//所有社团的数据
const allClubInfoList = ref([]);
API.clubInfo.getAllList().then(result => allClubInfoList.value = result);

const activityType = reactive(['', 'success', 'danger',]);
const activityName = reactive(['未处理', '已同意', '已拒绝']);

const isLoading = ref(false);
const queryData = () => {
    isLoading.value = true;
    API.joinapplyInfo.getListByPage(queryFormData).then(result => {
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
    API.joinapplyInfo.permit(id).then(result => {
        ElNotification({
            type: "success",
            title: "同意成功",
            message: "当前记录同意成功"
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

//拒绝按钮操作
const rejectCurrentItem = (id) => {
    API.joinapplyInfo.reject(id).then(result => {
        ElNotification({
            type: "success",
            title: "拒绝成功",
            message: "当前记录拒绝成功"
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
    API.joinapplyInfo.deleteById(id).then(result => {
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