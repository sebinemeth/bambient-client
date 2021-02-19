<template>
  <div
    :style="style"
    class="d-flex justify-center align-center py-1 px-2"
    :class="`${bgBrightness > 0.6 ? 'black' : 'white'}--text`"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "Vehicle",
  props: {
    size: {
      type: String,
      default: "normal",
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
    style() {
      let width;
      let height;
      switch (this.size) {
        case "tiny":
          width = "auto";
          height = "auto";
          break;
        default:
          width = "60px";
          height = "32px";
      }
      return {
        width,
        height,
        borderRadius: "5px",
        backgroundColor: "#" + this.color,
      };
    },
  },
};
</script>
