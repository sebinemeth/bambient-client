<template>
  <div class="bkk fill-height">
    <v-card
      v-for="(station, key) in departuresByStation"
      :key="key"
      elevation="2"
      class="pa-3 mb-3"
    >
      <v-card-title>{{ station[0].stop.name }}</v-card-title>
      <v-card
        v-for="stop in station"
        :key="stop.stopId"
        class="stop"
        color="black"
      >
        <v-card-text>
          <div
            v-for="(stopTime, i) in stop.stopTimes.slice(0, 5)"
            :key="i"
            class="stopTime d-flex align-center"
          >
            <vehicle class="mr-2" :color="stopTime.trip.route.style.color">
              {{ stopTime.trip.route.shortName }}
            </vehicle>{{ stopTime.trip.tripHeadsign }}
            <span
              class="ml-auto"
              :class="{ 'success--text': !!stopTime.predictedDepartureTime }"
            >{{
              new Date(
                (stopTime.predictedDepartureTime || stopTime.departureTime) *
                  1000
              ).toLocaleTimeString($i18n.locale)
            }}</span>
          </div>
        </v-card-text>
      </v-card>
    </v-card>

    <div class="d-flex justify-end">
      <v-dialog v-model="stopDialog">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text small v-bind="attrs" v-on="on">
            Edit stops
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="accent">
            <v-btn icon dark @click="stopDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Edit stops</v-toolbar-title>
          </v-toolbar>
          <v-form>
            <v-text-field
              v-model="query"
              label="Search stops"
              solo
              clearable
              prepend-icon="mdi-search"
              @input="search"
            >
            </v-text-field>
          </v-form>
          <v-card
            v-for="(stop, i) in bkkCloseStops"
            :key="i"
            class="ma-3"
            elevation="2"
          >
            <v-list>
              <v-list-item>
                <v-list-item-title class="font-alata">
                  {{ stop.name }}
                </v-list-item-title>
                <v-list-item-action>
                  <v-btn icon small @click="changeFavourite(stop)">
                    <v-icon
                      v-if="bkkFavouriteStops.find((s) => s.id === stop.id)"
                    >
                      mdi-star
                    </v-icon>
                    <v-icon v-else>mdi-star-outline</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-slide-group show-arrows>
                  <v-slide-item v-for="route in stop.routes" :key="route.id">
                    <vehicle class="mx-1 mb-2" :color="route.style.color">
                      {{ route.shortName }}
                    </vehicle>
                  </v-slide-item>
                </v-slide-group>
              </v-list-item>
            </v-list>
          </v-card>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import StoreMixin from "@/mixins/StoreMixin";
import NowMixin from "@/mixins/NowMixin";
import Vehicle from "./Vehicle.vue";

export default {
  name: "BKK",
  components: { Vehicle },
  mixins: [StoreMixin, NowMixin],
  props: {},
  data: () => ({ query: null, stopDialog: false }),
  computed: {
    stops() {
      return this.bkkFavouriteStops.length
        ? this.bkkFavouriteStops
        : this.bkkCloseStops.slice(0, 3);
    },
    departuresByStation() {
      return this.bkkDepartures.reduce((accumulator, current) => {
        if (current.stop.parentStationId)
          (accumulator[current.stop.parentStationId] =
            accumulator[current.stop.parentStationId] || []).push(current);
        return accumulator;
      }, {});
    },
  },
  mounted() {
    this.search();
  },
  methods: {
    async search(query) {
      if (!query) {
        await this.fetchBkkCloseStops();
        await this.fetchBkkDepartures();
        return;
      }
      if (query.length >= 3) {
        await this.fetchBkkCloseStops(query);
        await this.fetchBkkDepartures();
      }
    },
    changeFavourite(id) {
      this.setBkkFavouriteStop(id);
      this.fetchBkkDepartures();
    },
  },
};
</script>
<style lang="scss" scoped>
.stopTime + .stopTime {
  margin-top: 16px;
}
.stop + .stop {
  margin-top: 16px;
}
</style>
