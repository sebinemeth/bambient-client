<template>
  <v-app>
    <div class="d-flex">
      <v-btn icon class="ma-3" @click.stop="drawer = !drawer">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon class="ma-3" @click.stop="toggleFullScreen">
        <v-icon>mdi-fullscreen</v-icon>
      </v-btn>
    </div>

    <v-navigation-drawer v-model="drawer" app absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">bAmbient</v-list-item-title>
          <v-list-item-subtitle>A Budapest ambient display</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list dense>
        <v-list-group value="true">
          <template v-slot:activator>
            <v-list-item-title>General settings</v-list-item-title>
          </template>
          <v-list-item>
            <v-list-item-content>
              <div class="d-flex">
                <v-list-item-title>NoSleep</v-list-item-title>
                <v-switch v-model="config.enableNoSleep" inset></v-switch>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Time and date settings</v-list-item-title>
          </template>
          <v-list-item>
            <v-list-item-content>
              <div class="d-flex">
                <v-list-item-title>Show seconds</v-list-item-title>
                <v-switch v-model="config.showSecs" inset></v-switch>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div class="d-flex">
                <v-list-item-title>Show date</v-list-item-title>
                <v-switch v-model="config.showDate" inset></v-switch>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div class="d-flex">
                <v-list-item-title>Date format</v-list-item-title>
                <v-select v-model="config.dateFormat" dense></v-select>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title>Refresh settings</v-list-item-title>
          </template>
          <v-list-item>
            <v-list-item-content>
              <div class="d-flex">
                <v-list-item-title>Location</v-list-item-title>
                <v-text-field type="number" suffix="s" v-model="config.refreshLocation" ></v-text-field>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content dark>
      <router-view :config="config" />
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: "App",

  components: {},

  data: () => ({
    drawer: true,
    config: {
      enableNosleep: false,
      showSecs: false,
      showDate: true,
      dateFormat: null,
      refreshLocation: 15*60,
      refreshBKK: [3, 5*60],
      refreshWeather: 15*60
    }
  }),

  created() {
    this.$vuetify.theme.dark = true;
  },

  mounted: () => {
    //this.collapseAppbar = false
  },

  methods: {
    toggleFullScreen() {
      var doc = window.document;
      var docEl = doc.documentElement;

      var requestFullScreen =
        docEl.requestFullscreen ||
        docEl.mozRequestFullScreen ||
        docEl.webkitRequestFullScreen ||
        docEl.msRequestFullscreen;
      var cancelFullScreen =
        doc.exitFullscreen ||
        doc.mozCancelFullScreen ||
        doc.webkitExitFullscreen ||
        doc.msExitFullscreen;

      if (
        !doc.fullscreenElement &&
        !doc.mozFullScreenElement &&
        !doc.webkitFullscreenElement &&
        !doc.msFullscreenElement
      ) {
        requestFullScreen.call(docEl);
      } else {
        cancelFullScreen.call(doc);
      }
    }
  }
};
</script>
