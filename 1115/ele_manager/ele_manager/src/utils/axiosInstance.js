import axios from "axios";
import router from "../router";
import { mainStore } from "../store";

const axiosInstance = axios.create({
    baseURL: " http://www.softeem.xin:9544",
    timeout: 5000
})



axiosInstance.interceptors.request.use(config => {
    const store = mainStore();
    config.headers["softeem_ele_admin_token"] = store.token;
    return config
})




//添加拦截器取出data
axiosInstance.interceptors.response.use(resp => {
    console.log("拦截");
    if (resp.data.status === "success") {
        return Promise.resolve(resp.data.data);
    } else {
        console.log("服务器请求成功，但status没成功");
        return Promise.reject(resp.data)
    }
},
    error => {
        console.log(error);
        if (error.response.status === 403) {
            router.replace({
                name: 'Login'
            })
        }
        return Promise.reject(error);
    }

)


export default axiosInstance