<template>
  <v-container class="fill-height">
    <v-row>
      <v-col class="col-12 col-md-6 d-flex flex-column align-center">
        <datetime :config="config" />
        <weather :config="config" />
      </v-col>
      <v-col class="col-12 col-md-6 d-flex flex-column align-center">
        <bkk :config="config" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DateTime from "@/components/DateTime";
import Weather from "@/components/Weather";
import BKK from "@/components/BKK";

export default {
  name: "Home",
  props: ["config"],
  components: { datetime: DateTime, weather: Weather, bkk: BKK },
  watch: {
    config: {
      handler(oldVal, newVal) {
        if (
          this.config.location == null ||
          oldVal.locationRefresh != newVal.locationRefresh
        ) {
          console.log("[loc] watcher")
          this.locationRefresh();
        }
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    locationRefresh() {
      var self = this;
      var callBack = function(position) {
        self.config.location = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        };
        console.log("Location updated", self.config.location);
      };
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callBack);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  }
};
</script>
