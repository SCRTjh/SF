<template>
    <page-view>
        <el-card>
            <template #header>
                社团列表
            </template>
            <!-- 搜索表单 -->
            <el-form :model="queryFormData" :inline="true">
                <el-form-item label="社团名称">
                    <el-input placeholder="输入社团名称查询" v-model="queryFormData.club_name" />
                </el-form-item>
                <el-form-item label="辅导老师名称">
                    <el-input placeholder="输入辅导老师名称查询" v-model="queryFormData.club_teacher" />
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
                    <el-table-column label="社团名称" prop="club_name" width="150"></el-table-column>
                    <el-table-column label="社团描述">
                        <template #default="{ row, column, $index }">
                            <el-popover placement="top-start" title="社团简述" width="300" trigger="hover"
                                :content="row.club_desc">
                                <template #reference>
                                    <el-link underline>
                                        {{ txtEllipsis(row.club_desc, 60) }}
                                    </el-link>
                                </template>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column label="社团长名称" prop="club_master" width="150"></el-table-column>
                    <el-table-column label="辅导老师" prop="club_teacher" width="150"></el-table-column>
                    <el-table-column label="操作" width="150" align="center">
                        <template #default="{ row }">
                            <el-button v-if="userInfo.role_id == 3&&!hasApply"  type="success" size="small"
                                @click="joinClub(row.id)">
                                申请加入
                            </el-button>
                            <el-button v-if="hasApply" disabled>
                                已有社团或申请待审核
                            </el-button>
                            <el-button  v-if="[1,0].includes(userInfo.role_id)" type="warning" size="small"
                                @click="$router.push({ name: 'EditClubInfo', params: { id: row.id } })">
                                编辑
                            </el-button>
                            <el-popconfirm v-if="[1,0].includes(userInfo.role_id)" title="你确定要删除吗" @confirm="deleteCurrentItem(row.id)">
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
import API from "@/utils/API/index.js";
import { ref, reactive, onMounted, inject } from "vue";
import { ElNotification } from "element-plus"
import { Search } from "@element-plus/icons-vue";
import { txtEllipsis } from "@/utils/StringUtils.js";
import { mainStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import {useRouter} from "vue-router";


const router = useRouter();
const store = mainStore();
const { userInfo } = storeToRefs(store);

const baseURL = inject("baseURL");
const queryFormData = reactive({
    club_name: "",
    club_teacher: "",
    pageIndex: 1
})

const queryJoinClubData = reactive({
    user_id:"",
    club_id:""
})

const resultData = reactive({
    listData: [],
    pageCount: 0,
    totalCount: 0
})

const isLoading = ref(false);
const queryData = () => {
    isLoading.value = true;
    API.clubInfo.getListByPage(queryFormData).then(result => {
        resultData.listData = result.listData;
        resultData.pageCount = result.pageCount;
        resultData.totalCount = result.totalCount;
    }).finally(() => {
        isLoading.value = false;
    })
    checkApply();
}

// 页码发生变化
const currentChange = (index) => {
    queryFormData.pageIndex = index;
    queryData();
}
//删除按钮操作
const deleteCurrentItem = (id) => {
    API.clubInfo.deleteById(id).then(result => {
        ElNotification({
            type: "success",
            title: "删除成功",
            message: "当前记录删除成功"
        });
        queryData();
    }).catch(error => {
        ElNotification({
            type: "danger",
            title: "删除失败",
            message: "当前记录删除失败，请刷新重试或联系管理员"
        });
    })
};

const joinClub = (club_id)=>{
    queryJoinClubData.club_id = club_id;
    API.joinapplyInfo.add(queryJoinClubData).then(result => {
        ElNotification({
            type: "success",
            title: "提交申请成功",
            message: "当前记录提交成功"
        });
        queryData();
    }).catch(error => {
        ElNotification({
            type: "danger",
            title: "提交申请失败",
            message: "当前记录提交失败，请刷新重试或联系管理员"
        });
    })
}

const hasApply = ref(false);
const checkApply = ()=>{
    if(userInfo.value.role_id!=0&&userInfo.value.role_id!=1){
        API.joinapplyInfo.checkApply(userInfo.value.id).then(result =>{
            console.log(result);
            hasApply.value = result;
        })
    }
}

onMounted(() => {
    if(!userInfo.value){
    router.replace({
      name: "Login"
    });
  }
    checkApply();
    queryJoinClubData.user_id = userInfo.value.id;
    queryData();
})

</script>
<style scoped></style>