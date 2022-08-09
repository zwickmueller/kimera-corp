<template>
<single-grid>
  <!-- <transition-group tag="div" class="kimera-grid" name="list" @before-leave="beforeLeave"> -->
  <component v-for="blok in blok.body" :key="blok._uid" :blok="blok" :is="blok.component" />
  <!-- </transition-group> -->
</single-grid>
</template>

<script>
export default {
  // props: ['projects'],
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
}
</script>

<!-- grid style in singeGrid.vue -->
