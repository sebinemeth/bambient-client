<template>
  <div class="datetime">
    <div class="time text-center font-alata">
      <span>{{timeString}}</span>
      <span class="seconds">{{secsString}}</span>
    </div>
    <div v-if="config.showDate" class="date text-center font-alata">{{dateString}}</div>
  </div>
</template>

<script>
export default {
  name: "DateTime",
  props: ["config"],
  data: () => ({
    now: Date.now()
  }),
  computed: {
    timeString() {
      var dt = new Date(this.now);
      var options = {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit"
      };
      return Intl.DateTimeFormat("hu-HU", options).format(dt);
    },
    secsString() {
      var dt = new Date(this.now);
      if (this.config.showSecs) {
        var ret = Intl.DateTimeFormat("hu-HU", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }).format(dt);
        return ret.substring(ret.length-3);
      }
      return "";
    },
    dateString() {
      var options = this.config.dateFormat.options || {
        month: "long",
        day: "numeric",
        weekday: "short"
      };
      return Intl.DateTimeFormat("hu-HU", options).format(new Date(this.now));
    }
  },
  mounted() {
    if (this.config.dateTimeInterval)
      clearInterval(this.config.dateTimeInterval);
    var self = this;
    this.config.dateTimeInterval = setInterval(function() {
      self.now = Date.now();
    }, 500);
  }
};
</script>

<style>
.time {
  font-size: 6em;
}
.seconds {
  font-size: 0.5em;
  opacity: 0.5;
}
.date {
  font-size: 2.2em;
}
</style>