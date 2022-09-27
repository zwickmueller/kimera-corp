<template lang="html">
  <svg class="close-icon" :width="size" :height="size" viewBox="0 0 8 8 " fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect  :width="size" :height="size" :rx="size / 2" />
  <path d="M2.09059 5.4482C1.97062 5.56817 1.96817 5.78118 2.09304 5.90604C2.22035 6.03091 2.43336 6.02846 2.55088 5.91094L4.00031 4.46151L5.44728 5.90849C5.5697 6.03091 5.78026 6.03091 5.90513 5.90604C6.02999 5.77873 6.02999 5.57062 5.90757 5.4482L4.4606 4.00122L5.90757 2.5518C6.02999 2.42938 6.03244 2.21882 5.90513 2.09396C5.78026 1.96909 5.5697 1.96909 5.44728 2.09151L4.00031 3.53849L2.55088 2.09151C2.43336 1.97154 2.2179 1.96664 2.09304 2.09396C1.96817 2.21882 1.97062 2.43428 2.09059 2.5518L3.53757 4.00122L2.09059 5.4482Z" fill="black" stroke="black" stroke-width="0.5"/>
  </svg>

</template>

<script>
export default {
  props: {
    size: {
      default: 8,
      type: Number
    }
  },
  computed: {
    viewBox() {
      return
    }
  }
  // props: {
  //   fillInner: {
  //     default: "var(--kimera-white)"
  //   },
  //   fillOuter: {
  //     default: "var(--black)"
  //   }
  // }
}
</script>

<style lang="scss" scoped>
svg {
    position: absolute;
    top: 8px;
    path,
    rect {

        transition: all 0.15s;
    }
    rect {
        fill: var(--black);
    }
    path {
        fill: var(--kimera-white);
        stroke: var(--kimera-white);
    }
}
</style>
