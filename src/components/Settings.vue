<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Settings</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="resetSettings">
          Reset
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-list subheader>
      <v-subheader>General</v-subheader>
      <v-list-item>
        <v-list-item-action>
          <v-switch
            :input-value="noSleep"
            inset
            @change="setNoSleep"
          ></v-switch>
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
    <v-list subheader>
      <v-subheader>Date & Time</v-subheader>
      <v-list-item>
        <v-list-item-action>
          <v-switch
            :input-value="showSeconds"
            inset
            @change="setShowSeconds"
          ></v-switch>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Show seconds</v-list-item-title>
          <v-list-item-subtitle>
            Display the seconds along with hours and minutes
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list subheader>
      <v-subheader>Weather</v-subheader>
      <v-list-item>
        <v-slider
          label="Refresh interval"
          hint="Frequency of querying the weather service for up-to-date info"
          persistent-hint
          :value="weatherInterval"
          :input-value="weatherInterval"
          :min="5"
          :max="60"
          :step="5"
          thumb-label
          class="align-center"
          @change="setWeatherInterval"
        >
          <template v-slot:append>
            <v-text-field
              :value="weatherInterval"
              :input-value="weatherInterval"
              :min="5"
              :max="60"
              :step="5"
              class="mt-0 pt-0"
              type="number"
              suffix="mins"
              style="width: 90px"
              @change="setWeatherInterval"
            ></v-text-field>
          </template>
        </v-slider>
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
    resetSettings() {
      window.localStorage.clear();
      this.$store.commit("resetState");
    },
  },
};
</script>
