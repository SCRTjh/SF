<template>
    <page-view class="home-page">
        <div class="content-box">
            <router-view #default="{ Component }">
                <keep-alive :include="keepAliveList">
                    <component :is="Component"></component>
                </keep-alive>
            </router-view>
        </div>
        <ul class="tab-bar">
            <router-link :to="{ name: 'ChooseFood' }" custom #default="{ navigate, isActive }">
                <li @click="navigate" :class="{ selected: isActive }">点餐
                    <span class="iconfont icon-dropbox"></span>
                </li>
            </router-link>
            <router-link :to="{ name: 'Order' }" custom #default="{ navigate, isActive }">
                <li @click="navigate" :class="{ selected: isActive }">订单
                    <span class="iconfont icon-layout-fill"></span>
                </li>
            </router-link>
            <router-link :to="{ name: 'Category' }" custom #default="{ navigate, isActive }">
                <li @click="navigate" :class="{ selected: isActive }">分类
                    <span class="iconfont icon-tag-fill"></span>
                </li>
            </router-link>
            <router-link :to="{ name: 'My' }" custom #default="{ navigate, isActive }">
                <li @click="navigate" :class="{ selected: isActive }">我的
                    <span class="iconfont icon-user"></span>
                </li>
            </router-link>
        </ul>
    </page-view>
</template>
<script>
import keepAliveList from "../router/keepAliveList"
export default {
    name: "Home",
    data() {
        return {
            keepAliveList
        }
    }
}
</script>
<style lang="scss" scoped>
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
        color: $primaryColor;
    }

    & .iconfont {
        font-size: 22px;
    }

}
</style>