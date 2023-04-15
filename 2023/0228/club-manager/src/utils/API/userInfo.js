import axiosInstance from "../axiosInstance";

const userInfo = {
    /**
     * 用户登录
     * @param {{user_tel,user_pwd}} param0 
     * @returns 
     */
    checkLogin({user_tel,user_pwd}){
        return axiosInstance.post(`/userInfo/checkLogin`,{
            user_tel,user_pwd
        })
    },
    /**
     * 新增用户
     * @param {{user_name,user_sex,user_institute,user_club,user_tel,user_pwd,user_email,role_id}} param0 
     * @returns 
     */
    add({user_name,user_sex,user_institute,user_club,user_tel,user_pwd,user_email,role_id}){
        return axiosInstance.post(`/userInfo/add`,{
            user_name,user_sex,user_institute,user_club,user_tel,user_pwd,user_email,role_id
        })
    },
    /**
     * 根据id删除用户
     * @param {number} id 
     * @returns 
     */
    deleteById(id){
        return axiosInstance.delete(`/userInfo/deleteById/${id}`)
    },
    /**
     * 根据id修改用户信息
     * @param {number} id
     * @param {objecr} patchDate 
     * @returns 
     */
    update({id,user_name,user_photo,user_sex,user_institute,user_club,user_tel,user_email,role_id}){
        return axiosInstance.patch(`/userInfo/update/${id}`,{
            user_name,user_photo,user_sex,user_institute,user_club,user_tel,user_email,role_id
        })
    },
    /**
     * 根据id查询用户信息
     * @param {id} id 
     * @returns 
     */
    findById(id){
        return axiosInstance.get(`/userInfo/findById/${id}`);
    },
    /**
     * 获取所有用户信息
     * @returns 
     */
    getAllList(){
        return axiosInstance.get(`/userInfo/getAllList`);
    },
    /**
     * 分页获取用户数据
     * @param {pageIndex,user_sex,user_name} param0 
     * @returns 
     */
    getListByPage({pageIndex,user_sex,user_name,user_club}){
        return axiosInstance.get(`/userInfo/getListByPage`,{
            params:{
                pageIndex,user_sex,user_name,user_club
            }
        })
    },
    /**
     * 用户修改密码
     * @param oldPwd 旧密码
     * @param newPwd 新密码
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
         updateUserPwd({id,oldPwd, newPwd}) {
            return axiosInstance.post(`/userInfo/updateUserPwd`, {
                id,oldPwd, newPwd
            })
        },

    /**
     * 上传客户图片
     * @param {File} file 
     * @description 在element-plus里面其实不用这个接口的，el-uploader自带上传的功能 ，只要知道上传的url地址即要，这里只做备用 
     * @returns 
     */
         uploadUserPhoto(file) {
            let formData = new FormData();
            formData.append("user_photo", file);
            return axiosInstance.post(`/userInfo/uploadUserPhoto`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        },


}


export default userInfo;