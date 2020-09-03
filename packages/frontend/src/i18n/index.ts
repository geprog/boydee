import Vue from 'vue';
import VueI18n from 'vue-i18n';

import de from './de.json';
import en from './en.json';

Vue.use(VueI18n);

export const getI18n = (locale = 'en'): VueI18n =>
  new VueI18n({
    locale,
    fallbackLocale: 'en',
    messages: {
      en,
      de,
    },
  });

export default getI18n();
