import { createApp } from 'vue';
import App from "./App.vue";
import router from "./router/index.js";
import store from './store';

import "vant/lib/index.css";
import "./assets/scss/comm.scss";
import "./assets/css/index.css";

//导入懒加载
import { Lazyload } from 'vant';
//导入animate.css
import "animate.css"

//导入自定义组件
import PageView from "./components/PageView.vue";
import TitleBar from "./components/TitleBar.vue";
import MyLoading from "./components/MyLoading.vue";



const app = createApp(App);

app.component("page-view", PageView);
app.component("title-bar", TitleBar);
app.component("my-loading", MyLoading);

// 设置全局变量，但是单向
app.provide("baseURL", "http://www.softeem.xin:9544")

//配置懒加载
app.use(Lazyload, {
    loading: require("./assets/img/edu.jpg"),
    error: require("./assets/img/edu.jpg"),
    attempt: 3,
    preload: 1.3
});

app.use(router);
app.use(store);


app.mount("#app");
