<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Settings</v-toolbar-title>
    </v-toolbar>
    <v-list three-line subheader>
      <v-subheader>General</v-subheader>
      <v-list-item>
        <v-list-item-action>
          <v-switch :input-value="noSleep" @change="setNoSleep"></v-switch>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>NoSleep</v-list-item-title>
          <v-list-item-subtitle>
            Prevent device from turning off screen
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list three-line subheader>
      <v-subheader>General</v-subheader>
      <v-list-item>
        <v-list-item-action>
          <v-switch :input-value="showSeconds" @change="setShowSeconds"></v-switch>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Show seconds</v-list-item-title>
          <v-list-item-subtitle>
            Notify me about updates to apps or games that I
            downloaded
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
import ConfigMixin from "@/mixins/ConfigMixin";
export default {
  name: "Settings",
  mixins: [ConfigMixin],
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
