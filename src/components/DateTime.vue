<template>
  <div class="datetime">
    <div class="time text-center font-alata">
      {{ timeString
      }}<span v-if="showSeconds" class="seconds">:{{ secondsString }}</span>
    </div>
    <div class="date text-center font-alata">
      {{ dateString }}
    </div>
  </div>
</template>

<script>
import StoreMixin from "@/mixins/StoreMixin";
import NowMixin from "@/mixins/NowMixin";
export default {
  name: "DateTime",
  mixins: [StoreMixin, NowMixin],
  
  computed: {
    timeString() {
      const hours = this.now.getHours();
      const minutes = this.now.getMinutes();
      return (
        (hours > 9 ? "" : "0") +
        hours +
        ":" +
        (minutes > 9 ? "" : "0") +
        minutes
      );

      // localized version:
      const timeConfig = {
        hour: "2-digit",
        minute: "2-digit",
      };
      return this.now.toLocaleTimeString(this.$i18n.locale, timeConfig);
    },
    secondsString() {
      const secs = this.now.getSeconds();
      return (secs > 9 ? "" : "0") + secs;
    },
    dateString() {
      const dateConfig = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return this.now.toLocaleDateString(this.$i18n.locale, dateConfig);
    },
  },
};
</script>

<style>
.time {
  font-size: 6em;
}
.seconds {
  font-size: 0.6em;
  opacity: 0.5;
  min-width: 1.8em;
  margin-left: 0.1em;
  display: inline-block;
  text-align: left;
}
.date {
  font-size: 2.2em;
}
</style>
