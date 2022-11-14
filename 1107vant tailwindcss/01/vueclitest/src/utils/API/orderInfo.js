import axiosInstance from "../axiosInstance";

const orderInfo = {
    /**
     * 提交订单
     * @param {Object} orderData 
     * @returns {Promise<Object>}
     */
    submitOrder(orderData) {
        return axiosInstance.post("/orderInfo/submitOrder", orderData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    },
    /**
     * 根据页码获取订单信息
     * @param {number} pageIndex 
     * @returns {Promise<Object>}
     */
    getMyOrderListByPage({ pageIndex }) {
        return axiosInstance.get("/orderInfo/getMyOrderListByPage", {
            params: {
                pageIndex
            }
        })
    },
    /**
     * 根据id获取订单信息
     * @param {number} id 
     * @returns {Promise<Object>}
     */
    findById(id) {
        return axiosInstance.get("/orderInfo/findById", {
            params: {
                id
            }
        })
    }
}

export default orderInfo;