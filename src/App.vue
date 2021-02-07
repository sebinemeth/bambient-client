<template>
  <v-app>
    <div class="d-flex">
      <!--fullscreen-->
      <v-dialog
        v-model="dialog"
        hide-overlay
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon class="ma-3" v-bind="attrs" v-on="on">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <settings @close="dialog = false" />
      </v-dialog>
      <v-spacer></v-spacer>
      <v-btn icon class="ma-3" @click.stop="toggleFullScreen">
        <v-icon>mdi-fullscreen</v-icon>
      </v-btn>
    </div>

    <v-main dark>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Settings from "@/components/Settings.vue";
export default {
  name: "App",

  components: { Settings },

  data: () => ({ dialog: false }),

  created() {
    this.$vuetify.theme.dark = true;
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
    },
  },
};
</script>

<style>
html {
  overflow: hidden;
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
