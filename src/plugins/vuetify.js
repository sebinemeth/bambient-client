import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: '#009fe3',
        accent: '#4c0e5f',
        success: '#84f089'
      },
    },
  },
});
