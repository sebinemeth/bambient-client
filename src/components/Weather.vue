<template>
  <div class="weather my-4" style="width: 380px">
    <v-alert
      border="top"
      colored-border
      type="error"
      elevation="2"
      v-for="(a, i) in weatherData.alerts"
      v-bind:key="i"
    >
      <strong>{{ a.event }}</strong>
      <br />
      <small>
        {{ a.description }}
      </small>
      <br />
      <small
        >From {{ new Date(a.start*1000).toLocaleString() }} to
        {{ new Date(a.end*1000).toLocaleString() }}</small
      >
    </v-alert>
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
import ConfigMixin from "@/mixins/ConfigMixin";
export default {
  name: "Weather",
  mixins: [ConfigMixin],
  data: () => ({
    interval: null,
  }),
  watch: {
    weatherInterval(value) {
      this.setInterval(value);
    },
  },
  mounted() {
    this.setInterval(this.weatherInterval);
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
  computed: {
    refreshTimePassed() {
      const diffMillis =
        new Date().getTime() - this.weatherData.refreshed.getTime();
      console.log(diffMillis);
      return diffMillis;
    },
  },
  beforeDestroy() {
    this.clearInterval();
  },
};
</script>
