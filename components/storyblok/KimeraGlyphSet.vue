<template>
  <div
    class="kimera-glyph-set"
    v-if="blok.glyphList"
    :class="!blok.showTitle ? 'glyph-set-spacer' : ''"
  >
    <h3 v-if="!blok.showTitle" class="kimera-text-filter-tags">
      {{ blok.title }}
    </h3>
    <div class="kimera-glyph-grid">
      <single-glyph
        :invertedColors="invertedColors"
        :key="glyph + i"
        v-for="(glyph, i) in glyphListAsArray"
        :glyph="glyph"
      ></single-glyph>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHolding: false,
    };
  },
  props: {
    blok: {
      type: Object,
      required: true,
    },
    invertedColors: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    glyphListAsArray() {
      return this.blok.glyphList.split(" ");
    },
  },
};
</script>

<style lang="scss" scoped>
.kimera-glyph-set {
  width: 100%;
  display: flex;
  flex-direction: column;
  @include until($tablet) {
    padding: calc(var(--kimera-side-padding) * 2);
  }
}
.glyph-set-spacer h3 {
  padding-bottom: calc(var(--kimera-grid-gap) / 2);
  text-align: left;
  // padding-top: calc(var(--kimera-small-gap)/2);
}
.kimera-glyph-grid {
  display: grid;
  // grid-template-columns: repeat(13, 1fr);
  grid-template-columns: repeat(auto-fill, minmax(min(70px, 100%), 1fr));
  // display: flex;
  // flex-wrap: wrap;
  grid-gap: 1px;
  // grid-gap: calc(var(--kimera-small-gap) / 2);
  @include until($tablet) {
    // padding: var(--kimera-side-padding);
    grid-template-columns: repeat(auto-fill, minmax(min(4.5rem, 100%), 1fr));
    // height: 6rem;
    // overflow: hidden;
    // user-select: none;
    // position: relative;
    // width: 100%;
    // height: 5rem;
    // overflow: scroll;
    // display: flex;
  }
}
</style>
