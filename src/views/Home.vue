<template>
  <v-container  class="fill-height">
  <v-row>
    <v-col cols="6" class="d-flex flex-column align-center">
      <datetime :config="config" />
      <weather :config="config" />
    </v-col>
    <v-col cols="6" class="d-flex flex-column align-center">
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
  components: { datetime: DateTime, weather: Weather, bkk: BKK }
};
</script>
