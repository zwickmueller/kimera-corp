<template>
<div v-editable="blok" class="project" :class="projectType">

  <component v-for="blok in blok.body" :key="blok._uid" :blok="blok" :is="blok.component" />
</div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }

  },
  computed: {
    projectType() {

      return this.$route.name.replace('-all', '')
    }
  }
}
</script>

<style lang="scss">

</style>
