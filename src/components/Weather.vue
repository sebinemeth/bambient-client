<template>
  <div class="weather py-6">
    <v-card class="my-3">
      <v-card-text>
        <v-row v-if="current != null" class="d-flex align-center">
          <v-col class="py-0 font-alata current-temp text-center">{{Math.round(current.temp)}}°</v-col>
          <v-col class="pt-2 pb-0">
            <img
              class="current-icon"
              :src="`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`"
            />
          </v-col>
          <v-col class="py-0 text-center">
            <v-progress-circular
              :rotate="current.wind_deg - 90 - 0.1*360/2"
              :size="50"
              :width="5"
              :value="10"
              color="primary"
            >{{ Math.round(current.wind_speed*3.6*10)/10 }}</v-progress-circular>
          </v-col>
          <v-col class="py-0 font-lato text-center">
            {{current.weather[0].description}}
            <br />
            {{Intl.DateTimeFormat("hu-HU", {
            hour: 'numeric', minute: 'numeric'
            }).format(new Date(current.dt * 1000))}}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="my-3">
      <v-card-text>
        <canvas id="forecastChart" width="400" height="100"></canvas>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
const axios = require("axios");
var Chart = require("chart.js");
export default {
  name: "Weather",
  props: ["config","dt"],

  data() {
    return {
      forecastChart: null,
      current: null,
      params: { weatherRefresh: null },
    };
  },

  watch: {
    dt() {
      console.log(`[wea] dt ${dt}`)
    },
    config: {
      handler(value) {
        console.log("[wea] handler");
        if (this.config.location == null) return;
        if (
          value.weatherInterval == null ||
          value.weatherRefresh != this.params.weatherRefresh
        ) {
          console.log("[wea] updating", value.weatherRefresh);
          this.params.weatherRefresh = value.weatherRefresh;
          //debugger
          this.setUpTimer();
        }
      },
      deep: true,
    },
  },

  mounted() {},
  methods: {
    setUpTimer() {
      this.getData();
      if (this.config.weatherInterval)
        clearInterval(this.config.weatherInterval);
      var self = this;
      this.config.weatherInterval = setInterval(function () {
        self.getData();
      }, this.config.weatherRefresh * 60 * 1000);
      console.log(this.params.weatherRefresh);
    },
    async getData() {
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/onecall",
          {
            params: {
              lat: this.config.location.lat,
              lon: this.config.location.lon,
              units: "metric",
              lang: "hu",
              exclude: "hourly,minutely",
              appid: "ad0b80b4e76cbde73b02026ea375f013",
            },
          }
        );
        console.log(new Date().toLocaleString(), response);
        this.forecastChart
          ? this.updateChart(response.data)
          : this.drawChart(response.data);
        this.current = response.data.current;
      } catch (error) {
        console.error(error);
      }
    },
    drawChart(data) {
      var ctx = document.getElementById("forecastChart");
      this.forecastChart = new Chart(ctx, {
        type: "line",
        data: {},
        options: {
          legend: { display: false },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || "";
                label += Math.round(tooltipItem.yLabel);
                return label + "°C";
              },
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                },
              },
            ],
            yAxes: [
              {
                display: false,
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                },
                /*
                ticks: {
                  callback(value, index, values) {
                    if (Math.floor(value) % 2 == 0) return value + "°C";
                  },
                },
                */
              },
            ],
          },
        },
      });

      this.updateChart(data);
    },
    updateChart(data) {
      var days = [];
      var temps = [];
      var minTemps = [];
      var maxTemps = [];
      for (var day of data.daily) {
        days.push(
          Intl.DateTimeFormat("hu-HU", {
            //day: "numeric",
            weekday: "short",
          }).format(new Date(day.dt * 1000))
        );
        temps.push(day.temp.day);
        minTemps.push(day.temp.min);
        maxTemps.push(day.temp.max);
      }

      this.forecastChart.data = {
        labels: days,
        datasets: [
          {
            data: maxTemps,
            borderColor: "rgba(15, 192, 252, 1)",
            pointBackgroundColor: "rgba(15, 192, 252, 1)",
            borderWidth: 3,
            hoverBorderWidth: 6,
            hitRadius: 10,
          },
          {
            data: minTemps,
            borderColor: "rgba(255, 255, 255, 1)",
            pointBackgroundColor: "rgba(255, 255, 255, 1)",
            borderWidth: 3,
            hoverBorderWidth: 6,
            hitRadius: 10,
          },
        ],
      };

      this.forecastChart.update();
    },
  },
};
</script>
<style scoped>
.weather {
  width: 100%;
}
.current-temp {
  font-size: 2.2em;
}
.current-icon {
  width: 3.5em;
}
</style>