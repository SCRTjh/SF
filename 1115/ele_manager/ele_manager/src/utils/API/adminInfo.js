import axiosInstance from "../axiosInstance";


const adminInfo = {
    /**
     * 发送登录请求，获取token
     * @param {{ zh, admin_pwd }}  
     * @returns {Promise<Object>}
     */
    checkLogin({ zh, admin_pwd }) {
        return axiosInstance.post("/adminInfo/checkLogin", {
            zh, admin_pwd
        })
    },
    /**
     * 根据页码获取管理员信息
     * @param {{ pageIndex, admin_name, admin_sex, admin_tel, admin_email }} 
     * @returns {Promise<Object>}
     */
    getListByPage({ pageIndex, admin_name, admin_sex, admin_tel, admin_email }) {
        return axiosInstance.get("/adminInfo/getListByPage", {
            params: {
                pageIndex, admin_name, admin_sex, admin_tel, admin_email
            }
        })
    },
    /**
     * 根据id删除管理员信息
     * @param {{id}} param0 
     * @returns {Promise<Object>}
     */
    deleteById({ id }) {
        return axiosInstance.get("/adminInfo/deleteById", {
            params: {
                id
            }
        })
    },
    /**
     * 新增管理员信息
     * @param {{ admin_name, admin_pwd, admin_sex, admin_tel, admin_email, admin_photo, admin_type }} param0 
     * @returns {Promise<Object>}
     */
    add({ admin_name, admin_pwd, admin_sex, admin_tel, admin_email, admin_photo, admin_type }) {
        return axiosInstance.post("/adminInfo/add", {
            admin_name, admin_pwd, admin_sex, admin_tel, admin_email, admin_photo, admin_type
        })
    },
    /**
     * 根据id获取管理员信息
     * @param {{id}} param0 
     * @returns {Promise<Object>}
     */
    findById({ id }) {
        return axiosInstance.get("/adminInfo/findById", {
            params: {
                id
            }
        })
    },
    /**
     * 更新管理员信息
     * @param {{ admin_name, admin_pwd, admin_sex, admin_tel, admin_email, admin_photo, admin_type, id }} param0 
     * @returns {Promise<Object>}
     */
    update({ admin_name, admin_pwd, admin_sex, admin_tel, admin_email, admin_photo, admin_type, id }) {
        return axiosInstance.post("/adminInfo/update", {
            admin_name, admin_pwd, admin_sex, admin_tel, admin_email, admin_photo, admin_type, id
        })
    }
}


export default adminInfo