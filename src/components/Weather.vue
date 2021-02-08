<template>
  <div class="weather my-4" style="width: min(100%,380px)">
    <weather-alert v-for="(a, i) in weatherData.alerts" :key="i" :alert="a">
    </weather-alert>
    <v-card
      class="mx-auto"
      style="width: 100%"
      elevation="2"
      :loading="weatherData.loading"
    >
      <template v-if="weatherData.current">
        <v-list-item>
          <v-list-item-avatar tile>
            <div class="font-alata" style="font-size: 1.5em">
              {{ Math.round(weatherData.current.main.temp) }}°
            </div>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ weatherData.current.weather[0].description }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ weatherData.current.name }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar color="grey">
            <img
              :src="
                `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
              "
              :alt="weatherData.current.weather[0].description"
            />
          </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <small>
            {{
              weatherData.refreshed.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
          </small>
          <v-spacer></v-spacer>
          <v-btn icon x-small @click="fetchWeather">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-card-actions>
      </template>
      <template v-else>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Loading weather...</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-card>
  </div>
</template>

<script>
import StoreMixin from "@/mixins/StoreMixin";
import WeatherAlert from "@/components/WeatherAlert";
export default {
  name: "Weather",
  components: { WeatherAlert },
  mixins: [StoreMixin],
  data: () => ({
    interval: null,
  }),
  computed: {
    refreshTimePassed() {
      const diffMillis =
        new Date().getTime() - this.weatherData.refreshed.getTime();
      console.log(diffMillis);
      return diffMillis;
    },
  },
  watch: {
    weatherInterval(value) {
      this.setInterval(value);
    },
  },
  mounted() {
    this.setInterval(this.weatherInterval);
  },
  beforeDestroy() {
    this.clearInterval();
  },
  methods: {
    setInterval(mins) {
      const millis = mins * 60 * 1000;
      this.clearInterval();
      this.refreshWeather();
      this.interval = window.setInterval(this.refreshWeather, millis);
    },
    clearInterval() {
      if (this.interval !== null) window.clearInterval(this.interval);
    },
    async refreshWeather() {
      this.fetchWeather();
      console.log("weather refreshed");
    },
  },
};
</script>
