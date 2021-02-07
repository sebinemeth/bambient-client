<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="12" md="6" class="d-flex flex-column align-center">
        <date-time />
        <weather />
      </v-col>
      <v-col cols="12" md="6" class="d-flex flex-column align-center">
        <BKK />
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
  components: { DateTime, Weather, BKK },
  data: () => ({}),
};
</script>
