<template>
  <div class="hourly">
    <div class="px-3">
      <v-slide-group
        v-model="activeItem"
        center-active
        class="hasiodfhoasidhsaoi"
      >
        <v-slide-item
          v-for="(hour, i) in hourlyData"
          :key="i"
          v-slot="{ active, toggle }"
        >
          <v-card
            :color="active ? 'primary' : 'grey lighten-1'"
            rounded
            class="mx-1 mt-auto d-flex flex-column align-items-start justify-content-center"
            :class="{
              'first-of-day': hours[i] === '00',
            }"
            :height="heights[i]"
            width="40"
            @click="toggle"
          >
            <div class="pt-1 text-center font-alata">
              {{ Math.round(hour.temp) }}°
            </div>
            <div class="mt-auto pb-1 text-center font-alata">
              {{ hours[i] }}
            </div>
          </v-card>
        </v-slide-item>
      </v-slide-group>
      <v-expand-transition>
        <v-card v-if="activeItem != null" rounded class="mt-4" color="grey darken-3">
          <v-card-title>
            {{
              new Date(hourlyData[activeItem].dt * 1000).toLocaleDateString(
                [],
                {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              )
            }}
            <v-spacer></v-spacer>
            <v-btn icon @click="activeItem = null">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-subtitle>
            {{
              new Date(hourlyData[activeItem].dt * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
          </v-card-subtitle>
          <v-card-text>
            <v-simple-table dense>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>Temperature</td>
                    <td>{{ hourlyData[activeItem].temp }}°C</td>
                  </tr>
                  <tr>
                    <td>Feels like</td>
                    <td>{{ hourlyData[activeItem].feels_like }}°C</td>
                  </tr>
                  <tr>
                    <td>Humidity</td>
                    <td>{{ hourlyData[activeItem].humidity }}%</td>
                  </tr>
                  <tr>
                    <td>Weather</td>
                    <td>{{ hourlyData[activeItem].weather[0].description }}</td>
                  </tr>
                  <tr v-if="hourlyData[activeItem].snow">
                    <td>Snow</td>
                    <td>{{ hourlyData[activeItem].snow["1h"] }}%</td>
                  </tr>
                  <tr v-if="hourlyData[activeItem].rain">
                    <td>Rain</td>
                    <td>{{ hourlyData[activeItem].rain["1h"] }}%</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
          <v-card-actions>
            <v-btn icon :disabled="activeItem === 0" @click="activeItem--">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              icon
              :disabled="activeItem === hourlyData.length - 1"
              @click="activeItem++"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </div>
  </div>
</template>
<script>
export default {
  name: "Hourly",
  props: {
    hourlyData: {
      required: true,
      type: Array,
    },
  },
  data: () => ({ activeItem: null, minHeight: 55, maxHeight: 150 }),
  computed: {
    heights() {
      const minTemp = Math.min.apply(
        Math,
        this.hourlyData.map((hour) => hour.temp)
      );
      const maxTemp = Math.max.apply(
        Math,
        this.hourlyData.map((hour) => hour.temp)
      );
      return this.hourlyData.map((hour) => {
        const curTemp = hour.temp;
        const percentage = (curTemp - minTemp) / (maxTemp - minTemp);
        return this.minHeight + percentage * (this.maxHeight - this.minHeight);
      });
    },
    hours() {
      return this.hourlyData.map((hour) =>
        new Date(hour.dt * 1000).toLocaleTimeString([], {
          hour: "2-digit",
        })
      );
    },
  },
  methods: {},
};
</script>
