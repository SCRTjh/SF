import axiosInstance from "../axiosInstance";

const area = {
    /**
     * 根据parentId获取下级城市
     * @param {number} parentId 
     * @returns 
     */
    getListByParentId(parentId) {
        return axiosInstance.get('/area/getListByParentId', {
            params: {
                parentId
            }
        })
    },
    /**
     * 获取省市区的所有数据
     * @returns {Promise<Object>}
     */
    getAllList() {
        return axiosInstance.get('/area/getAllList')
    }
}

export default area;