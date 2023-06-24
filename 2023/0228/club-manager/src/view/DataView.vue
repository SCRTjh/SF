<template>
    <page-view>
        <el-card header="分类信息汇总">
            <!-- 请在这里展示分类的信息 -->
            <div class="flex justify-between items-center">
                <div class="flex items-center text-center w-[20%] h-[100%]">
                    <Avatar class="w-[50px]" />
                    <div class="w-[50%]">
                        <p class="text-[20px]">管理员总人数</p>
                        <p class="text-[24px]">{{ CountData.data.adminCount }}</p>
                    </div>
                </div>
                <div class="flex items-center text-center w-[20%] h-[100%]">
                    <HomeFilled class="w-[50px]" />
                    <div class="w-[50%]">
                        <p class="text-[20px]">社团总数</p>
                        <p class="text-[24px]">{{ CountData.data.clubCount }}</p>
                    </div>
                </div>
                <div class="flex items-center text-center w-[20%] h-[100%]">
                    <UserFilled class="w-[50px]" />
                    <div class="w-[50%]">
                        <p class="text-[20px]">总学生数</p>
                        <p class="text-[24px]">{{ CountData.data.studentCount }}</p>
                    </div>
                </div>
                <div class="flex items-center text-center w-[20%] h-[100%]">
                    <Flag class="w-[50px]" />
                    <div class="w-[50%]">
                        <p class="text-[20px]">社团总活动数</p>
                        <p class="text-[24px]">{{ CountData.data.activityCount }}</p>
                    </div>
                </div>
            </div>
        </el-card>
        <el-card header="可视化数据展示">
            <div class="flex">
                <div id="myChart1" class="w-[50%]" style="height: 600px;"></div>
                <div id="myChart2" class="w-[50%]" style="height: 600px;"></div>
            </div>
        </el-card>
    </page-view>
</template>
  
<script setup>
import * as echarts from 'echarts';
import API from '../utils/API';
import { UserFilled,HomeFilled, Avatar,Flag } from "@element-plus/icons-vue";
import { onMounted, reactive, ref } from 'vue';

let CountData = reactive({
    data:
    {
        adminCount: 0,
        clubCount: 0,
        studentCount: 0,
        activityCount: 0
    },
    club_data: [],
    activity_data: []
}
);

// 基于准备好的dom，初始化echarts实例
const echartsInit = () => {
    let myChart1 = echarts.init(document.getElementById('myChart1'));
    // 绘制图表

    let option1 = {
        title: {
            text: '各社团总人数统计',
            left: 'center'
        },
        tooltip: {},
        xAxis: {
            data: []
        },
        yAxis: {},
        series: [
            {
                name: '人数',
                type: 'bar',
                data: []
            }
        ]
    }


    //第一步：初始化
    let myChart2 = echarts.init(document.getElementById('myChart2'));
    //第二步：配置option
    let option2 = {
        title: {
            text: '各活动类型总数统计',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'right'
        },
        series: [
            {
                name: '数量',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 20,
                        shadowOffsetX: 20,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    CountData.club_data.map(item => {
        option1.xAxis.data.push(item?.user_club);
        option1.series[0].data.push(item?.count);
    })

    option2.series[0].data=CountData.activity_data;

    myChart1.setOption(option1);
    myChart2.setOption(option2);

}

const getData = () => {
    API.dataView.getCalcCount().then(result => {
        CountData.data = result;
        echartsInit();
    })

    API.dataView.getClubTotalCount().then(result => {
        CountData.club_data = result;
        echartsInit();
    })

    API.dataView.getActivityTotalCount().then(result => {
        console.log(result);
        CountData.activity_data = result;
        echartsInit();
    })

}



onMounted(() => {
    getData();
})

</script>
  
<style scoped></style>