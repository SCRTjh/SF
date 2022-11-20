import { createWebHashHistory, createRouter } from "vue-router";


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: {
                name: "Login"
            }
        },
        {
            path: "/Login",
            name: "Login",
            component: () => import("../views/Login.vue")
        },
        {
            path: "/Manager",
            name: "Manager",
            component: () => import("../views/Manager.vue"),
            children: [
                {
                    path: "CategoryInfoList",
                    name: "CategoryInfoList",
                    component: () => import("../views/CategoryInfo/CategoryInfoList.vue")
                },
                {
                    path: "AddCategoryInfo",
                    name: "AddCategoryInfo",
                    component: () => import("../views/CategoryInfo/AddCategoryInfo.vue")
                },
                {
                    path: "FoodInfoList",
                    name: "FoodInfoList",
                    component: () => import("../views/FoodInfo/FoodInfoList.vue")
                },
                {
                    path: "UserInfoList",
                    name: "UserInfoList",
                    component: () => import("../views/UserInfo/UserInfoList.vue")
                },
                {
                    path: "AddressInfoList",
                    name: "AddressInfoList",
                    component: () => import("../views/AddressInfo/AddressInfoList.vue")
                },
                {
                    path: "OrderInfoList",
                    name: "OrdedrInfoList",
                    component: () => import("../views/OrderInfo/OrderInfoList.vue")
                },
                {
                    path: "CommentInfoList",
                    name: "CommentInfoList",
                    component: () => import("../views/CommentInfo/CommentInfoList.vue")
                },
                {
                    path: "AdminInfoList",
                    name: "AdminInfoList",
                    component: () => import("../views/AdminInfo/AdminInfoList.vue")
                }
            ]
        }
    ]

})


export default router