<template>
  <div class="bkk">
      bkk
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "BKK",
  props: ["config"],
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        //const response = await axios.get("https://futar.bkk.hu/api/query/v1/ws/otp/api/where/arrivals-and-departures-for-location.json");
        //console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>