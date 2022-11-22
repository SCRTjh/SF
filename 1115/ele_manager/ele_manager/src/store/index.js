/**
 * pinia存储区域
 */

import { defineStore } from "pinia";
import WebStorageCache from "web-storage-cache";

const cache = new WebStorageCache({
    storage: window.localStorage
})

export const mainStore = defineStore("main", {
    state() {
        return {
            token: null,
            loginUserInfo: null,
            isCollapse: false,
            historyList: []
        }
    },
    //没有mutation,省略了
    actions: {
        setToken(token) {
            this.token = token;
        },
        setLoginUserInfo(loginUserInfo) {
            this.loginUserInfo = loginUserInfo;
        },
        setIsCollapse(flag) {
            this.isCollapse = flag;
        },
        logOut() {
            this.token = null,
                this.loginUserInfo = null;
        },
        addHistory(item) {
            let index = this.historyList.findIndex(_item => _item.routerName === item.routerName);
            if (index === -1) {
                this.historyList.push(item)
            }
        },
        removeHistoryByRouterName(routeName) {
            let index = this.historyList.findIndex(item => item.routerName === routeName);
            if (index != -1) {
                this.historyList.splice(index, 1);
            }
        }
    },
    persist: {
        key: "main",
        storage: {
            getItem: key => cache.get(key),
            setItem: (key, value) => cache.set(key, value, { exp: 60 * 60 * 24 }),
            removeItem: key => cache.delete(key),
            clear: () => cache.clear()
        },
        paths: ["token", "loginUserInfo"]
    }
})