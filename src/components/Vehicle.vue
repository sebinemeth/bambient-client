<template>
  <v-chip
    label
    :color="'#' + color"
    style="width: 60px;"
    class="justify-center"
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
  computed: {},
};
</script>
