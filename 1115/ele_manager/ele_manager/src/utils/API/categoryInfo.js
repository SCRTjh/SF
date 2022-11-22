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
    },
    getAllList() {
        return axiosInstance.get("/categoryInfo/getAllList")
    },
    update({ id, category_name }) {
        return axiosInstance.post("/categoryInfo/update", {
            id, category_name
        })
    },
    getById({ id }) {
        return axiosInstance.get("categoryInfo/findById", {
            params: {
                id
            }
        })
    }
}

export default categoryInfo;