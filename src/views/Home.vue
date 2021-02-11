<template>
  <div class="fill-height">
    <div class="fill-height d-block d-md-flex align-center">
      <div class="my-5 mx-3 flex-grow-1 d-flex flex-column align-center">
        <date-time />
        <weather />
      </div>
      <div class="my-5 mx-3 flex-grow-1 d-flex flex-column align-center">
        <BKK />
      </div>
    </div>
  </div>
</template>

<script>
import DateTime from "@/components/DateTime";
import Weather from "@/components/Weather";
import BKK from "@/components/BKK";

export default {
  name: "Home",
  components: { DateTime, Weather, BKK },
  data: () => ({}),
};
</script>
<style lang="scss" scoped>
.scroll-col {
  max-height: 100%;
  overflow-y: scroll;
}
</style>
