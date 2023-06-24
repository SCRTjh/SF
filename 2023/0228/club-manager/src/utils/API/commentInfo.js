import axiosInstance from "../axiosInstance";

const commentInfo = {
    /**
     * 新增评论
     * @param {user_id,comment_desc} param0 
     * @returns 
     */
    add({activity_id,user_id,comment_desc}){
        return axiosInstance.post(`/commentInfo/add`,{
            activity_id,user_id,comment_desc
        })
    },
    /**
     * 根据id删除评论
     * @param {number} id 
     * @returns 
     */
    deleteById(id){
        return axiosInstance.delete(`/commentInfo/deleteById/${id}`);
    },
    /**
     * 根据id修改评论内容
     * @param {{id,comment_des}} param0 
     * @returns 
     */
    update({id,comment_desc}){
        return axiosInstance.update(`/commentInfo/update/${id}`,{
            comment_desc
        })
    },
    /**
     * 分页查询
     * @param {{ pageIndex, activity_id, user_id, startTime, endTime }} param0 
     * @returns 
     */
    getListByPage({ pageIndex, activity_id, user_id, startTime, endTime }){
        return axiosInstance.get(`/commentInfo/getListByPage`,{
            params:{
                pageIndex, activity_id, user_id, startTime, endTime
            }
        })
    },
    getListByPage1({ pageIndex, activity_id, startTime, endTime }){
        return axiosInstance.get(`/commentInfo/getListByPage`,{
            params:{
                pageIndex, activity_id, startTime, endTime
            }
        })
    }


}

export default commentInfo;