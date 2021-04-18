import Vue from 'vue'
import Vuex from 'vuex'
import cart from "./cart";
import catalog from "./catalog";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    active: '',
  },
  mutations: {
    setActive(state, status) {
      state.active = status;
    },
  },
  modules: {
    cart,
    catalog
  }
})
