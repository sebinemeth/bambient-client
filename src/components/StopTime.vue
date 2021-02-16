<template>
  <div v-if="minutesToGo > -1.5" class="stopTime d-flex align-center">
    <vehicle class="mr-2" :color="stopTime.trip.route.style.color">
      {{ stopTime.trip.route.shortName }}
    </vehicle>{{ stopTime.trip.tripHeadsign }}
    <span class="ml-auto time-string" :class="timeClassString">
      {{ timeString }}
    </span>
  </div>
</template>
<script>
import Vehicle from "./Vehicle.vue";
import NowMixin from "@/mixins/NowMixin";
export default {
  name: "StopTime",
  components: { Vehicle },
  mixins: [NowMixin],
  props: {
    stopTime: {
      type: Object,
      required: true,
    },
  },
  computed: {
    departure() {
      return new Date(
        (this.stopTime.predictedDepartureTime || this.stopTime.departureTime) *
          1000
      );
    },
    isRealTime() {
      return !!this.stopTime.predictedDepartureTime;
    },
    departed() {
      return this.minutesToGo < 0;
    },
    minutesToGo() {
      return (this.departure - this.now) / 1000 / 60;
    },
    departsNow() {
      return Math.round(this.minutesToGo) === 0;
    },
    timeString() {
      if (this.departsNow) return this.$t("now");
      if (this.minutesToGo < 0)
        return this.$t("n-minutes-ago", { n: -Math.round(this.minutesToGo) });
      if (this.minutesToGo < 20) return `${Math.round(this.minutesToGo)}'`;
      return this.departure.toLocaleTimeString(this.$i18n.locale, {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    timeClassString() {
      if (this.departsNow)
        return this.departed ? "black--text error" : "black--text success";
      if (this.isRealTime)
        return this.departed ? "error--text" : "success--text";
      return "";
    },
  },
};
</script>
<style lang="scss" scoped>
.time-string {
  padding: 4px 6px;
  border-radius: 4px;
}
</style>
