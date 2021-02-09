<template>
  <div class="bkk" style="width: min(100%,380px)">
    <v-card
      class="mx-auto"
      style="width: 100%"
      elevation="2"
      :loading="weatherData.loading"
    >
      <v-list-item>
        <v-list-item-title class="font-alata">
          Ábránd utca
        </v-list-item-title>
      </v-list-item>
      <v-list>
        <v-list-item>
          <v-list-item-title>
            <vehicle>257E</vehicle><span> Hűvösvölgy </span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
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
  mounted() {
    this.fetchBkkCloseStops()
  }
};
</script>
