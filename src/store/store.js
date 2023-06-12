import { createStore } from "vuex";

const store = createStore({
  state: {
    logued: false,
    total: 0,
  },
  actions: {
    logout({ commit }) {
      commit("setlogued", false);
    },
  },
  mutations: {
    setLogued(state, value) {
      state.logued = value;
    },
    setTotal(state, value) {
      state.total = value;
    },
  },
});

export default store;
