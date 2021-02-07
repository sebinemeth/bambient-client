<template>
  <div class="datetime">
    <div class="time text-center font-alata">12:21</div>
    <div class="date text-center font-alata">május 21. Cs</div>
  </div>
</template>

<script>
export default {
  name: "DateTime",
  props: {
    config: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style> 

.time {
    font-size: 6em;
}
.date {
    font-size: 2.2em;
}

</style>