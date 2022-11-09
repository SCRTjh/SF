import axiosInstance from "../axiosInstance";

/**
 * 根据菜品id分页获取评论
 * @param {{fid,pageIndex}} param0 参数
 * @returns {{Promise<Object>}}
 */
const commetInfo = {
    getCommentInfoListByFid({ fid, pageIndex }) {
        return axiosInstance.get("/commentInfo/getCommentInfoListByFid", {
            params: {
                fid,
                pageIndex
            }
        })
    }
}


export default commetInfo