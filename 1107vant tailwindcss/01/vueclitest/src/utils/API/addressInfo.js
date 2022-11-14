import axiosInstance from "../axiosInstance";

const addressInfo = {
    /**
     * 新增收获地址
     * @param {{ address, phone, person_name, tag }} param0 
     * @returns {Promise<Object>}
     */
    addAddress({ address, phone, person_name, tag }) {
        return axiosInstance.post('/addressInfo/addAddress', {
            address, phone, person_name, tag
        }
        )
    },
    /**
     * 获取地址信息
     * @returns {Promise<Object>}
     */
    getMyAddressInfoList() {
        return axiosInstance.get("/addressInfo/getMyAddressInfoList")
    },
    /**
     * 根据id删除地址信息
     * @param {number} id 地址id
     * @returns {Promise<Object>}
     */
    deleteById(id) {
        return axiosInstance.get("/addressInfo/deleteById",
            {
                params: {
                    id
                }
            })
    },
    /**
     * 根据id获取地址信息
     * @param {number} id 
     * @returns {Promise<Object>}
     */
    findById(id) {
        return axiosInstance.get("/addressInfo/findById", {
            params: {
                id
            }
        })
    },
    /**
     * 修改地址
     * @param {{id,address,phone,person_name,tag}} param0 
     * @returns {Promise<Object>}
     */
    update({ id, address, phone, person_name, tag }) {
        return axiosInstance.post("/addressInfo/update", {
            id, address, phone, person_name, tag
        })
    }

}


export default addressInfo;