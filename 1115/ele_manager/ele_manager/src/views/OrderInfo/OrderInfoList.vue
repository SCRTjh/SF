<template>
    <page-view>
        <el-card>
            <!-- 标题 -->
            <template #header>
                <div class="font-bold">订单列表</div>
            </template>
            <!-- 查询表单 -->
            <el-form :model="queryFormData" :inline="true">
                <el-form-item label="时间">
                    <el-date-picker v-model="timeArr" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
                        :default-value="[new Date(2020, 1, 1), new Date(2023, 10, 1)]" />
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select placeholder="请选择订单状态" v-model="queryFormData.order_status">
                        <el-option v-for="item in ['未付款', '已付款', '已发货']" :key="item" :value="item" :label="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户ID">
                    <el-input placeholder="请输入用户ID" v-model="queryFormData.uid"></el-input>
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
                    <el-table-column type="expand" align="center">
                        <template #default="{ row }">
                            <el-descriptions label-class-name="my-label" style="color:#409eff" :column="3" border>
                                <template #title>
                                    <h3 class="text-primaryColor ml-[10px]">客户信息</h3>
                                </template>
                                <el-descriptions-item label="用户昵称">{{ row.userInfo.nickName }}
                                </el-descriptions-item>
                                <el-descriptions-item label="性别">{{ row.userInfo.user_sex }}
                                </el-descriptions-item>
                                <el-descriptions-item label="手机号">{{ row.userInfo.user_phone }}
                                </el-descriptions-item>
                                <el-descriptions-item label="邮箱">
                                    {{ row.userInfo.user_email }}
                                </el-descriptions-item>
                                <el-descriptions-item label="本次收获地址">{{ row.addressInfo.address }}
                                </el-descriptions-item>
                            </el-descriptions>
                            <el-descriptions label-class-name="my-label" style="color:#409eff" :column="3" border>
                                <template #title>
                                    <h3 class="text-primaryColor ml-[10px]">订单详情</h3>
                                </template>
                                <template v-for="item in row.orderDetailList" :key="item.id">
                                    <el-descriptions-item label="菜品名称">{{ item.foodInfo.food_name }}
                                    </el-descriptions-item>
                                    <el-descriptions-item label="单价">{{ item.foodInfo.price }}
                                    </el-descriptions-item>
                                    <el-descriptions-item label="数量">{{ item.count }}
                                    </el-descriptions-item>
                                </template>

                            </el-descriptions>
                        </template>
                    </el-table-column>
                    <el-table-column label="id" prop="id" width="80"></el-table-column>
                    <el-table-column label="用户编号" prop="userInfo.id" width="80"></el-table-column>
                    <el-table-column label="订单生成时间" align="center">
                        <template #default="{ row }">
                            {{ formatDateTime(row.submit_time) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="订单总金额" prop="order_money"></el-table-column>
                    <el-table-column label="菜品总数" prop="orderDetailList.length" align="center">
                    </el-table-column>
                    <el-table-column label="订单状态" prop="order_status" align="center"></el-table-column>
                    <el-table-column label="付款时间" align="center">
                        <template #default="{ row }">
                            {{ formatDateTime(row.pay_time) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="发货时间" align="center">
                        <template #default="{ row }">
                            {{ formatDateTime(row.deliver_time) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="收获地址" prop="addressInfo.address" align="center">
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template #default="{ row }">
                            <el-button type="primary" size="small" :loading="isLoading"
                                @click="updateOderToDeliver({ id: row.id })" :disabled="row.order_status != '已付款'">发货
                            </el-button>
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
import { formatDateTime } from "../../utils/DateTimeUtils";
import { ElNotification } from "element-plus";




const isLoading = ref(true);

const timeArr = ref("");


//表单请求参数
const queryFormData = reactive({
    start_time: timeArr.value ? timeArr.value[0].getTime() : "",
    end_time: timeArr.value ? timeArr.value[1].getTime() : "",
    order_status: "",
    uid: "",
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
    API.orderInfo.getListByPage(queryFormData)
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

const updateOderToDeliver = ({ id }) => {
    isLoading.value = true;
    API.orderInfo.updateToDeliver({ id })
        .then(result => {
            console.log(result);
            ElNotification({
                type: "success",
                title: "提示",
                message: "发货成功"
            })
            queryData();
        }).catch(error => {
            ElNotification({
                type: "error",
                title: "提示",
                message: "发货失败"
            })
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