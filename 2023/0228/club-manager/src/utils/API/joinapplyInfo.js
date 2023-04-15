import axiosInstance from "../axiosInstance";

const joinapplyInfo = {
    /**
     * 添加入社团申请
     * @param {{user_id,club_id}} param0 
     * @returns 
     */
    add({user_id,club_id}){
        return axiosInstance.post(`/joinapplyInfo/add`,{
            user_id,club_id
        });
    },
    deleteById(id){
        return axiosInstance.delete(`/joinapplyInfo/deleteById/${id}`)
    },
    /**
     * 同意申请
     * @param {number} id 
     * @returns 
     */
    permit(id){
        return axiosInstance.patch(`/joinapplyInfo/permit/${id}`);
    },
    /**
     * 拒绝申请
     * @param {number} id 
     * @returns 
     */
    reject(id){
        return axiosInstance.patch(`/joinapplyInfo/reject/${id}`);
    },
    /**
     * 
     * @param {user_id} id 
     * @returns 
     */
    checkApply(user_id){
        return axiosInstance.get(`/joinapplyInfo/checkApply/${user_id}`);
    },
    /**
     * 获取所有社团申请信息
     * @returns 
     */
    getAllList(){
        return axiosInstance.get(`/joinapplyInfo/getAllList`);
    },
    /**
     * 根据页码获取社团申请信息
     * @param {{pageIndex}} param0 
     * @returns 
     */
    getListByPage({pageIndex,user_id,status,user_club,startTime,endTime}){
        return axiosInstance.get(`joinapplyInfo/getListByPage`,{
            params:{
                pageIndex,user_id,status,user_club,startTime,endTime
            }
        })
    }

}

export default  joinapplyInfo;