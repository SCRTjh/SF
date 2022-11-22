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
    },
    /**
     * 新增菜品信息
     * @param {{ food_name, price, cid, food_desc, food_img, weight }} param0 
     * @returns {Promise<Object>}
     */
    add({ food_name, price, cid, food_desc, food_img, weight }) {
        return axiosInstance.post("/foodInfo/add", {
            food_name, price, cid, food_desc, food_img, weight
        })
    },
    /**
     * 根据id删除菜品信息
     * @param {{id}} param0 
     * @returns {Promise<Object>}
     */
    deleteById({ id }) {
        return axiosInstance.get("foodInfo/deleteById", {
            params: {
                id
            }
        })
    },
    /**
     * 根据id获取菜品信息
     * @param {{id}} id 
     * @returns {Promise<Object>}
     */
    findById(id) {
        return axiosInstance.get("/foodInfo/findById", {
            params: {
                id
            }
        })
    },
    /**
     * 新增菜品信息
     * @param {{ id, food_name, price, cid, food_desc, food_img, weight }} param0 
     * @returns {Promise<Object>}
     */
    update({ id, food_name, price, cid, food_desc, food_img, weight }) {
        return axiosInstance.post("foodInfo/update", {
            id, food_name, price, cid, food_desc, food_img, weight
        })
    }
}

export default foodInfo;