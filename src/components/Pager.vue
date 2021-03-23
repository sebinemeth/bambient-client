<template>
  <div>
    <template v-for="item in filteredItems">
      <slot name="item" :item="item">
        default
      </slot>
    </template>
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              class="my-4"
              :length="pageNum"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "Pager",
  props: {
    items: {
      type: Array,
      required: true,
    },
    showCount: {
      type: Number,
      default: 10,
    },
  },
  data: () => ({ page: 1 }),
  computed: {
    filteredItems() {
      const from = (this.page - 1) * this.showCount;
      console.log(from);
      return this.items.slice(from, from + this.showCount);
    },
    pageNum() {
      return Math.ceil(this.items.length / this.showCount);
    },
  },
};
</script>
