import Vuetify from 'vuetify/lib';

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#27AE60',
        grey_first: '#12191D',
        grey_second: '#8C8C8C',
        grey_third: '#A6A6A6',
        grey_fourth: '#D9D9D9',
        grey_fifth: '#F2F2F2',
        white: '#FFFFFF',
        red: '#EB5757',
      },
      dark: {},
    },
    options: {
      customProperties: true,
    },
  },
});
