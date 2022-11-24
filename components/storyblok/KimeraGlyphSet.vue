<template>
<div class="kimera-glyph-set" v-if="blok.glyphList" :class="!blok.showTitle ? 'glyph-set-spacer' : ''">
  <h3 v-if="!blok.showTitle" class="kimera-text-filter-tags">{{blok.title}}</h3>
  <div class="kimera-glyph-grid">
    <single-glyph :invertedColors="invertedColors" :key="glyph + i" v-for="(glyph, i) in glyphListAsArray" :glyph="glyph"></single-glyph>
  </div>
</div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     title: "Uppercase",
  //     glyphList: "A B C D E F G H I J K L M N O P Q R S T U V W Y X Z"
  //   }
  // },
  props: {
    blok: {
      type: Object,
      required: true
    },
    invertedColors: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    glyphListAsArray() {
      return this.blok.glyphList.split(" ")
    }
  }
}
</script>

<style lang="scss" scoped>
.kimera-glyph-set {
    width: 100%;
    display: flex;
    flex-direction: column;

}
.glyph-set-spacer h3 {
    padding-bottom: calc(var(--kimera-grid-gap) / 2);
    // padding-top: calc(var(--kimera-small-gap)/2);
}
.kimera-glyph-grid {
    display: grid;
    // grid-template-columns: repeat(13, 1fr);
    grid-template-columns: repeat(auto-fill, minmax(min(70px, 100%), 1fr));
    // display: flex;
    // flex-wrap: wrap;
    grid-gap: calc(var(--kimera-small-gap)/2);
}
</style>
