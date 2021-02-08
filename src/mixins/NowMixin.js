export default {
  data: () => ({
    nowInterval: null,
    now: new Date(),
  }),
  mounted() {
    if (this.nowInterval === null)
      this.nowInterval = window.setInterval(() => {
        this.now = new Date();
      }, 500);
  },
  beforeDestroy() {
    window.clearInterval(this.nowInterval);
  },
}