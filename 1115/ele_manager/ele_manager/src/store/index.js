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
            loginUserinfo: null,
            isCollapse: false
        }
    },
    //没有mutation,省略了
    actions: {
        setToken(token) {
            this.token = token;
        },
        setLoginUserInfo(loginUserinfo) {
            this.loginUserinfo = loginUserinfo;
        },
        setIsCollapse(flag) {
            this.isCollapse = flag;
        }
    },
    persist: {
        key: "main",
        storage: {
            getItem: key => cache.get(key),
            setItem: (key, value) => cache.set(key, value, { exp: 60 * 60 * 24 }),
            removeItem: key => cache.delete(key),
            clear: () => cache.clear()
        }
    }
})