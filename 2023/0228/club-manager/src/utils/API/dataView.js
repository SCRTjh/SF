import axiosInstance from "../axiosInstance";


const dataView = {
    getCalcCount(){
        return axiosInstance.get(`/dataView/getCalcCount`)
    },

    getClubTotalCount(){
        return axiosInstance.get(`/dataView/getClubTotalCount`)
    },

    getActivityTotalCount(){
        return axiosInstance.get(`/dataView/getActivityTotalCount`)
    }
}

export default dataView;