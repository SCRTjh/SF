import axiosInstance from "../axiosInstance";


const adminInfo = {
    /**
     * 发送登录请求，获取token
     * @param {{ zh, admin_pwd }} param0 
     * @returns {Promise<Object>}
     */
    checkLogin({ zh, admin_pwd }) {
        return axiosInstance.post("/adminInfo/checkLogin", {
            zh, admin_pwd
        })
    },
    getListByPage({ pageIndex, admin_name, admin_sex, admin_tel, admin_email }) {
        return axiosInstance.get("/adminInfo/getListByPage", {
            params: {
                pageIndex, admin_name, admin_sex, admin_tel, admin_email
            }
        })
    },
    deleteById({ id }) {
        return axiosInstance.get("/adminInfo/deleteById", {
            params: {
                id
            }
        })
    }
}


export default adminInfo