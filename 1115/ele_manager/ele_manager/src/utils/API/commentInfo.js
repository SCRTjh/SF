import axiosInstance from "../axiosInstance";

const commentInfo = {
    getListByPage({ pageIndex, food_name, start_time, end_time }) {
        return axiosInstance.get("/commentInfo/getListByPage", {
            params: {
                pageIndex, food_name, start_time, end_time
            }
        })
    },
    deleteById({ id }) {
        return axiosInstance.get("/commentInfo/deleteById", {
            params: {
                id
            }
        })
    },
    getById({ fid, pageIndex = 1 }) {
        return axiosInstance.get("/commentInfo/getCommentInfoListByFid", {
            params: {
                fid, pageIndex
            }
        })
    },
    setCommentShowById({ id }) {
        return axiosInstance.get("/commentInfo/setCommentShowById", {
            params: {
                id
            }
        })
    }
}

export default commentInfo