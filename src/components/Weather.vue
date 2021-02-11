<template>
  <div class="weather my-4 mx-auto" style="max-width: 350px">
    <div class="d-flex justify-center mb-3">
      <weather-alert v-for="(a, i) in weatherData.alerts" :key="i" :alert="a" />
    </div>
    <v-card
      style="width: 100%"
      elevation="2"
      :loading="weatherData.loading"
      @click="forecastDialog = true"
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
      </template>
      <template v-else>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Loading weather...</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-card>
    <v-card-actions v-if="weatherData.current">
      <v-btn icon x-small class="mr-2" @click="fetchWeather">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <small>
        {{ refreshTimePassed }}
      </small>
      <v-spacer></v-spacer>

      <v-dialog v-model="forecastDialog">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text small v-bind="attrs" v-on="on">
            Forecast
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="accent">
            <v-btn icon dark @click="forecastDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Forecast</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn icon :loading="weatherData.loading" @click="fetchWeather">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-list subheader>
            <v-subheader>Hourly forecast</v-subheader>
            <hourly :hourly-data="weatherData.hourly" />
            <v-subheader>Daily forecast</v-subheader>
            <line-chart :chart-data="dailyData" style="height: 200px" />
          </v-list>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </div>
</template>

<script>
import StoreMixin from "@/mixins/StoreMixin";
import NowMixin from "@/mixins/NowMixin";
import WeatherAlert from "@/components/WeatherAlert";
import Hourly from "@/components/Hourly";
import LineChart from "@/components/LineChart.js";
import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";
export default {
  name: "Weather",
  components: { WeatherAlert, LineChart, Hourly },
  mixins: [StoreMixin, NowMixin],
  data: () => ({
    interval: null,
    forecastDialog: false,
  }),
  computed: {
    refreshTimePassed() {
      const diffMinutes =
        (this.now - this.weatherData.refreshed.getTime()) / 1000 / 60;
      return diffMinutes < 1
        ? "just now"
        : Math.round(diffMinutes) + " mins ago";
    },
    dailyData() {
      return {
        labels: this.weatherData.daily.map((entry) =>
          new Date(entry.dt * 1000).toLocaleDateString()
        ),
        datasets: [
          {
            label: "Min",
            borderColor: "#0fc0fc",
            pointBackgroundColor: "#0fc0fc",
            backgroundColor: "transparent",
            data: this.weatherData.daily.map((entry) => entry.temp.min),
          },
          {
            label: "Day",
            borderColor: "#777777",
            pointBackgroundColor: "#777777",
            backgroundColor: "transparent",
            data: this.weatherData.daily.map((entry) => entry.temp.day),
          },
          {
            label: "Max",
            borderColor: "#f87979",
            pointBackgroundColor: "#f87979",
            backgroundColor: "transparent",
            data: this.weatherData.daily.map((entry) => entry.temp.max),
          },
        ],
      };
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
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>
