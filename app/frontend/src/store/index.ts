import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

type RootState = Record<string, unknown>;

export default new Vuex.Store<RootState>({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
});
