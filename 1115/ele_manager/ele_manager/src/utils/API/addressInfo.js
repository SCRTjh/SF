import axiosInstance from "../axiosInstance";


const addressInfo = {
    /**
     * 
     * @param {{ pageIndex, nickName, phone }} 页码,昵称,手机号
     * @returns {Promise<Object>}
     */
    getListByPage({ pageIndex, nickName, phone }) {
        return axiosInstance.get("/addressInfo/getListByPage", {
            params: {
                pageIndex, nickName, phone
            }
        })
    },
    /**
     * 根据id删除地址
     * @param {{id}} id 
     * @returns {Promise<Object>}
     */
    deleteById({ id }) {
        return axiosInstance.get("/addressInfo/deleteById", {
            params: {
                id
            }
        })
    }
}

export default addressInfo