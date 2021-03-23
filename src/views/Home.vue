<template>
  <div class="pa-1">
    <v-row class="main-row">
      <v-col cols="12" md="6" class="d-flex justify-center align-center">
        <div class="ma-5" style="width: 100%">
          <date-time />
          <weather />
        </div>
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-center align-center">
        <div class="ma-5" style="width: 100%">
          <BKK />
        </div>
      </v-col>
    </v-row>
  </div>
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
<style lang="scss" scoped>
.main-row {
  min-height: 100vh;
}
</style>
