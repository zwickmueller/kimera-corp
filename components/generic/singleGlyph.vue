<template lang="html">
<div class="single-glyph" :class="invertedColors ? 'invert-colors':''" @mouseenter="mouseEntered">
<span v-html="glyph">{{glyph}}</span>
</div>
</template>

<script>
export default {
  props: {
    glyph: {
      required: true,
      type: String
    },
    invertedColors: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    mouseEntered() {
      this.$root.$emit('setCurrrentGlyph', this.glyph)
    }
  }
}
</script>

<style lang="scss" scoped>
.single-glyph {
    height: 100%;
    width: 100%;
    aspect-ratio: 1/1;
    @supports not (aspect-ratio: 1 / 1) {

        &::before {
            float: left;
            padding-top: 100%;
            content: "";
        }

        &::after {
            display: block;
            content: "";
            clear: both;
        }
    }
    // max-width: calc(100%/13 - (var(--kimera-small-gap)/2));
    background: var(--white);
    align-items: center;
    justify-content: center;
    display: flex;
    border-radius: calc(var(--kimera-border-radius) / 2); // var(--kimera-border-radius/2);
    transition: background 0.1s ease;
    font-size: 1.5em;
    span {

        transition: transform 0.1s ease;
    }
    &:hover {
        background: var(--kimera-white);
        span {

            transform: scale(2);
        }
    }
}
.invert-colors.single-glyph {
    background: var(--kimera-dark-grey);
    color: var(--kimera-white);
    &:hover {
        background: var(--black);
        span {

            transform: scale(2);
        }
    }
}
</style>
