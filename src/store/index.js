import Vue from 'vue'
import Vuex from 'vuex';
import NoSleep from "nosleep.js/dist/NoSleep.min.js";
import axios from "axios";

Vue.use(Vuex);

const noSleep = new NoSleep();

const savedMutation = (state, key, value) => {
  state[key] = value;
  window.localStorage.setItem(key, value);
};

const getDefaultState = () => ({
  showSeconds: false,
  noSleep: true,
  weatherInterval: 10,
  weatherData: { loading: true },
})

const store = new Vuex.Store({
  state: getDefaultState(),
  mutations: {
    resetState: (state) => {
      Object.assign(state, getDefaultState());
      if (state.noSleep)
        noSleep.enable();
    },

    setShowSeconds: (state, value) => savedMutation(state, 'showSeconds', !!value),
    setNoSleep: (state, value) => {
      savedMutation(state, 'noSleep', !!value)
      !!value ? noSleep.enable() : noSleep.disable()
    },
    setWeatherInterval: (state, value) => savedMutation(state, 'weatherInterval', value),
    setWeatherData: (state, value) => state.weatherData = value,
  },
  actions: {
    async fetchWeather({ state, commit }) {
      commit('setWeatherData', Object.assign(state.weatherData, { loading: true }));

      const result = await axios.get("https://api.openweathermap.org/data/2.5/onecall", {
        params: {
          lat: 47.49801,
          lon: 19.03991,
          units: 'metric',
          lang: 'hu',
          exclude: 'current',
          appid: 'ad0b80b4e76cbde73b02026ea375f013',
        }
      });
      const current = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat: 47.49801,
          lon: 19.03991,
          units: 'metric',
          lang: 'hu',
          appid: 'ad0b80b4e76cbde73b02026ea375f013',
        }
      });
      commit('setWeatherData', Object.assign(result.data, { current: current.data, refreshed: new Date(current.data.dt*1000), loading: false }));
    }
  }
});

for (const key of Object.keys(store.state)) {
  const savedValue = JSON.parse(window.localStorage.getItem(key))
  if (savedValue !== null) {
    const setterName = 'set' + key.charAt(0).toUpperCase() + key.slice(1)
    if (store.state[key] !== savedValue) store.commit(setterName, savedValue)
  }
}

if (store.state.noSleep)
  noSleep.enable();

export default store
