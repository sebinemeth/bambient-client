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
          v-model="stopToAdd"
          :loading="bkkStopsLoading"
          :items="bkkCloseStops"
          chips
          color="blue-grey lighten-2"
          item-text="name"
          item-value="id"
          return-object
          flat
          :search-input.sync="query"
          hide-no-data
          hide-details
          label="Search for a stop"
          solo-inverted
        >
          <template v-slot:item="{ item }">
            <v-list-item-avatar :color="'#' + item.style.colors[0]">
              {{ item.routes.length }}
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.name }}</v-list-item-subtitle>
            </v-list-item-content>
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
export default {
  name: "BKKStopPicker",
  mixins: [StoreMixin],
  data: () => ({ stopToAdd: null, query: null }),
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
    },
  },
};
</script>
