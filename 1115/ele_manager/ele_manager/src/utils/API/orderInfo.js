import axiosInstance from "../axiosInstance";

const orderInfo = {

    /**
     * 根据页码获取订单信息
     * @param {{ pageIndex, start_time, end_time, uid, order_status }} param0 
     * @returns {Promise<Object>}
     */
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
    },
    /**
     * 根据id更新发货状态
     * @param {{id}} param0 
     * @returns {Promise<Object>}
     */
    updateToDeliver({ id }) {
        return axiosInstance.get("/orderInfo/updateOrderToDeliver?id=454", {
            params: {
                id
            }
        })
    }

}


export default orderInfo