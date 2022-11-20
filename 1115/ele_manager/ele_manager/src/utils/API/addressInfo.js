import axiosInstance from "../axiosInstance";


const addressInfo = {
    getListByPage({ pageIndex, nickName, phone }) {
        return axiosInstance.get("/addressInfo/getListByPage", {
            params: {
                pageIndex, nickName, phone
            }
        })
    },
    deleteById({ id }) {
        return axiosInstance.get("/addressInfo/deleteById", {
            params: {
                id
            }
        })
    }
}

export default addressInfo