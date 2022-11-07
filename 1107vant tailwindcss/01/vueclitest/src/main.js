import { createApp } from 'vue';
import App from "./App.vue";
import "./assets/scss/comm.scss";
import router from "./router/index.js"
import "vant/lib/index.css"

import PageView from "./components/PageView.vue"
import TitleBar from "./components/TitleBar.vue"


const app = createApp(App);

app.component("page-view", PageView);
app.component("title-bar", TitleBar);

app.use(router)

app.mount("#app");
