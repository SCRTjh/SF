import axiosInstance from "../axiosInstance";

const commentInfo = {
    getListByPage({ pageIndex, food_name, start_time, end_time }) {
        return axiosInstance.get("/commentInfo/getListByPage", {
            params: {
                pageIndex, food_name, start_time, end_time
            }
        })
    },
    deleteById({ id }) {
        return axiosInstance.get("/commentInfo/deleteById", {
            params: {
                id
            }
        })
    }
}

export default commentInfo