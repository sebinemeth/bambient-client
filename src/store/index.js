import Vue from 'vue'
import Vuex from 'vuex';
import NoSleep from "nosleep.js/dist/NoSleep.min.js";
import axios from "axios";
import i18n from '@/i18n'

Vue.use(Vuex);

const noSleep = new NoSleep();

const savedMutation = (state, key, value) => {
  state[key] = value;
  window.localStorage.setItem(key, JSON.stringify(value));
};

const getDefaultState = () => ({
  showSeconds: false,
  noSleep: true,
  weatherInterval: 10,
  weatherData: { loading: true },
  bkkCloseStops: [],
  bkkFavouriteStops: [],
  bkkDepartures: [],
  location: null,
})

const bkkParams = {
  key: 'bambient',
  version: 3,
  appVersion: 'bambient-0.1',
  includeReferences: true,
}

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
    setLocation: (state, value) => state.location = value,
    setWeatherInterval: (state, value) => savedMutation(state, 'weatherInterval', value),
    setWeatherData: (state, value) => state.weatherData = value,
    setBkkCloseStops: (state, value) => state.bkkCloseStops = value,
    setBkkFavouriteStops: (state, value) => state.bkkFavouriteStops = value,
    setBkkFavouriteStop: (state, value) => {
      state.bkkFavouriteStops.find(stop => value.id === stop.id) ?
        state.bkkFavouriteStops.splice(state.bkkFavouriteStops.map(stop => stop.id).indexOf(value.id)) :
        state.bkkFavouriteStops.push(value);
      window.localStorage.setItem('bkkFavouriteStops', JSON.stringify(state.bkkFavouriteStops))
    },
    setBkkDepartures: (state, value) => state.bkkDepartures = value,
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

      console.log(i18n.locale)
      const params = {
        lat: state.location.lat,
        lon: state.location.lon,
        units: 'metric',
        lang: i18n.locale,
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
        ...bkkParams,
        lat: state.location.lat,
        lon: state.location.lon,
        radius: 100,
        query,
      }

      const url = "https://web.remetelak.com/proxy/"
      const result = await axios.get(url, { params });

      const bkkCloseStops = result.data.data.list
      for (const stop of bkkCloseStops) {
        stop.parentStation = result.data.data.references.stops[stop.parentStationId]
        stop.routes = stop.routeIds.map(id => result.data.data.references.routes[id])
      }

      commit('setBkkCloseStops', bkkCloseStops);
    },
    async fetchBkkDepartures({ state, commit, dispatch }) {
      const stops = state.bkkFavouriteStops.length ? state.bkkFavouriteStops : state.bkkCloseStops;
      if (!stops.length) return
      await dispatch('refreshLocation');

      const params = {
        url: "https://futar.bkk.hu/api/query/v1/ws/otp/api/where/arrivals-and-departures-for-stop.json",
        ...bkkParams,
        onlyDepartures: true,
        radius: 100,
        limit: 60,
        minutesBefore: 2,
        minutesAfter: 30,
      }


      const url = "https://web.remetelak.com/proxy/"
      const requests = stops.map(stop => axios.get(url, { params: { stopId: stop.id, ...params } }));
      const responses = await Promise.all(requests)

      const datas = responses.map(response => response.data.data)
      datas.forEach(data => {
        data.entry.stop = data.references.stops[data.entry.stopId]
        data.entry.alerts = data.entry.alertIds.map(id => data.references.alerts[id])
        data.entry.routes = data.entry.routeIds.map(id => data.references.routes[id])
        data.entry.nearbyStops = data.entry.nearbyStopIds.map(id => data.references.stops[id])
        data.entry.stopTimes.forEach(stopTime => {
          stopTime.trip = data.references.trips[stopTime.tripId];
          stopTime.trip.route = data.references.routes[stopTime.trip.routeId];
        })
      })
      const bkkDepartures = responses.map(response => response.data.data.entry)

      commit('setBkkDepartures', bkkDepartures);
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
