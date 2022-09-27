<template lang="html">
<!-- <div class="" > -->
  <svg class="dark-mode-toggle" role="checkbox" width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="14" rx="7" :fill="invert ? '#EAEAEA': 'black'"/>
  <circle :cx="invert ? 17: 7" cy="7" r="5" :fill="invert ? 'black': '#EAEAEA'"/>
  </svg>
<!-- </div> -->

</template>

<script>
export default {
  props: {
    invert: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
svg {
    cursor: pointer;
    pointer-events: all;
}
svg * {
    pointer-events: none;
    transition: all 0.375s ease;
}
</style>
