import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex';
import NoSleep from "nosleep.js/dist/NoSleep.min.js";

Vue.config.productionTip = false

Vue.use(Vuex);

const noSleep = new NoSleep();
noSleep.enable();

const store = new Vuex.Store({
  state: {
    showSeconds: false,
    noSleep: true,
    dateFormat: null,
  },
  mutations: {
    setShowSeconds: (state, value) => state.showSeconds = !!value,
    setNoSleep: (state, value) => {
      state.noSleep = !!value;
      !!value ? noSleep.enable() : noSleep.disable()
    },
  }
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
