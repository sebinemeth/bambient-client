<template>
  <v-app>
    <v-main dark>
      <div class="d-flex appbar">
        <!--fullscreen-->
        <v-dialog v-model="dialog">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon class="ma-3" v-bind="attrs" v-on="on">
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </template>
          <settings @close="dialog = false" />
        </v-dialog>
        <v-spacer></v-spacer>
        <v-btn icon class="ma-3" @click.stop="toggleFullScreen">
          <v-icon v-if="fullScreen">mdi-fullscreen-exit</v-icon>
          <v-icon v-else>mdi-fullscreen</v-icon>
        </v-btn>
      </div>
      <!--div :style="{ height }"-->
      <router-view />
      <!--/div-->
    </v-main>
  </v-app>
</template>

<script>
import Settings from "@/components/Settings.vue";
export default {
  name: "App",

  components: { Settings },

  data: () => ({ dialog: false, fullScreen: false, forceUpdate: 0 }),

  computed: {
    height() {
      this.forceUpdate;
      return window.innerHeight + "px";
    },
  },

  created() {
    this.$vuetify.theme.dark = true;
  },

  mounted() {
    document.onfullscreenchange = () =>
      (this.fullScreen = !!document.fullscreenElement);
    window.addEventListener("resize", () => this.forceUpdate++);
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

.appbar {
  position: absolute;
  z-index: 15;
  width: 100%;
  background: linear-gradient(to bottom, black, transparent);
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
