import axiosInstance from "../axiosInstance";

const categoryInfo = {
    add({ category_name }) {
        return axiosInstance.get("/categoryInfo/add", {
            params: {
                category_name
            }
        })
    },
    deleteById({ id }) {
        return axiosInstance.get("/categoryInfo/deleteById", {
            params: {
                id
            }
        })
    },
    getListByPage({ pageIndex, category_name }) {
        return axiosInstance.get("/categoryInfo/getListbyPage", {
            params: {
                pageIndex,
                category_name
            }
        })
    }
}

export default categoryInfo;