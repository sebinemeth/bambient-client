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
  bkkCloseStops: [],
  bkkPreferredStops: null,
  location: null,
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
    setBkkCloseStops: (state, value) => state.bkkCloseStops = value,
    setLocation: (state, value) => state.location = value,
  },
  actions: {
    async refreshLocation({ commit }) {
      if (navigator.geolocation) {
        try {
          const result = await new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          commit('setLocation', { lat: result.coords.latitude, lon: result.coords.longitude });
        } catch (e) {
          console.error("Location denied, fallback to Budapest");
          commit('setLocation', { lat: 47.49801, lon: 19.03991 });
        }
      }
    },
    async fetchWeather({ state, commit, dispatch }) {
      commit('setWeatherData', Object.assign(state.weatherData, { loading: true }));

      await dispatch('refreshLocation');

      const params = {
        lat: state.location.lat,
        lon: state.location.lon,
        units: 'metric',
        lang: 'hu',
        exclude: 'current',
        appid: 'ad0b80b4e76cbde73b02026ea375f013',
      }

      const result = await axios.get("https://api.openweathermap.org/data/2.5/onecall", {
        params
      });
      const current = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params
      });
      commit('setWeatherData', Object.assign(result.data, { current: current.data, refreshed: new Date(current.data.dt * 1000), loading: false }));
    },
    async fetchBkkCloseStops({ state, commit, dispatch }, query) {
      await dispatch('refreshLocation');

      const params = {
        url: "https://futar.bkk.hu/api/query/v1/ws/otp/api/where/stops-for-location.json",

        key: 'bambient',
        version: 3,
        appVersion: 'bambient-0.1',
        includeReferences: true,
        lat: state.location.lat,
        lon: state.location.lon,
        lonSpan: null,
        latSpan: null,
        radius: 100,
        limit: 5,
        query,
      }

      const url = "https://web.remetelak.com/proxy/"
      const result = await axios.get(url, { params });

      commit('setBkkCloseStops', result.data.data);
    },
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
