import axiosInstance from "../axiosInstance";



const foodInfo = {
    /**
     * 分页获取菜品的数据
     * @param {{pageIndex,food_name,category_name}} param0 
     * @returns {Promise<Object>}
     */
    getListByPage({ pageIndex, food_name, category_name }) {
        return axiosInstance.get("/foodInfo/getListByPage", {
            params: { pageIndex, food_name, category_name }
        });
    },
    /**
     * 根据id设置菜品权重
     * @param {{id,weight}} param0 
     * @returns {Promise<Object>}
     */
    setFoodInfoWeight({ id, weight }) {
        return axiosInstance.get("/foodInfo/setFoodInfoWeight", {
            params: {
                id,
                weight
            }

        })
    }
}

export default foodInfo;