import axios from "axios";
import store from "@/store";
import router from "@/router";

const axiosInstance = axios.create({
    baseURL: "http://www.softeem.xin:9544",
    timeout: 5000
})


// 添加请求拦截器
axiosInstance.interceptors.request.use(config => {
    console.log('请求拦截器');
    config.headers["softeem_ele_client_token"] = store.getters.token;
    return config;
})


//添加响应拦截器，取出data
axiosInstance.interceptors.response.use(resp => {
    console.log("拦截");
    if (resp.data.status === "success") {
        return Promise.resolve(resp.data.data);
    } else {
        console.log("服务器请求成功，但status没成功");
        console.log(resp.data);
        return Promise.reject(resp.data);
    }
},
    (error) => {
        //服务器错误
        console.log(error);
        // if (error.response.status == 403) {
        //     router.replace({ name: 'Login' });
        // }
        return Promise.reject(error);
    })


export default axiosInstance