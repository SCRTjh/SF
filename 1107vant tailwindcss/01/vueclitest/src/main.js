import { createApp } from 'vue';
import App from "./App.vue";
import "./assets/scss/comm.scss";
import router from "./router/index.js";

import "./assets/css/index.css";
import "vant/lib/index.css";

//导入懒加载
import { Lazyload } from 'vant';
//导入animate.css
import "animate.css"

import PageView from "./components/PageView.vue";
import TitleBar from "./components/TitleBar.vue";
import MyLoading from "./components/MyLoading.vue";



const app = createApp(App);

app.component("page-view", PageView);
app.component("title-bar", TitleBar);
app.component("my-loading", MyLoading);

app.provide("baseURL", "http://www.softeem.xin:9544")

//配置懒加载
app.use(Lazyload, {
    loading: require("./assets/img/edu.jpg"),
    error: require("./assets/img/edu.jpg"),
    attempt: 3,
    preload: 1.3
});

app.use(router);

app.mount("#app");
