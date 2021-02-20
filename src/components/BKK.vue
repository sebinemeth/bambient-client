<template>
  <div class="bkk">
    <v-card
      v-for="(station, key) in departuresByStation"
      :key="key"
      elevation="2"
      class="station pb-3"
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
          <stop-time
            v-for="(stopTime, i) in stop.stopTimes.slice(0, 5)"
            :key="i"
            :stop-time="stopTime"
          />
        </v-card-text>
      </v-card>
    </v-card>

    <v-card-actions>
      <v-btn
        icon
        x-small
        class="mr-2"
        :loading="bkkDeparturesLoading"
        @click="fetchBkkDepartures"
      >
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <small>
        {{ refreshTimePassed }}
      </small>
      <v-spacer></v-spacer>
      <v-dialog v-model="stopDialog" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text small v-bind="attrs" v-on="on">
            {{ $t('edit-stops') }}
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="accent">
            <v-btn icon dark @click="stopDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ $t('edit-stops') }}</v-toolbar-title>
          </v-toolbar>
          <BKKStopPicker />
        </v-card>
      </v-dialog>
    </v-card-actions>
  </div>
</template>

<script>
import StoreMixin from "@/mixins/StoreMixin";
import NowMixin from "@/mixins/NowMixin";
import StopTime from "./StopTime.vue";
import BKKStopPicker from "./BKKStopPicker.vue";

export default {
  name: "BKK",
  components: { StopTime, BKKStopPicker },
  mixins: [StoreMixin, NowMixin],
  props: {},
  data: () => ({ query: null, stopDialog: false, refreshTimeout: null }),
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
    refreshTimePassed() {
      if (!this.bkkDeparturesRefreshed) return "";
      const diffMinutes =
        (this.now - this.bkkDeparturesRefreshed.getTime()) / 1000 / 60;
      return diffMinutes < 1
        ? this.$t('just-now')
        : this.$t("n-minutes-ago", { n: Math.round(diffMinutes) });
    },
  },
  watch: {
    bkkFavouriteStops() {
      this.fetchBkkDepartures();
    },
    bkkDepartures() {
      const prevTimeout = this.refreshTimeout;
      if (this.refreshTimeout) window.clearTimeout(this.refreshTimeout);
      this.refreshTimeout = window.setTimeout(
        this.fetchBkkDepartures,
        5 * 60 * 1000
      );
      console.log(prevTimeout, this.refreshTimeout);
    },
  },
  async mounted() {
    if (!this.stops.length) await this.fetchBkkCloseStops();
    this.fetchBkkDepartures();
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.station,
.stop,
.stopTime {
  & + & {
    margin-top: 16px;
  }
}
</style>
