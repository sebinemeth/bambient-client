<template>
  <div class="bkk fill-height">
    <v-card
      v-for="(station, key) in departuresByStation"
      :key="key"
      elevation="2"
      class="mb-3 pb-3"
      :loading="bkkDeparturesLoading"
    >
      <v-card-title>{{ station[0].stop.name }}</v-card-title>
      <v-card
        v-for="stop in station"
        :key="stop.stopId"
        color="black"
        class="stop mx-3"
      >
        <v-card-text>
          <div
            v-for="(stopTime, i) in stop.stopTimes.slice(0, 5)"
            :key="i"
            class="stopTime d-flex align-center"
          >
            <vehicle class="mr-2" :color="stopTime.trip.route.style.color">
              {{ stopTime.trip.route.shortName }} </vehicle
            >{{ stopTime.trip.tripHeadsign }}
            <span
              class="ml-auto"
              :class="{ 'success--text': !!stopTime.predictedDepartureTime }"
              >{{
                new Date(
                  (stopTime.predictedDepartureTime || stopTime.departureTime) *
                    1000
                ).toLocaleTimeString($i18n.locale)
              }}</span
            >
          </div>
        </v-card-text>
      </v-card>
    </v-card>

    <div class="d-flex justify-end">
      <v-dialog v-model="stopDialog" max-width="600">
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
          <BKKStopPicker />
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import StoreMixin from "@/mixins/StoreMixin";
import Vehicle from "./Vehicle.vue";
import BKKStopPicker from "./BKKStopPicker.vue";

export default {
  name: "BKK",
  components: { Vehicle, BKKStopPicker },
  mixins: [StoreMixin],
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
    this.fetchBkkDepartures();
  },
  methods: {},
  watch: {
    bkkFavouriteStops() {
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
