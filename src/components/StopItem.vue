<template>
  <v-card color="black" class="mb-3">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{ stop.name }}</v-list-item-title>
        <v-list-item-subtitle>
          <v-slide-group>
            <v-slide-item v-for="route in stop.routes" :key="route.id">
              <vehicle :color="route.style.color" size="tiny" class="mr-1">
                {{ route.shortName }}
              </vehicle>
            </v-slide-item>
          </v-slide-group>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <slot name="action"></slot>
      </v-list-item-action>
    </v-list-item>
  </v-card>
</template>
<script>
import Vehicle from "./Vehicle.vue";
export default {
  name: "StopItem",
  components: { Vehicle },
  props: {
    stop: {
      type: Object,
      required: true,
    },
  },
};
</script>
