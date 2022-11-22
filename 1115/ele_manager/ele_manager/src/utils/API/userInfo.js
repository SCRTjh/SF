import axiosInstance from "../axiosInstance";

const userInfo = {
    /**
     * 根据页码获取用户信息
     * @param {{ pageIndex, nickName, user_sex, user_phone }} param0 
     * @returns {Promise<Object>}
     */
    getListByPage({ pageIndex, nickName, user_sex, user_phone }) {
        return axiosInstance.get("/userInfo/getListByPage", {
            params: {
                pageIndex,
                nickName,
                user_sex, user_phone
            }
        })
    },
    /**
     * 根据id删除用户信息
     * @param {{id}} param0 
     * @returns {Promise<Object>}
     */
    deleteUserInfoItem({ id }) {
        return axiosInstance.get("/userInfo/deleteById", {
            params: {
                id
            }
        })
    }
}



export default userInfo