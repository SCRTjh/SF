import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.js"
import { createPinia } from 'pinia';
//导入持久化插件
import PiniaPluginPersistedState from "pinia-plugin-persistedstate"

import './assets/css/index.css'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css"






import PageView from "./components/PageView.vue";

const app = createApp(App);
const pinia = createPinia();
pinia.use(PiniaPluginPersistedState);

app.use(pinia);

app.component("page-view", PageView);
app.provide("baseURL", baseURL);


app.use(ElementPlus);
app.use(router);

app.mount('#app')
