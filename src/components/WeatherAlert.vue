<template>
  <v-dialog v-if="dialog" v-model="show" max-width="450" >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" class="ma-1">
        <v-icon color="warning">mdi-alert-circle</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        <v-icon color="warning" class="mr-2">mdi-alert-circle</v-icon>
        {{ alert.event }}
      </v-card-title>
      <v-card-text>
        {{ alert.description }}
      </v-card-text>
      <v-card-text>
        From {{ new Date(alert.start * 1000).toLocaleString() }} to
        {{ new Date(alert.end * 1000).toLocaleString() }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="show = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-alert v-else border="top" colored-border type="error" elevation="2">
    <v-list-item style="min-height: 0px">
      <v-list-item-content class="py-0">
        <v-list-item-title>
          {{ alert.event }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action class="my-0">
        <v-btn icon small @click="show = !show">
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
        <small>From {{ new Date(alert.start * 1000).toLocaleString() }} to
          {{ new Date(alert.end * 1000).toLocaleString() }}</small>
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
    dialog: {
      type: Boolean,
      default: true,
    }
  },
  data: () => ({ show: false }),
};
</script>
