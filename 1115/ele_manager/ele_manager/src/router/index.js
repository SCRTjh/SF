import { ElNotification } from "element-plus";
import { createWebHashHistory, createRouter } from "vue-router";
import { mainStore } from "../store";

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
                    path: "DataView",
                    name: "DataView",
                    component: () => import("../views/DataView.vue"),
                    meta: {
                        title: "首页",
                        requireAuth: true
                    }
                },
                {
                    path: "CategoryInfoList",
                    name: "CategoryInfoList",
                    component: () => import("../views/CategoryInfo/CategoryInfoList.vue"),
                    meta: {
                        title: "分类列表",
                        requireAuth: true
                    }
                },
                {
                    path: "EditCategoryInfo/:id",
                    name: "EditCategoryInfo",
                    component: () => import("../views/CategoryInfo/EditCategoryInfo.vue"),
                    meta: {
                        title: "编辑分类",
                        requireAuth: true,
                        autoClose: true
                    }
                },
                {
                    path: "AddCategoryInfo",
                    name: "AddCategoryInfo",
                    component: () => import("../views/CategoryInfo/AddCategoryInfo.vue"),
                    meta: {
                        title: "新增分类",
                        requireAuth: true,
                        autoClose: true
                    }
                },
                {
                    path: "FoodInfoList",
                    name: "FoodInfoList",
                    component: () => import("../views/FoodInfo/FoodInfoList.vue"),
                    meta: {
                        title: "菜品分类",
                        requireAuth: true
                    }
                },
                {
                    path: "UserInfoList",
                    name: "UserInfoList",
                    component: () => import("../views/UserInfo/UserInfoList.vue"),
                    meta: {
                        title: "用户列表",
                        requireAuth: true
                    }
                },
                {
                    path: "AddressInfoList",
                    name: "AddressInfoList",
                    component: () => import("../views/AddressInfo/AddressInfoList.vue"),
                    meta: {
                        title: "地址列表",
                        requireAuth: true
                    }
                },
                {
                    path: "OrderInfoList",
                    name: "OrdedrInfoList",
                    component: () => import("../views/OrderInfo/OrderInfoList.vue"),
                    meta: {
                        title: "订单列表",
                        requireAuth: true
                    }
                },
                {
                    path: "CommentInfoList",
                    name: "CommentInfoList",
                    component: () => import("../views/CommentInfo/CommentInfoList.vue"),
                    meta: {
                        title: "评论列表",
                        requireAuth: true
                    }
                },
                {
                    path: "AdminInfoList",
                    name: "AdminInfoList",
                    component: () => import("../views/AdminInfo/AdminInfoList.vue"),
                    meta: {
                        title: "管理员列表",
                        requireAuth: true
                    }
                },
                {
                    path: "AddAdminInfo",
                    name: "AddAdminInfo",
                    component: () => import("../views/AdminInfo/AddAdminInfo.vue"),
                    meta: {
                        title: "新增管理员",
                        requireAuth: true,
                    }
                },
                {
                    path: "EditAdminInfo/:id",
                    name: "EditAdminInfo",
                    component: () => import("../views/AdminInfo/EditAdminInfo.vue"),
                    meta: {
                        title: "编辑管理员",
                        requireAuth: true,
                        autoClose: true
                    }
                },
                {
                    path: "AddFoodInfo",
                    name: "AddFoodInfo",
                    component: () => import("../views/FoodInfo/AddFoodInfo.vue"),
                    meta: {
                        title: "新增菜品",
                        requireAuth: true,
                        autoClose: true
                    },

                },
                {
                    path: "EditFoodInfo/:id",
                    name: "EditFoodInfo",
                    component: () => import("../views/FoodInfo/EditFoodInfo.vue"),
                    meta: {
                        title: "编辑菜品",
                        requireAuth: true,
                        autoClose: true
                    },

                }
            ]
        }
    ]

});


router.beforeEach((to, from, next) => {
    console.log(mainStore);
    const store = mainStore();
    if (to.meta.requireAuth) {
        if (store.token) {
            next()
        } else {
            ElNotification({
                type: "warning",
                title: "系统提示",
                message: "您还没有登录，请先去登录"
            });
            next({
                name: 'Login'
            })
        }
    } else {
        next()
    }
})


router.afterEach((to, from) => {
    const store = mainStore();
    if (to.meta.title) {
        store.addHistory({
            title: to.meta.title,
            routerName: to.name
        });
    }

    if (from.meta.autoClose) {
        store.removeHistoryByRouterName(from.name)
    }

})


export default router