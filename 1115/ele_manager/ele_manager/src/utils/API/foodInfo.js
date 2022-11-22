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
    add({ food_name, price, cid, food_desc, food_img, weight }) {
        return axiosInstance.post("/foodInfo/add", {
            food_name, price, cid, food_desc, food_img, weight
        })
    },
    deleteById({ id }) {
        return axiosInstance.get("foodInfo/deleteById", {
            params: {
                id
            }
        })
    },
    findById(id) {
        return axiosInstance.get("/foodInfo/findById", {
            params: {
                id
            }
        })
    },
    update({ id, food_name, price, cid, food_desc, food_img, weight }) {
        return axiosInstance.post("foodInfo/update", {
            id, food_name, price, cid, food_desc, food_img, weight
        })
    }
}

export default foodInfo;