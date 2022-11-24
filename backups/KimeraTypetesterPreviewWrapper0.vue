<template lang="html">
  <kimera-typetester-preview  :typetester-data="typetesterData"></kimera-typetester-preview>
  <!-- :class="`grid-width-${this.blok.width}`" -->
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
    typetesterData() {
      return {
        text: this.blok.text,
        invertColors: this.blok.invertColors,
        style: {
          fontFamily: this.blok.fontFamily ? this.blok.fontFamily : 'Waldenburg',
          fontSize: this.blok.fontSize + 'px',
          letterSpacing: (this.blok.letterSpacing / 100) + 'em',
          lineHeight: this.blok.lineHeight + '%',
          textAlign: this.blok.textAlign,
          fontWeight: this.blok.fontWeight ? this.blok.fontWeight : 375,
        },
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
