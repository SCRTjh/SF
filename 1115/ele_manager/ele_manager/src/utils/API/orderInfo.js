import axiosInstance from "../axiosInstance";

const orderInfo = {

    getListByPage({ pageIndex, start_time, end_time, uid, order_status }) {
        return axiosInstance.get("/orderInfo/getListByPage", {
            params: {
                pageIndex,
                start_time,
                end_time,
                uid,
                order_status
            }
        })
    }

}


export default orderInfo