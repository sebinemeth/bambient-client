<template>
  <div>
    <v-form>
      <v-container>
        <v-card
          v-for="stop in bkkFavouriteStops"
          :key="stop.id"
          color="black"
          class="mb-3"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ stop.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ stop.name }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="removeStop(stop)">
                <v-icon>mdi-map-marker-remove</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
        <v-autocomplete
          :disabled="bkkFavouriteStops.length >= 3"
          v-model="stopToAdd"
          :loading="bkkStopsLoading"
          :items="groupedStops"
          chips
          color="blue-grey lighten-2"
          item-text="name"
          item-value="id"
          return-object
          flat
          :search-input.sync="query"
          hide-no-data
          hide-details
          :label="
            bkkFavouriteStops.length < 3
              ? 'Search for a stop'
              : 'Only 3 stops can be added'
          "
          solo-inverted
        >
          <template v-slot:item="{ item }">
            <template v-if="!isObject(item)">
              <v-list-item-content v-text="item"></v-list-item-content>
            </template>
            <template v-else>
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  <v-slide-group>
                    <v-slide-item v-for="route in item.routes" :key="route.id">
                      <vehicle
                        :color="route.style.color"
                        size="tiny"
                        class="mr-1"
                      >
                        {{ route.shortName }}
                      </vehicle>
                    </v-slide-item>
                  </v-slide-group>
                </v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
          <template v-slot:append-outer>
            <v-btn icon :disabled="!stopToAdd" @click="addStop">
              <v-icon>mdi-map-marker-plus</v-icon>
            </v-btn>
          </template>
        </v-autocomplete>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import StoreMixin from "@/mixins/StoreMixin";
import Vehicle from "./Vehicle.vue";
export default {
  name: "BKKStopPicker",
  components: { Vehicle },
  mixins: [StoreMixin],
  data: () => ({ stopToAdd: null, query: null }),
  computed: {
    groupedStops() {
      return [...this.bkkCloseStops]
        .sort((a, b) => {
          const aId = parseInt(a.id.substr(-5));
          const bId = parseInt(b.id.substr(-5));
          const aParent = a.parentStationId
            ? parseInt(a.parentStationId.substr(-5))
            : null;
          const bParent = b.parentStationId
            ? parseInt(b.parentStationId.substr(-5))
            : null;

          //console.log(aId, bId, aParent, bParent);

          if (!aParent && !bParent)
            // both are parents
            return aId - bId;
          if (aParent && bParent)
            // both are stops
            return aParent - bParent || aId - bId;
          // one-one
          return (
            (aParent || aId) - (bParent || bId) ||
            b.locationType - a.locationType
          );
        })
        .map((stop) =>
          stop.locationType === 1 ? { header: stop.name } : stop
        );
    },
  },
  watch: {
    query(query) {
      console.log(query);
      if (this.stopToAdd || this.bkkStopsLoading) return;
      if (!query || query.length >= 3) this.fetchBkkCloseStops(query || null);
    },
  },
  methods: {
    changeFavourite(id) {
      this.setBkkFavouriteStop(id);
    },
    addStop() {
      this.changeFavourite(this.stopToAdd);
      this.stopToAdd = null;
    },
    removeStop(stop) {
      this.changeFavourite(stop);
      if (!this.bkkFavouriteStops.length) this.fetchBkkCloseStops(null);
    },
    isObject(o) {
      return typeof o === "object";
    },
  },
};
</script>
