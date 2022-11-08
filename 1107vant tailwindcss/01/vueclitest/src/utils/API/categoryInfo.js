import axiosInstance from "../axiosInstance";

const categoryInfo = {
    getListByPge({ pageIndex, category_name }) {
        return axiosInstance.get('/categoryInfo/getListByPage', {
            params: {
                pageIndex,
                category_name
            }
        })
    },
    getAllList() {
        return axiosInstance.get("/categoryInfo/getAllList")
    }
}




export default categoryInfo