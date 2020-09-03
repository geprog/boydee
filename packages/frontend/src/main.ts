import '@/registerServiceWorker';
import '@/lib';

import Vue, { VNode } from 'vue';
import Vuetify from 'vuetify';

import App from '@/App.vue';
import i18n from '@/i18n';
import router from '@/router';
import store from '@/store';

import vuetify from './plugins/vuetify';

Vue.use(Vuetify);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h): VNode => h(App),
}).$mount('#app');
