import '@fortawesome/fontawesome-free/css/all.css';

import Vuetify from 'vuetify/lib';

export default new Vuetify({
  theme: {
    themes: {
      light: {},
      dark: {},
    },
    options: {
      customProperties: true,
    },
  },
  icons: {
    iconfont: 'fa',
  },
});
