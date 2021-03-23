<template>
  <div>
    <v-container>
      <v-list subheader>
        <v-subheader>
          Favourite stops ({{ bkkFavouriteStops.length }}/3)
        </v-subheader>
        <stop-item
          v-for="stop in bkkFavouriteStops"
          :key="'fav:' + stop.id"
          :stop="stop"
        >
          <v-btn slot="action" icon @click="removeStop(stop)">
            <v-icon>mdi-bookmark</v-icon>
          </v-btn>
        </stop-item>
        <v-subheader>
          Close stops
        </v-subheader>
        <stop-item
          v-for="stop in bkkCloseStops"
          :key="'close:' + stop.id"
          :stop="stop"
        >
          <v-btn
            v-if="bkkFavouriteStops.find((s) => s.id === stop.id)"
            slot="action"
            icon
            @click="removeStop(stop)"
          >
            <v-icon>mdi-bookmark</v-icon>
          </v-btn>
          <v-btn v-else slot="action" icon @click="changeFavourite(stop)">
            <v-icon>mdi-bookmark-outline</v-icon>
          </v-btn>
        </stop-item>
        <v-list-item>
          <v-text-field
            v-model="query"
            prepend-inner-icon="mdi-magnify"
            :placeholder="'Search by name'"
            clearable
            :hint="'Type at least 4 characters to search'"
          ></v-text-field>
        </v-list-item>
        <pager :items="bkkStops" :show-count="3">
          <template v-slot:item="{ item }">
            <stop-item :stop="item">
              <v-btn
                v-if="bkkFavouriteStops.find((s) => s.id === item.id)"
                slot="action"
                icon
                @click="removeStop(item)"
              >
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>
              <v-btn v-else slot="action" icon @click="changeFavourite(item)">
                <v-icon>mdi-bookmark-outline</v-icon>
              </v-btn>
            </stop-item>
          </template>
        </pager>
      </v-list>
    </v-container>
  </div>
</template>
<script>
import StoreMixin from "@/mixins/StoreMixin";
import StopItem from "./StopItem.vue";
import Pager from "./Pager.vue";
export default {
  name: "BKKStopPicker",
  components: { StopItem, Pager },
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
      if (this.loading.bkkStops) return;
      if (query && query.length >= 4) this.fetchBkkStops(query);
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
