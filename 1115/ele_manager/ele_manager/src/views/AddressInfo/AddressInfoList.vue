<template>
    <page-view>
        <el-card>
            <!-- 标题 -->
            <template #header>
                <div class="font-bold">地址列表</div>
            </template>
            <!-- 查询表单 -->
            <el-form :model="queryFormData" :inline="true">
                <el-form-item label="用户昵称">
                    <el-input placeholder="请输入用户昵称" v-model="queryFormData.nickName"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input placeholder="请输入手机号" v-model="queryFormData.phone"></el-input>
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

                    <el-table-column label="id" prop="id" width="80" align="center"></el-table-column>
                    <el-table-column label="所属用户" prop="userInfo.nickName" width="100" align="center"></el-table-column>
                    <el-table-column label="手机号" prop="phone" align="center"></el-table-column>
                    <el-table-column label="地址" prop="address" align="center"></el-table-column>
                    <el-table-column label="联系人" prop="person_name" align="center"></el-table-column>
                    <el-table-column label="标签" prop="tag" align="center"></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template #default="{ row }">
                            <el-popconfirm @confirm="deleteAddressInfo(row.id)" title="你确定要删除?">
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
import { Search } from "@element-plus/icons-vue";
import API from "../../utils/API";
import { ElMessage } from "element-plus";
import userInfo from "../../utils/API/userInfo";




const isLoading = ref(true);


//表单请求参数
const queryFormData = reactive({
    nickName: "",
    phone: "",
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
    API.addressInfo.getListByPage(queryFormData)
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

const deleteAddressInfo = (id) => {
    API.addressInfo.deleteById({ id })
        .then(() => {
            ElMessage.success("删除成功");
            queryData();
        }).catch((error) => {
            ElMessage.fail("删除失败");
        })

}

const currentChange = (index) => {
    queryFormData.pageIndex = index;
    queryData();
}




onMounted(() => {
    queryData();
})

</script>
<style scoped>

</style>