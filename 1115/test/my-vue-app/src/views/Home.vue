<template>
    <page-view class="home-page">
        <div class="content-box">
            <router-view></router-view>
        </div>
        <div class="tab-bar">
            <router-link :to="{ name: 'ChooseFood' }" custom #default="{ navigate, isActive }">
                <li @click="navigate" :class="{ selected: isActive }">点餐

                </li>
            </router-link>
            <router-link :to="{ name: 'Order' }" custom #default="{ navigate, isActive }">
                <li @click="navigate" :class="{ selected: isActive }">订单

                </li>
            </router-link>
            <router-link :to="{ name: 'Category' }" custom #default="{ navigate, isActive }">
                <li @click="navigate" :class="{ selected: isActive }">分类

                </li>
            </router-link>
            <router-link :to="{ name: 'My' }" custom #default="{ navigate, isActive }">
                <li @click="navigate" :class="{ selected: isActive }">我的

                </li>
            </router-link>
        </div>

    </page-view>

</template>
<script setup>
import pageView from "../components/PageView.vue";






</script>
<style scoped lang="scss">
@import "../assets/scss/comm.scss";

.home-page {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.content-box {
    flex: 1;
    overflow: auto;
    background-color: cyan;
}

.tab-bar {
    display: flex;
    height: 55px;
    border-top: 1px solid lightgray;
    display: flex;
    justify-content: space-around;

    li {
        width: 55px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    & .selected {
        color: skyblue;
    }

    & .iconfont {
        font-size: 22px;
    }

}
</style>