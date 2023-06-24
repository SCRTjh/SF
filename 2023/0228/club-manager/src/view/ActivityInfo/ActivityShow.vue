<template>
    <page-view>
        <el-card>
            <template #header>
                活动展示页
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
                <el-card>
                    <div class="flex flex-wrap justify-evenly">
                        <activity-cell v-for="(item, index) of resultData.listData" :key="item.id" :info="item"></activity-cell>
                    </div>
                </el-card>
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
import ActivityCell from "@/components/ActivityCell.vue";
import { Search } from "@element-plus/icons-vue";
import { txtEllipsis } from "@/utils/StringUtils.js";
import { formatDateTime } from "@/utils/DateTimeUtils.js"
import { onMounted, reactive,ref } from "vue";
import API from "@/utils/API/index.js";

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

const activityInfoList = reactive([]);


//所有社团的数据
const allClubInfoList = ref([]);
API.clubInfo.getAllList().then(result => allClubInfoList.value = result);



const isLoading = ref(false);
const queryData = () => {
    isLoading.value = true;
    API.activityInfo.getListByPage1(queryFormData).then(result => {
        console.log(result);
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


onMounted(() => {
    queryData();
})






</script>
<style scoped></style>