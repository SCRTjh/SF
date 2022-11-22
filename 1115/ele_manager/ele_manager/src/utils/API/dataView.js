import axiosInstance from "../axiosInstance";

const dataView = {
    /**
     * 获取总计信息
     * @returns {Promise<Object>}
     */
    getTotalInfo() {
        return axiosInstance.get("/adminInfo/getTotalInfo");
    },
    /**
     * 获取菜品分类总数信息
     * @returns {Promise<Objetc>}
     */
    getCategoryFoodCount() {
        return axiosInstance.get("/adminInfo/getCategoryFoodCount")
    },
    /**
     * 获取评分等级数据
     * @returns {Promise<Object>}
     */
    getCommentStartData() {
        return axiosInstance.get("/adminInfo/getCommentStarData")
    }
}

export default dataView