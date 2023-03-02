<template>
  <div
    class="single-glyph"
    :class="invertedColors ? 'invert-colors' : ''"
    @touchstart="handleLongTouch($event, true)"
    @touchend="handleLongTouch($event, false)"
    @mouseenter="mouseEntered"
  >
    <span v-html="glyph"></span>
  </div>
</template>

<script>
export default {
  props: {
    glyph: {
      required: true,
      type: String,
    },
    invertedColors: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleLongTouch($event, bool) {
      this.isHolding = bool;
      // console.log(bool);
      // alert(bool);
      // console.log($event);
      var element = this.$el;
      var parent = document.querySelector(".kimera-glyph-set-wrapper");
      var yPosition =
        element.getBoundingClientRect().y - parent.getBoundingClientRect().y;
      // console.log(yPosition);
      var xPosition =
        element.getBoundingClientRect().x - parent.getBoundingClientRect().x;
      let style = {
        top: yPosition + "px",
        // top: this.$el.getBoundingClientRect().y + "px",
        // left: this.$el.getBoundingClientRect().x + "px",
        left: xPosition + "px",
        transform: "translate(-50%, -50%) scale(1)",
        opacity: 1,
      };
      if (this.isHolding) {
        //         const dimensions = this.$helpers.getDomDimensions(element)
        // const centerY = dimensions.height - dimensions.top / 2
        // const centerX = dimensions.width - dimensions.left / 2
        // var element = temp2;
        // console.log(yPosition);
        // console.log(this.$el);
        this.$root.$emit("setCurrentGlyph", this.glyph);
        this.$root.$emit("setGlyphMobileStyle", style);
      } else {
        style.opacity = 0;
        style.transform = "translate(-50%, -50%) scale(0.5)";
        console.log(style);
        this.$root.$emit("setGlyphMobileStyle", style);
      }
    },

    mouseEntered() {
      this.$root.$emit("setCurrentGlyph", this.glyph);
    },
  },
};
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
  border-radius: calc(
    var(--kimera-border-radius) / 2
  ); // var(--kimera-border-radius/2);
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
