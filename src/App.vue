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
      <v-list-item class="pb-3">
        <v-list-item-content>
          <v-list-item-title class="apptitle">bAmbient</v-list-item-title>
          <v-list-item-subtitle>A Budapest ambient display</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list dense>
        <v-divider></v-divider>
        <v-subheader class="pa-4">General settings</v-subheader>
        <v-list-item>
          <v-switch v-model="config.enableNoSleep" inset label="NoSleep" hide-details class="mb-6"></v-switch>
        </v-list-item>
        <v-divider></v-divider>

        <v-divider></v-divider>
        <v-subheader class="pa-4">Time and date settings</v-subheader>
        <v-list-item>
          <v-switch v-model="config.showSecs" inset label="Show seconds" hide-details></v-switch>
        </v-list-item>
        <v-list-item>
          <v-switch v-model="config.showDate" inset label="Show date" hide-details class="mb-6"></v-switch>
        </v-list-item>
        <v-list-item v-if="config.showDate">
          <v-select
            v-model="config.dateFormat"
            dense
            :items="dateFormats"
            label="Date format"
            item-text="sample"
            return-object
          ></v-select>
        </v-list-item>

        <v-divider></v-divider>
        <v-subheader class="pa-4">Refresh settings (refresh every n minutes)</v-subheader>
        <v-list-item>
          <v-slider
            v-model="config.locationRefresh"
            class="align-center"
            :min="15"
            :max="60*3"
            step="1"
            label="Location"
            thumb-label
            hide-details
          ></v-slider>
        </v-list-item>
        <v-list-item>
          <v-slider
            v-model="config.weatherRefresh"
            class="align-center"
            :min="10"
            :max="60"
            step="1"
            label="Weather"
            thumb-label
            hide-details
          ></v-slider>
        </v-list-item>
        <v-list-item>
          <v-range-slider
            v-model="config.bkkRefresh"
            class="align-center"
            :min="0"
            :max="30"
            label="Commute"
            thumb-label
            hide-details
          ></v-range-slider>
        </v-list-item>
        <v-list-item>
          <v-btn small color="primary" block @click="refreshConfig">Save and refresh</v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content dark>
      <router-view :config="config" :dt="dt" />
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
/* eslint-disable */

export default {
  name: "App",

  components: {},

  data: () => ({
    drawer: false,
    dateFormats: [
      {
        options: {
          month: "long",
          day: "numeric",
          weekday: "short",
        },
      },
      {
        options: {
          month: "long",
          day: "numeric",
        },
      },
      {
        options: {
          month: "short",
          day: "numeric",
          weekday: "short",
        },
      },
      {
        options: {
          month: "short",
          day: "numeric",
          weekday: "long",
        },
      },
    ],
    config: {
      enableNosleep: false,
      showSecs: false,
      showDate: true,
      dateFormat: {},

      locationRefresh: 30, // minutes
      bkkRefresh: [0, 10], // minutes
      weatherRefresh: 10, // minutes

      locationInterval: null,
      dateTimeInterval: null,
      weatherInterval: null,
      bkkTimeout: null,

      location: null,
    },
    dt: null,
  }),

  created() {
    this.$vuetify.theme.dark = true;
    for (var i = 0; i < this.dateFormats.length; i++)
      this.dateFormats[i] = Object.assign(this.dateFormats[i], {
        sample: Intl.DateTimeFormat(
          "hu-HU",
          this.dateFormats[i].options
        ).format(new Date(0)),
      });
    this.config.dateFormat = this.dateFormats[0];
  },

  methods: {
    refreshConfig() {
      this.dt = new Date().getTime()
    },
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
    },
  },
};
</script>

<style>
html {
  overflow: hidden;
}

.apptitle {
  font-family: "Alata", sans-serif !important;
  font-size: 1.5rem !important;
}

.theme--dark.v-application {
  background: black !important;
}
.font-lato {
  font-family: "Lato", sans-serif !important;
}
.font-alata {
  font-family: "Alata", sans-serif !important;
}
</style>
