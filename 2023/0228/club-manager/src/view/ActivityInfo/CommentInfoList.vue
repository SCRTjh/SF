<template>
    <page-view>
      <el-card>
        <template #header>
          <div class="font-bold">活动评论</div>
        </template>
        <el-form :model="queryFormData" :inline="true">
          <el-form-item label="活动">
            <el-select v-model="queryFormData.activity_id" clearable>
              <el-option v-for="item in allActivityInfoList" :key="item.id" :label="item.activity_name" :value="item.id">
                {{ item.activity_name }}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户">
            <el-select v-model="queryFormData.user_id" clearable filterable>
              <el-option v-for="item in allUserInfoList" :key="item.id" :label="item.user_name" :value="item.id">
                {{ item.user_name }}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评论时间">
            <el-date-picker
                v-model="queryFormData.dateRange"
                type="daterange"
                range-separator="To"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryData" :loading="isLoading">
              <el-icon>
                <Search/>
              </el-icon>
              查询
            </el-button>
          </el-form-item>
        </el-form>
        <div v-loading="isLoading">
          <el-table :data="resultData.listData" border stripe max-height="550">
            <el-table-column label="id" prop="id" width="80" align="center"></el-table-column>
            <el-table-column label="活动名称" prop="activityInfo.activity_name"></el-table-column>
            <el-table-column label="用户名称" prop="userInfo.user_name"></el-table-column>
            <el-table-column label="评论时间">
              <template #default="{row}">
                {{ formatDateTime(row.create_time) }}
              </template>
            </el-table-column>
            <el-table-column label="评论内容" width="250px">
              <template #default="{row}">
                {{ txtEllipsis(row.comment_desc, 20) }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template #default="{row}">
                <el-popconfirm title="你确定要删除吗" @confirm="deleteCurrentItem(row.id)">
                  <template #reference>
                    <el-button type="danger" size="small">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <!--页码-->
          <div class="flex flex-row justify-between items-center mt-[10px]">
            <div class="text-[14px]">当前第{{ queryFormData.pageIndex }}页，共{{
                resultData.pageCount
              }}页，共{{ resultData.totalCount }}条
            </div>
            <el-pagination
                background layout="prev, pager, next" :total="resultData.totalCount"
                @current-change="currentChange"/>
          </div>
        </div>
      </el-card>
    </page-view>
  </template>
  
  <script setup>
  import {ref, reactive, onMounted, inject, watch} from "vue";
  import {Search} from "@element-plus/icons-vue";
  import API from "@/utils/API/index.js";
  import {ElNotification} from "element-plus";
  import {formatDateTime} from "@/utils/DateTimeUtils.js";
  import {txtEllipsis} from "@/utils/StringUtils.js";
  
  
  const baseURL = inject("baseURL");
  const queryFormData = reactive({
    activity_id: "",
    user_id: "",
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
  })
  
  
  
  //所有活动的数据
  const allActivityInfoList = ref([]);
  API.activityInfo.getAllList().then(result=>allActivityInfoList.value = result);
  
  //所有用户数据
  const allUserInfoList = ref([]);
  API.userInfo.getAllList().then(result => allUserInfoList.value = result);
  
  const resultData = reactive({
    listData: [],
    pageCount: 0,
    totalCount: 0
  })
  const isLoading = ref(false);
  const queryData = () => {
    isLoading.value = true;
    API.commentInfo.getListByPage(queryFormData)
        .then(result => {
          resultData.listData = result.listData;
          resultData.pageCount = result.pageCount;
          resultData.totalCount = result.totalCount;
        })
        .finally(() => {
          isLoading.value = false;
        })
  }
  
  //页码发生变化
  const currentChange = (index) => {
    queryFormData.pageIndex = index;
    queryData();
  }
  //删除按钮操作
  const deleteCurrentItem = (id) => {
    API.commentInfo.deleteById(id)
        .then(result => {
          ElNotification({
            type: "success",
            title: "删除成功",
            message: "当前记录删除成功"
          });
          queryData();
        })
        .catch(error => {
          ElNotification({
            type: "danger",
            title: "删除失败",
            message: "当前记录删除失败，请刷新重试或联系管理员"
          });
        })
  }
  
  onMounted(() => {
    queryData();
  })
  </script>
  
  <style scoped>
  
  </style>