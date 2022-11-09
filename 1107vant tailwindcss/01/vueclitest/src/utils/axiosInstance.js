import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://www.softeem.xin:9544",
    timeout: 5000
})

//添加拦截器，取出data
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
    error => {
        //服务器错误
        return Promise.reject(error);
    })


export default axiosInstance