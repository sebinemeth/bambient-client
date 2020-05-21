<template>
  <v-row>
    <v-col>
      <datetime :config="config" />
      <weather :config="config" />
    </v-col>
    <v-col>
      <bkk :config="config" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Home",
  props: ["config"]
};
</script>
