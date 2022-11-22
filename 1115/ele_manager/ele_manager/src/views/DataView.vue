<template>
    <page-view>
        <el-card>
            <!-- 标题 -->
            <template #header>
                <div class="font-bold">首页</div>
            </template>
            <div class="flex flex-row h-[300px] w-full">
                <div class="flex flex-col justify-center items-center w-[25%] text-[30px]">
                    <el-icon size="40">
                        <UserFilled />
                    </el-icon>
                    <span>用户总数</span>
                    <span>{{ totalData.user_total }}人</span>
                </div>
                <div class="flex flex-col justify-center items-center w-[25%] text-[30px]">
                    <el-icon size="40">
                        <List />
                    </el-icon>
                    <span>总订单数</span>
                    <span>{{ totalData.order_total }}单</span>
                </div>
                <div class="flex flex-col justify-center items-center w-[25%] text-[30px]">
                    <el-icon size="40">
                        <GoodsFilled />
                    </el-icon>
                    <span>总商品数</span>
                    <span>{{ totalData.food_total }}种</span>
                </div>
                <div class="flex flex-col justify-center items-center w-[25%] text-[30px]">
                    <el-icon size="40">
                        <TrendCharts />
                    </el-icon>
                    <span>总金额数</span>
                    <span>{{ totalData.money_total }}元</span>
                </div>
            </div>
            <div class=" flex flex-row  h-[400px] ">
                <div class="w-[50%] height=[200px] ">
                    <div ref="barChart" style="width:100%;height:100%;"></div>
                </div>
                <div class=" bottom-[0] right=[0] w-[50%] height-[100%] ">
                    <div ref="pieChart" style="width:100%;height:100%;"></div>
                </div>
            </div>

        </el-card>

    </page-view>
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
import { UserFilled, List, GoodsFilled, TrendCharts } from "@element-plus/icons-vue";
import API from "../utils/API";
import * as echarts from 'echarts';



onMounted(() => {
    getData();

})

const pieChart = ref();
const barChart = ref();

const totalData = reactive({
    user_total: "",
    order_total: "",
    food_total: "",
    money_total: "",
    starList: [],
    starCountList: [],
    categoryList: [],
})

const pieOption = {
    title: {
        // text: 'Referer of a Website',
        // subtext: 'Fake Data',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        right: 'right'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: totalData.categoryList,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]

}

const barOption = {
    xAxis: {
        type: 'category',
        data: totalData.starList
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: totalData.starCountList,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
        }
    ]
}

const initPieChart = (option) => {
    const myChart = echarts.init(pieChart.value);
    myChart.setOption(option)
    window.addEventListener('resize', () => {
        myChart.resize();
    })
}

const initBarChart = (option) => {
    const myChart = echarts.init(barChart.value);
    myChart.setOption(option)
    window.addEventListener('resize', () => {
        myChart.resize();
    })
}

const getData = () => {
    const pAll = [API.dataView.getTotalInfo(), API.dataView.getCategoryFoodCount(), API.dataView.getCommentStartData()]
    Promise.all(pAll).then(res => {
        console.log(res);
        if (res[0]) {
            totalData.user_total = res[0].user_total;
            totalData.order_total = res[0].order_total;
            totalData.food_total = res[0].food_total;
            totalData.money_total = res[0].money_total;
            res[1].forEach(item => {
                totalData.categoryList.push({ value: Number(item.category_food_count), name: item.category_name });
            });
            res[2].forEach(item => {
                totalData.starList.push(item.star + '星');
                totalData.starCountList.push(Number(item.star_count))
            })
        }
    }).catch(error => {
        console.log(error);
    }).finally(() => {
        initPieChart(pieOption);
        initBarChart(barOption);
    });

}




</script>
<style scoped lang="scss">

</style>