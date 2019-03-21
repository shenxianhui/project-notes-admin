import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: {},
        isLogin: false
    },
    mutations: {
        setUserInfo(state, payload) {
            Object.assign(state.userInfo, payload);
        }
    },
    actions: {
        async getUserInfo({commit}) {
            let userInfo = await axios.get(`${__PROJECTPATH__}/api-account/account`);
            commit('setUserInfo', userInfo.data.obj);
        },
        async getBannerList({commit}, payload) {
            return axios.get(`${__PROJECTPATH__}/api-infos/home/banner`, {
                params: payload
            });
        }
    }
});
