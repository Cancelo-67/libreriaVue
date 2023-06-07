import { createStore } from "vuex";

const store = createStore({
  state: {
    logued: false,
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
  },
});

export default store;
