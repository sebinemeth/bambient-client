<template>
  <div class="bkk" style="width: min(100%,380px)">
    <v-text-field
      label="Search stops"
      filled
      v-model="query"
      @input="search"
      clearable
    ></v-text-field>
    <v-card
      class="mx-auto my-2"
      style="width: 100%"
      elevation="2"
      :loading="weatherData.loading"
      v-for="(stop, i) in bkkCloseStops.list"
      :key="i"
    >
      <v-list-item>
        <v-list-item-title class="font-alata">
          {{ stop.name }}
        </v-list-item-title>
      </v-list-item>
      <div class="px-3 pb-3">
        <vehicle
          class="mx-1 mb-2"
          v-for="route in stop.routeIds.map(
            (id) => bkkCloseStops.references.routes[id]
          )"
          :key="route.id"
          :color="route.style.color"
          >{{ route.shortName }}</vehicle
        >
      </div>
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
  data: () => ({ query: null }),
  mounted() {
    this.search();
  },
  methods: {
    search(query) {
      if (!query) {
        this.fetchBkkCloseStops();
        return;
      }
      if (query.length >= 3) this.fetchBkkCloseStops(query);
    },
  },
};
</script>
