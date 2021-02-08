<template>
  <v-alert border="top" colored-border type="error" elevation="2">
    <v-list-item style="min-height: 0px">
      <v-list-item-content class="py-0">
        <v-list-item-title>
          {{ alert.event }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action class="my-0">
        <v-btn icon @click="show = !show" small>
          <v-icon> {{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>

    <v-expand-transition>
      <div v-show="show">
        <small>
          {{ alert.description }}
        </small>
        <br />
        <small
          >From {{ new Date(alert.start * 1000).toLocaleString() }} to
          {{ new Date(alert.end * 1000).toLocaleString() }}</small
        >
      </div>
    </v-expand-transition>
  </v-alert>
</template>
<script>
export default {
  name: "WeatherAlert",
  props: {
    alert: {
      type: Object,
      required: true,
    },
  },
  data: () => ({ show: false }),
};
</script>
