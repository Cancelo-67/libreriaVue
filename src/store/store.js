import { createStore } from "vuex";

const store = createStore({
  state: {
    logued: true,
  },
  actions: {
    logout({ commit }) {
      commit("setlogued", false);
    },
  },
  mutations: {
    setlogued(state, value) {
      state.logued = value;
    },
  },
});

export default store;
