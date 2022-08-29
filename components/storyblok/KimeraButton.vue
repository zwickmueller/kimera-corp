<template lang="html">

  <button type="button" name="kimera-button" class="kimera-button kimera-text-filter reset">  {{blok.title}}</button>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
}
</script>

<style lang="scss" scoped>
.kimera-button {
    background: var(--black);
    color: var(--kimera-white);
    padding: 1em;
    border-radius: var(--kimera-button-border-radius);
    width: 100%;
    max-width: calc(100vw/8*2 - 8px);
    margin: 0 auto;
    display: block;
    text-align: center;
}
</style>
