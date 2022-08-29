<template>
<div class="kimera-flex-grid">
  <!-- <single-grid-item v-for="project in projects" :project="project" :key="project.name" :width="project.width"></single-grid-item> -->
  <slot></slot>

</div>
</template>

<script>
export default {
  // props: ['projects'],

}
</script>

<style lang="scss">
// .kimera-grid {
//     height: 100%;
//     display: grid;
//     grid-gap: 8px;
//     row-gap: 14px;
//     padding-left: var(--kimera-side-padding);
//     padding-right: var(--kimera-side-padding);
//     grid-template-columns: repeat(8, 1fr);
//     position: relative;
// }
</style>
