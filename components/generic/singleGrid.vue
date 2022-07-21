<template>
<div class="kimera-grid">
  <single-grid-item v-for="project in projects" :project="project" :width="project.width"></single-grid-item>


</div>
</template>

<script>
export default {
  props: ['projects']
}
</script>

<style lang="scss" scoped>
.kimera-grid {
    height: 100%;
    display: grid;
    grid-gap: 8px;
    row-gap: 14px;
    padding-left: var(--kimera-side-padding);
    padding-right: var(--kimera-side-padding);
    grid-template-columns: repeat(8, 1fr);
}
</style>
