<template>
  <single-grid>
    <component
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
      :is="blok.component"
    />
  </single-grid>
</template>

<script>
export default {
  // props: ['projects'],
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
};
</script>

<!-- grid style in singeGrid.vue -->
