<template>
  <div class="bkk">
    <v-text-field
      v-model="query"
      label="Search stops"
      solo
      clearable
      @input="search"
    ></v-text-field>
    <div class="scroll-container fill-height">
      <v-card
        v-for="(stop, i) in bkkCloseStops"
        :key="i"
        class="mx-auto my-2"
        style="width: 100%"
        elevation="2"
        :loading="weatherData.loading"
      >
        <v-list>
          <v-list-item>
            <v-list-item-title class="font-alata">
              {{ stop.name }}
            </v-list-item-title>
            <v-list-item-action>
              <v-btn icon small @click="changeFavourite(stop)">
                <v-icon v-if="bkkFavouriteStops.find((s) => s.id === stop.id)">
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
  data: () => ({ query: null }),
  computed: {
    stops() {
      return this.bkkFavouriteStops.length
        ? this.bkkFavouriteStops
        : this.bkkCloseStops.slice(0, 3);
    },
  },
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
    changeFavourite(id) {
      this.setBkkFavouriteStop(id);
      this.fetchBkkDepartures();
    },
  },
};
</script>
<style lang="scss" scoped>
.scroll-container {
  max-height: 500px;
  overflow-y: auto;
}
</style>
