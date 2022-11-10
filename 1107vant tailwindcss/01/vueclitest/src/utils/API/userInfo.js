import axiosInstance from "../axiosInstance";

const userInfo = {
    uploadUserPhoto(file) {
        //文件上传需要借助FormData的对象
        let formData = new FormData();
        formData.append("user_photo", file)
        //请求头一定设置multipart/form-data
        return axiosInstance.post("/userInfo/uploadUserPhoto", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    add({ nickName, user_sex, user_photo, user_phone, user_email, password }) {
        return axiosInstance.post("/userInfo/add", {
            nickName, user_sex, user_phone, user_email, user_photo, password
        })
    },

    /**
     * 登录
     * @param {{zh,password}} param0 
     * @returns {Promise<Object>}
     */
    checkLogin({ zh, password }) {
        return axiosInstance.post("/userInfo/checkLogin", {
            zh, password
        })
    }
}


export default userInfo;