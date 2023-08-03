<template>
  <div>
    <!-- :style="style" -->
    <component
      :key="blok._uid"
      v-for="blok in blok.body"
      :blok="blok"
      :is="blok.component"
    />
    <!-- :baseFont="blok.baseFont" -->
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
<style lang="scss"></style>
