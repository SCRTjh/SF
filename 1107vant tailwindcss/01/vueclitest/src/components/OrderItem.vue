<template>
    <div class="border border-gray-200 border-solid m-3 p-8 border-box bg-white">
        <div class="flex  mb-[3px] py-[5px] box-border leading-[14px]">
            <span class="font-bold ">订单编号:</span>
            <span class="text-[14px] px-4 ">{{ orderList.id }}</span>
        </div>
        <div class="flex mb-[3px] py-[5px] box-border leading-[14px]">
            <span class="font-bold">订单时间:</span>
            <span class="text-[14px] px-4">{{ formatDateTime(orderList.submit_time) }}</span>
        </div>
        <div class="flex mb-[3px] py-[5px] box-border leading-[14px]">
            <span class="font-bold ">订单总数:</span>
            <span class="text-[14px] px-4">{{ orderList.orderDetailList.length }}件</span>
        </div>
        <div class="flex mb-[3px] py-[5px] box-border leading-[14px]">
            <span class="font-bold ">订单金额:</span>
            <span class="text-[14px] px-4">{{ orderList.order_money }}</span>
            ￥
        </div>
        <div class="flex mb-[3px] py-[5px] box-border leading-[14px]">
            <span class="font-bold ">订单状态:</span>
            <span class="text-[14px] px-4">{{ orderList.order_status }}</span>
        </div>
        <!-- 步骤条 -->
        <Steps :active="formatActiveIndex(orderList.order_status)">
            <Step>未付款</Step>
            <Step>已付款</Step>
            <Step>已发货</Step>
            <Step>交易完成</Step>
        </Steps>
        <div>
            <div class="font-bold mb-[5px]">订单列表</div>
            <!-- 菜品列表 -->
            <div class="foodList flex justify-between mb-5 border-0 border-dashed border-black border-b"
                v-for="(item, index) in orderList.formatOrderDetailList">
                <div>
                    <span class="font-bold">{{ index + 1 }}.</span>
                    <span class="text-[14px] px-1">{{ item.food_name }}x</span>
                    <span class="text-[14px]">{{ item.price }}</span>
                </div>
                <div class="foodCount text-[14px] px-1">{{ item.count }}</div>
            </div>
            <div class="flex justify-end" v-if="orderList.order_status == '已发货'">
                <Button size="mini" plain type="primary">评论</Button>
            </div>
        </div>
    </div>

</template>
<script>
import { Steps, Step, Button } from 'vant';
import { formatDateTime } from '@/utils/DateTimeUtils';
export default {
    name: "OderItem.vue",
    data() {
        return {
            activeIndex: 0
        }
    },
    props: {
        orderList: {
            type: Object,
            required: true
        },
    },
    methods: {
        formatDateTime,
        formatActiveIndex(str) {
            if (str == "未付款") {
                return 0
            } else if (str == "已付款") {
                return 1
            } else if (str == "已发货") {
                return 2
            } else if (str == "交易完成") {
                return 3
            }
        }
    },
    components: {
        Steps, Step, Button
    }
}
</script>
<style scoped>

</style>