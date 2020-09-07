import '@/registerServiceWorker';
import '@/lib';
import '@/plugins/buefy';

import Vue, { VNode } from 'vue';

import App from '@/App.vue';
import i18n from '@/i18n';
import vuetify from '@/plugins/vuetify';
import router from '@/router';
import store from '@/store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h): VNode => h(App),
}).$mount('#app');
