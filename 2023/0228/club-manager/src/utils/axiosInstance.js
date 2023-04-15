/**
 * axiosInstance的请求实例
 */

import axios from "axios";
import router from "../router"
import { mainStore } from "../store";


const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
});


//设置请求拦截,在每次次请求之前携带之前登录的token
axiosInstance.interceptors.request.use(config => {
    const store = mainStore();
    if (store.token && store.token === '') {
        router.go('/Login')
        return
    } else {
        config.headers["authorization"] = store.token;
        return config;
    }
})

//设置响应拦截器
axiosInstance.interceptors.response.use(resp => {
    if (resp.data.status === "success") {
        return Promise.resolve(resp.data.data);
    } else {
        console.log("请求是对的，但是服务器错了", resp.data);
        return Promise.reject(resp.data);
    }
}, error => {
    console.log("服务器请求错误", error);

    if (error.response.status === 403) {
        //说明没有权限了，用户要重新登录
        router.replace({
            name: "Login"
        })
    }
    return Promise.reject(error);
})


export default axiosInstance;