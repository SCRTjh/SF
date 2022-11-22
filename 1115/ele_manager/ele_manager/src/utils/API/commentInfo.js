import axiosInstance from "../axiosInstance";

const commentInfo = {
    /**
     * 根据页码获取评论信息
     * @param {{ pageIndex, food_name, start_time, end_time }} param0 
     * @returns {Promise<Object>}
     */
    getListByPage({ pageIndex, food_name, start_time, end_time }) {
        return axiosInstance.get("/commentInfo/getListByPage", {
            params: {
                pageIndex, food_name, start_time, end_time
            }
        })
    },
    /**
     * 根据id删除评论信息
     * @param {{id}} param0 
     * @returns {Promise<Object>}
     */
    deleteById({ id }) {
        return axiosInstance.get("/commentInfo/deleteById", {
            params: {
                id
            }
        })
    },
    /**
     * 根据id获取评论信息
     * @param {{ fid, pageIndex = 1 }} param0 
     * @returns {Promise<Object>}
     */
    getById({ fid, pageIndex = 1 }) {
        return axiosInstance.get("/commentInfo/getCommentInfoListByFid", {
            params: {
                fid, pageIndex
            }
        })
    },
    /**
     * 根据id设置评论是否显示
     * @param {{id}} param0 
     * @returns {Promise<Object>}
     */
    setCommentShowById({ id }) {
        return axiosInstance.get("/commentInfo/setCommentShowById", {
            params: {
                id
            }
        })
    }
}

export default commentInfo