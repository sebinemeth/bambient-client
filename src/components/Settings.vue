<template>
  <v-card>
    <v-toolbar dark color="accent">
      <v-btn icon dark @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ $t('settings') }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="resetSettings">
          {{ $t('reset') }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-list subheader>
      <v-subheader>{{ $t('general') }}</v-subheader>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ $t('language') }}</v-list-item-title>
          <v-list-item-subtitle>
            Change the language of the app
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <!--v-select
            v-model="$i18n.locale"
            dense
            solo
            :items="
              $i18n.availableLocales.map((locale) => ({
                locale,
                text: $t(`locale-${locale}`),
              }))
            "
            item-text="text"
            item-value="locale"
          ></v-select-->
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text color="primary" v-bind="attrs" v-on="on">
                {{ $i18n.locale }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="item in $i18n.availableLocales.map((locale) => ({
                  locale,
                  text: $t(`locale-${locale}`),
                }))"
                :key="item.locale"
                @click="$i18n.locale = item.locale"
              >
                <v-list-item-title
                  :class="{ 'primary--text': item.locale === $i18n.locale }"
                >
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </v-list-item>
      <v-list-item @click="reload">
        <v-list-item-content>
          <v-list-item-title>Refresh</v-list-item-title>
          <v-list-item-subtitle>
            Refresh to see new content
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click="reload">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-list-item @click="setNoSleep(!noSleep)">
        <v-list-item-content>
          <v-list-item-title>NoSleep</v-list-item-title>
          <v-list-item-subtitle>
            Prevent device from turning off screen
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch :input-value="noSleep" inset></v-switch>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list subheader>
      <v-subheader>{{ $t('date-and-time') }}</v-subheader>
      <v-list-item @click="setShowSeconds(!showSeconds)">
        <v-list-item-content>
          <v-list-item-title>Show seconds</v-list-item-title>
          <v-list-item-subtitle>
            Display the seconds along with hours and minutes
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch :input-value="showSeconds" inset></v-switch>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list subheader>
      <v-subheader>{{ $t('weather') }}</v-subheader>
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
import StoreMixin from "@/mixins/StoreMixin";
export default {
  name: "Settings",
  mixins: [StoreMixin],
  methods: {
    close() {
      this.$emit("close");
    },
    resetSettings() {
      window.localStorage.clear();
      this.$store.commit("resetState");
    },
    reload() {
      window.location.reload(true);
    },
  },
};
</script>
