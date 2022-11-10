import { createStore } from 'vuex'
import Cookie from 'js-cookie';
// 导入vuex持久化插件
import createPersistedState from "vuex-persistedstate";

export default createStore({
  // 声明全局状态(数据)
  state: {
    loginUserInfo: null,
    token: null
  },
  getters: {
    //获取loginUserInfo时返回state.loginUserInfo
    loginUserInfo(state) {
      return state.loginUserInfo;
    },
    //获取toke时返回state.token
    token(state) {
      return state.token;
    }
  },
  mutations: {
    // (实行指令)存储loginUSerInfo
    setLoginUserInfo(state, loginUserInfo) {
      state.loginUserInfo = loginUserInfo
    },
    // (实行指令)存储token
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    // 发出存储loginUserInfo数据的指令
    setLoginUserInfo({ commit }, loginUserInfo) {
      commit("setLoginUserInfo", loginUserInfo)
    },
    //发出存储token数据的指令
    setToken({ commit }, token) {
      commit("setToken", token)
    },
    setLogOut({ commit }) {
      commit("setLoginUserInfo", null);
      commit("setToken", null);

    }
  },
  modules: {
  },
  plugins: [
    // 使用vuex持久化插件,存储于sessionStorage
    createPersistedState({
      storage: {
        getItem: key => Cookie.get(key),
        setItem: (key, value) => Cookie.set(key, value, { expires: 30 }),
        removeItem: key => Cookie.remove(key)
      }
    })]
})
