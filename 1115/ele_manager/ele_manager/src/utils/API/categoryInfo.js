import axiosInstance from "../axiosInstance";

const categoryInfo = {
    /**
     * 新增菜品分类
     * @param {{ category_name }} param0 
     * @returns {Promise<Object>}
     */
    add({ category_name }) {
        return axiosInstance.get("/categoryInfo/add", {
            params: {
                category_name
            }
        })
    },
    /**
     * 根据id删除菜品分类
     * @param {{id}} param0 
     * @returns {Promise<Object>}
     */
    deleteById({ id }) {
        return axiosInstance.get("/categoryInfo/deleteById", {
            params: {
                id
            }
        })
    },
    /**
     * 根据页码获取菜品分类列表
     * @param {{ pageIndex, category_name }} param0 
     * @returns {Promise<Object>}
     */
    getListByPage({ pageIndex, category_name }) {
        return axiosInstance.get("/categoryInfo/getListbyPage", {
            params: {
                pageIndex,
                category_name
            }
        })
    },
    /**
     * 
     * @returns {Promise<Object>}
     */
    getAllList() {
        return axiosInstance.get("/categoryInfo/getAllList")
    },
    /**
     * 更新菜品分类信息
     * @param {{ id, category_name }} param0 
     * @returns {Promise<Object>}
     */
    update({ id, category_name }) {
        return axiosInstance.post("/categoryInfo/update", {
            id, category_name
        })
    },
    /**
     * 根据id获取菜品分类信息
     * @param {{ id }} param0 
     * @returns {Promise<Object>}
     */
    getById({ id }) {
        return axiosInstance.get("categoryInfo/findById", {
            params: {
                id
            }
        })
    }
}

export default categoryInfo;