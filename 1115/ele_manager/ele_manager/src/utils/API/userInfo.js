import axiosInstance from "../axiosInstance";

const userInfo = {
    getListByPage({ pageIndex, nickName, user_sex, user_phone }) {
        return axiosInstance.get("/userInfo/getListByPage", {
            params: {
                pageIndex,
                nickName,
                user_sex, user_phone
            }
        })
    },
    deleteUserInfoItem({ id }) {
        return axiosInstance.get("/userInfo/deleteById", {
            params: {
                id
            }
        })
    }
}



export default userInfo