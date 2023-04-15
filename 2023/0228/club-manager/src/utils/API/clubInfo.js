import axiosInstance from "../axiosInstance";


const clubInfo = {
    /**
     * 新增社团
     * @param {{club_name,club_desc,club_master,club_teacher}} param0 
     * @returns 
     */
    add({club_name,club_desc,club_master,club_teacher}){
        return axiosInstance.post(`/clubInfo/add`,{
            club_name,club_desc,club_master,club_teacher
        })
    },
    /**
     * 修改社团信息
     * @param {club_name,club_desc,club_master,club_teacher} param0 
     * @returns 
     */
    update({id,club_name,club_desc,club_master,club_teacher}){
        return axiosInstance.patch(`/clubInfo/update/${id}`,{
            club_name,club_desc,club_master,club_teacher
        })
    },
    /**
     * 获取所有社团信息
     * @returns 
     */
    getAllList(){
        return axiosInstance.get(`/clubInfo/getAllList`);
    },
    /**
     * 根据页码获取社团信息
     * @param {{pageIndex,club_name,club_teacher}} param0 
     * @returns 
     */
    getListByPage({pageIndex,club_name,club_teacher}){
        return axiosInstance.get(`/clubInfo/getListByPage`,{
            params:{
                pageIndex,club_name,club_teacher
            }
        })
    },
    findById(id){
        return axiosInstance.get(`/clubInfo/findById/${id}`);
    },
    /**
     * 根据id删除社团
     * @param {number} id 
     * @returns 
     */
         deleteById(id){
            return axiosInstance.delete(`/clubInfo/deleteById/${id}`)
        },

}

export default clubInfo;