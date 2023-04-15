import { createApp } from 'vue'
import App from './App.vue'
import "./assets/css/index.css"
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCh from 'element-plus/dist/locale/zh-cn.mjs';
import router from './router';
import PiniaPluginPersistedState from "pinia-plugin-persistedstate";
import { createPinia } from "pinia";
const pinia = createPinia();
import PageView from "./components/PageView.vue";
import "animate.css"

pinia.use(PiniaPluginPersistedState);

const app = createApp(App);
app.provide("baseURL", baseURL);
app.component("page-view", PageView);
app.use(ElementPlus,{
    locale:zhCh,
}).use(router).use(pinia).mount('#app')
