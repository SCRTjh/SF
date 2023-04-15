<template>
    <page-view>
        <el-card>
            <template #header>
                活动详情页
            </template>
            <div v-loading="isLoading.value">
                <h2 class="text-center tracking-wider text-[36px]">{{ info.activity_name }}</h2>
                <img v-if="info.activity_img" class="block w-[50%] m-auto " :src="baseURL + info.activity_img" alt="">
                <img v-else class="block w-[50%] m-auto " src="../../assets/img/s8.jpg" alt="">
                <p class="indent-20 text-[24px]">{{ info.activity_desc }}</p>
                <div class="flex justify-end items-center"><span class="flex text-[20px] items-center">活动地点:<p class="pl-5 text-[30px] ">{{ info.activity_area }}</p></span></div>
            </div>
        </el-card>
        <el-card v-loading="isLoading.value">
            <el-form :model="queryFormData" :rules="formInfoDataRules" label-width="120px">
                <el-form-item :label="userInfo.user_name">
                    <el-input v-model="queryFormData.comment_desc" placeholder="请在这里填写你的评论吧" type="textarea" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="isLoading.value"  :loading-icon="Loading"  @click="onSubmit()">提交评论</el-button>
                </el-form-item>
            </el-form>
            <div>
                <comment-item v-for="(item,index) of resultData.listData" :info="item" :key="item.id"></comment-item>
            </div>
            <!--页码-->
            <div class="flex flex-row justify-between items-center mt-[10px]">
                <div class="text-[14px]">当前第{{ queryFormData.pageIndex }}页，共{{
                    resultData.pageCount
                }}页，共{{ resultData.totalCount }}条
                </div>
                <el-pagination background layout="prev, pager, next" :total="resultData.totalCount"
                    @current-change="currentChange" />
            </div>
        </el-card>
    </page-view>
</template>
<script setup>
import CommentItem from "@/components/CommentItem.vue"
import { ref, reactive, onMounted, inject } from "vue";
import { useRoute } from "vue-router";
import { mainStore } from "@/store/index.js";
import { storeToRefs } from "pinia";
import {Loading} from "@element-plus/icons-vue";
import { ElNotification } from 'element-plus'
import API from "@/utils/API/index.js";

const baseURL = inject('baseURL');
const store = mainStore();
const { userInfo } = storeToRefs(store);
const route = useRoute();

let info = reactive({});

const resultData = reactive({
    listData: [],
    pageCount: 0,
    totalCount: 0
  })

const queryFormData = reactive({
    pageIndex: 1,
    user_id: '',
    activity_id: '',
    comment_desc: ''
})

const formInfoDataRules = {
    comment_desc: [{required: true, message: "评论不能提交为空", trigger: "submit"}],
  }

const isLoading = ref(false);
const queryData = () => {
    isLoading.value = true;
    API.activityInfo.findById(route.params.id).then(result => {
        info = result
    }).finally(() => {
        isLoading.value = false;
    })

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

const onSubmit = () => {
    if(queryFormData.comment_desc){
        API.commentInfo.add(queryFormData).then(result => {
            ElNotification({
                type: "success",
                title: "提交成功",
                message: "当前记录提交成功"
            });
            queryData();
            queryFormData.comment_desc = "";
        }).catch(error => {
            ElNotification({
                type: "error",
                title: "提交失败",
                message: "当前记录提交失败，请刷新重试或联系管理员"
            });
        })
    }else{
        ElNotification({
                type: "error",
                title: "提交失败",
                message: "评论内容提交不能为空!"
            });
    }
}

//页码发生变化
const currentChange = (index) => {
    queryFormData.pageIndex = index;
    queryData();
}

onMounted(() => {
    queryFormData.user_id = userInfo.value.id;
    queryFormData.activity_id = route.params.id;
    queryData();
})






</script>
<style scoped>
:deep(.el-form-item__content) {
    justify-content: flex-end;
}
</style>