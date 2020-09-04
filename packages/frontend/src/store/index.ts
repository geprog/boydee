import Vue from 'vue';
import Vuex from 'vuex';

import { FeathersVuex } from '@/lib/feathers';

Vue.use(Vuex);
Vue.use(FeathersVuex);

type RootState = Record<string, unknown>;
const requireModule = require.context(
  // The path where the service modules live
  './services',
  // Whether to look in subfolders
  false,
  // Only include .js files (prevents duplicate imports`)
  /.ts$/,
);
const servicePlugins = requireModule.keys().map((modulePath) => requireModule(modulePath).default);

export default new Vuex.Store<RootState>({
  strict: true,
  plugins: [...servicePlugins],
});
