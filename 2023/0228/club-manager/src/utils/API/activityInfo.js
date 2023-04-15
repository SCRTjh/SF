import axiosInstance from "../axiosInstance";

const activityInfo = {
    /**
     * 新增活动
     * @param {activity_name,activity_desc,activity_area,activity_type,start_time,end_time,club_id} param0 
     * @returns 
     */
    add({activity_name,activity_desc,activity_area,activity_type,start_time,end_time,club_id}){
        return axiosInstance.post("/activityInfo/add",{
            activity_name,activity_desc,activity_area,activity_type,start_time,end_time,club_id
        });
    },
    /**
     * 修改活动信息
     * @param {activity_name,activity_desc,activity_area,activity_type,start_time,end_time,club_id} param0 
     * @returns 
     */
    update({activity_name,activity_desc,activity_area,activity_type,start_time,end_time,club_id}){
        return axiosInstance.patch(`/activityInfo/update/${id}`,{
            activity_name,activity_desc,activity_area,activity_type,start_time,end_time,club_id
        });
    },
    /**
     * 同意活动
     * @param {number} id 
     * @returns 
     */
    permit(id){
        return axiosInstance.patch(`/activityInfo/permit/${id}`);
    },
    /**
     * 拒绝活动
     * @param {number} id 
     * @returns 
     */
    reject(id){
        return axiosInstance.patch(`/activityInfo/reject/${id}`);
    },
    /**
     * 获取所有活动信息
     * @returns 
     */
    getAllList(){
        return axiosInstance.get(`/activityInfo/getAllList`);
    },
        /**
     * 根据页码获取活动信息
     * @param {{}pageIndex,activity_name,club_id} param0 
     * @returns 
     */
         getListByPage1({pageIndex,activity_name,club_id}){
            return axiosInstance.get(`/activityInfo/getListByPage1`,{
                params:{
                    pageIndex,activity_name,club_id
                }
            });
        },
    /**
     * 根据页码获取活动信息
     * @param {{}pageIndex,activity_name,club_id} param0 
     * @returns 
     */
    getListByPage({pageIndex,activity_name,club_id}){
        return axiosInstance.get(`/activityInfo/getListByPage`,{
            params:{
                pageIndex,activity_name,club_id
            }
        });
    },
    /**
     * 根据id删除活动
     * @param {number} id 
     * @returns 
     */
    deleteById(id){
        return axiosInstance.delete(`/activityInfo/deleteById/${id}`);
    },
    /**
     * 根据id查询活动
     * @param {number} id 
     * @returns 
     */
    findById(id){
        return axiosInstance.get(`/activityInfo/findById/${id}`);
    },
    /**
     * 上传活动图片
     * @param {file} file 
     * @returns 
     */
    uploadActivityImg(file){
        let formDate = new FormData();
        formDate.append("activity_img",file);
        return axiosInstance.post(`/activityInfo/uploadActivityImage`,formDate,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
    }

}

export default activityInfo;