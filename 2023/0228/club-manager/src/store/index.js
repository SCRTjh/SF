/**
 * pinia的存储区域
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
             userInfo: null,
             isCollapse: false,
            //  historyList: []
         }
     },
     //pinia没有mutations,省略了这个操作
     actions: {
         setToken(token) {
             this.token = token;
         },
         setUserInfo(userInfo) {
             this.userInfo = userInfo;
         },
         setIsCollapse(flag) {
             this.isCollapse = flag;
         },
         logOut() {
             this.token = null;
             this.userInfo = null;
             
         },
        //  addHistory(item) {
        //      //我们希望在添加的时候不要重复
        //      let index = this.historyList.findIndex(_item => _item.routeName === item.routeName);
        //      if (index === -1) {
        //          this.historyList.push(item);
        //      }
        //  },
        //  removeHisotryByRouteName(routeName) {
        //      let index = this.historyList.findIndex(item => item.routeName === routeName);
        //      if (index != -1) {
        //          this.historyList.splice(index, 1);
        //      }
        //  }
     },
     // 配置状态的持久化
     persist: {
         key: "ele-manager-store",
         storage: {
             getItem: key => cache.get(key),
             // 到期时间默认以秒为单位
             setItem: (key, value) => cache.set(key, value, { exp: 60 * 60 * 24 }),
             removeItem: key => cache.delete(key),
             clear: () => cache.clear()
         },
         //指定需要持久化的字段
         paths: ["token", "userInfo"]
     }
 });
 
 