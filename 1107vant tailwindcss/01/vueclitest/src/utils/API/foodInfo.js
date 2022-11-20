import axiosInstance from "../axiosInstance";


const foodInfo = {
    /**
     * 根据pageIndex, food_name, category_name获取数据
     * @param {pageIndex, food_name, category_name} param0 
     * @returns {Promise<Object>}
     */
    getListByPage({ pageIndex, food_name, category_name }) {
        return axiosInstance.get('/foodInfo/getListByPage', {
            params: {
                pageIndex, food_name, category_name
            }
        })
    },
    /**
     * 根据cid获取同类型菜品列表
     * @param {number} cid 
     * @returns {Promise<Object>}
     */
    getListById(cid) {
        return axiosInstance.get('/foodInfo/getListByCid', {
            params: {
                cid
            }
        })
    },
    /**
     * 根据id获取菜品信息
     * @param {number} id 
     * @returns {Promise<Object>}
     */
    findById(id) {
        return axiosInstance.get("/foodInfo/findById", {
            params: {
                id
            }
        })
    }
}


export default foodInfo