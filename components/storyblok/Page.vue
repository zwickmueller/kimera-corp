<template>
<div v-editable="blok" class="page">
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

  }
}
</script>

<style lang="scss">

</style>
