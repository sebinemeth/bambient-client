<template>
  <v-chip
    label
    :color="'#' + color"
    style="width: 60px;"
    class="justify-center"
    :class="{ 'black--text': bgBrightness > 0.6 }"
  >
    <slot></slot>
  </v-chip>
</template>
<script>
export default {
  name: "Vehicle",
  props: {
    type: {
      type: String,
      default: "bus",
    },
    color: {
      type: String,
      default: "009FE3",
    },
  },
  computed: {
    bgBrightness() {
      const r = parseInt(this.color.substr(0, 2), 16);
      const g = parseInt(this.color.substr(2, 2), 16);
      const b = parseInt(this.color.substr(4, 2), 16);
      return (r + g + b) / 3 / 256;
    },
  },
};
</script>
