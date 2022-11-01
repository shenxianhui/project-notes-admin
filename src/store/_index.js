import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // userInfo: {}
  },
  mutations: {
    // setUserInfo(state, payload) {
    //   Object.assign(state.userInfo, payload);
    // }
  },
  actions: {
    // async getUserInfo({ commit }) {
    //   let userInfo = await axios.get(`${__PROJECTPATH__}/api-account/account`);
    //   commit('setUserInfo', userInfo.data.obj);
    // },
    // // get
    // async getBannerList({ commit }, payload) {
    //   let res = await axios.get(`${__PROJECTPATH__}/api-infos/home/banner`, {
    //     params: payload
    //   });
    //   return res;
    // },
    // // post
    // async postBannerList({ commit }, payload) {
    //   let res = await axios.post(`${__PROJECTPATH__}/api-infos/home/banner`, payload);
    //   return res;
    // }
  },
  modules: {},
})
