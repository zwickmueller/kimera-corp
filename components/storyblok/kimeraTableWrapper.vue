<template>
  <div :style="`columns: ${blok.columns}`" class="kimera-table-wrapper">
    <component
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
      :is="blok.component"
    />
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.kimera-table-wrapper {
  @include until($tablet) {
    padding: 0 calc(var(--kimera-grid-gap));
    columns: 1 !important;
  }
}
</style>
