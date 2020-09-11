import '@/registerServiceWorker';
import '@/lib';
import '@/plugins/buefy';

import VueCompositionApi from '@vue/composition-api';
import Vue, { VNode } from 'vue';

import App from '@/App.vue';
import i18n from '@/i18n';
import vuetify from '@/plugins/vuetify';
import router from '@/router';
import store from '@/store';

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h): VNode => h(App),
}).$mount('#app');
