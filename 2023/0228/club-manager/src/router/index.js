import { createRouter, createWebHashHistory } from "vue-router";
import { mainStore } from '../store'
import { ElNotification } from 'element-plus'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: {
                name: "Login"
            }
        },
        {
            path: "/Login",
            name: "Login",
            component: () => import("../view/Login.vue")
        }, {
            path: "/Manager",
            name: "Manager",
            component: () => import("../view/Manager.vue"),
            children: [
                {
                    path: "DataView",
                    name: "DataView",
                    component: () => import("../view/DataView.vue"),
                    meta: {
                        title: "首页",
                    }
                },
                {
                    path: "AddClubInfo",
                    name: "AddClubInfo",
                    component: () => import("../view/ClubInfo/AddClubInfo.vue"),
                    meta: {
                        title: "新增社团",
                        requireAuth: true
                    }

                },
                {
                    path: "ClubInfoList",
                    name: "ClubInfoList",
                    component: () => import("../view/ClubInfo/ClubInfoList.vue"),
                    meta: {
                        title: "社团列表",
                        requireAuth: true
                    }

                },
                {
                    path: "EditClubInfo/:id",
                    name: "EditClubInfo",
                    component: () => import("../view/ClubInfo/EditClubInfo.vue"),
                    meta: {
                        title: "编辑社团",
                        requireAuth: true
                    }

                },
                {
                    path: "AddUserInfo",
                    name: "AddUserInfo",
                    component: () => import("../view/UserInfo/AddUserInfo.vue"),
                    meta: {
                        title: "新增用户",
                        requireAuth: true
                    }

                },
                {
                    path: "EditUserInfo/:id",
                    name: "EditUserInfo",
                    component: () => import("../view/UserInfo/EditUserInfo.vue"),
                    meta: {
                        title: "编辑用户",
                        requireAuth: true
                    }

                },
                {
                    path: "UserInfoList",
                    name: "UserInfoList",
                    component: () => import("../view/UserInfo/UserInfoList.vue"),
                    meta: {
                        title: "用户列表",
                        requireAuth: true
                    }

                }
                , {
                    path: "UpdateUserPwd",
                    name: "UpdateUserPwd",
                    component: () => import("../view/UserInfo/UpdateUserPwd.vue"),
                    meta: {
                        title: "修改密码",
                        autoClose: true,
                        requireAuth: true
                    }
                }
                ,
                {
                    path: "MyInfo",
                    name: "MyInfo",
                    component: () => import("../view/UserInfo/MyInfo.vue"),
                    meta: {
                        title: "我的信息",
                        requireAuth: true
                    }
                },
                {
                    path: "CommentInfoList",
                    name: "CommentInfoList",
                    component: () => import("../view/ActivityInfo/CommentInfoList.vue"),
                    meta: {
                        title: "评论列表",
                        requireAuth: true
                    }
                },
                {
                    path: "ActivityDetail/:id",
                    name: "ActivityDetail",
                    component: () => import("../view/ActivityInfo/ActivityDetail.vue"),
                    meta: {
                        title: "活动详情"
                    }
                },
                {
                    path: "ActivityShow",
                    name: "ActivityShow",
                    component: () => import("../view/ActivityInfo/ActivityShow.vue"),
                    meta: {
                        title: "活动展示"
                    }
                },
                {
                    path: "AddActivityInfo",
                    name: "AddActivityInfo",
                    component: () => import("../view/ActivityInfo/AddActivityInfo.vue"),
                    meta: {
                        title: "新增活动",
                        requireAuth: true
                    }
                },
                {
                    path: "ActivityInfoList",
                    name: "ActivityInfoList",
                    component: () => import("../view/ActivityInfo/ActivityInfoList.vue"),
                    meta: {
                        title: "活动列表",
                        requireAuth: true
                    }
                },
                {
                    path: "JoinApplyInfoList",
                    name: "JoinApplyInfoList",
                    component: () => import("../view/ApplyInfo/JoinApplyInfoList.vue"),
                    meta: {
                        title: "入社申请列表",
                        requireAuth: true
                    }
                },
                {
                    path: "ClubApplyInfoList",
                    name: "ClubApplyInfoList",
                    component: () => import("../view/ApplyInfo/ClubApplyInfoList.vue"),
                    meta: {
                        title: "社团入社申请列表",
                        requireAuth: true
                    }
                },
                {
                    path: "ClubMemberInfoList",
                    name: "ClubMemberInfoList",
                    component: () => import("../view/ClubInfo/ClubMemberInfoList.vue"),
                    meta: {
                        title: "社团成员列表",
                        requireAuth: true
                    }
                }
            ]
        }

    ]
});


router.beforeEach((to, from, next) => {
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


export default router;