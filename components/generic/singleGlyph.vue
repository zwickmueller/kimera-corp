<template>
  <div
    class="single-glyph"
    :class="[
      invertedColors ? 'invert-colors' : '',
      isHolding ? 'mobile-hover-state' : '',
    ]"
    @mouseenter="mouseEntered"
    v-touch:start="handleLongTouch(true)"
    v-touch:end="handleLongTouch(false)"
  >
    <!-- v-touch-options="{ tapTolerance: 1000 }" -->
    <!-- @touchstart="handleLongTouch($event, true)"
    @touchend="handleLongTouch($event, false)" -->
    <!-- v-touch:tap="myMethod" -->
    <!-- @v-touch:end="() => handleLongTouch(false)" -->
    <span v-html="glyph"></span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
  data() {
    return {
      isHolding: false,
    };
  },
  computed: {
    ...mapGetters({
      isMobile: "isMobile",
    }),
  },
  methods: {
    handleLongTouch(bool) {
      if (!this.isMobile) return;
      return () => {
        // $event.preventDefault();
        this.isHolding = bool;

        let element = this.$el;
        let parent = document.querySelector(".kimera-glyph-set-wrapper");
        let yPosition =
          element.getBoundingClientRect().y +
          element.getBoundingClientRect().height * -2 -
          parent.getBoundingClientRect().y;
        let xPosition =
          element.getBoundingClientRect().x +
          element.getBoundingClientRect().width / 2 -
          parent.getBoundingClientRect().x;

        // let previewWidth = document
        //   .querySelector(".glyph-map-container")
        //   .getBoundingClientRect().width;
        //... your code to get the preview width ...
        console.log(parentWidth);
        // Clamp the x position to stay within the bounds of the viewport
        // let clampedXPosition = Math.min(
        //   Math.max(xPosition, previewWidth / 2),
        //   window.innerWidth - previewWidth / 2
        // );
        let parentWidth = parent.getBoundingClientRect().width;
        // xPosition = Math.max(xPosition, previewWidth / 2);
        // xPosition = Math.min(xPosition, parentWidth - previewWidth / 2);

        var maxXPosition =
          window.innerWidth - parent.getBoundingClientRect().left;
        var previewWidth = parentWidth * 0.7;
        maxXPosition = maxXPosition - previewWidth / 2;

        // Clamp the x position so that the enlarged preview does not go outside of the viewport
        xPosition = Math.max(xPosition, previewWidth / 2);
        // 4 is padding left
        xPosition = Math.min(xPosition, maxXPosition - 4);

        let style = {
          top: yPosition + "px",
          left: xPosition + "px",
          transform: "translate(-50%, -50%) scale(1)",
          opacity: 1,
        };
        if (this.isHolding) {
          this.$root.$emit("setCurrentGlyph", this.glyph);
          this.$root.$emit("setGlyphMobileStyle", style);
        } else {
          style.opacity = 0;
          style.transform = "translate(-50%, -50%) scale(0.5)";
          console.log(style);
          this.$root.$emit("setGlyphMobileStyle", style);
        }
      };
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
    var(--kimera-border-radius)
  ); // var(--kimera-border-radius/2);
  font-size: 1.5em;
  transition: background 0.1s ease;
  span {
    transition: transform 0.1s ease;
  }
  @include from($tablet) {
    &:hover {
      background: var(--kimera-white);
      span {
        transform: scale(2);
      }
    }
  }
  &.mobile-hover-state {
    background: var(--kimera-white);
    span {
      transform: scale(2);
    }
  }
  @include until($tablet) {
    user-select: none;
    transition: background 0.25s ease;
    span {
      transition: transform 0.25s ease;
    }
  }
  -webkit-tap-highlight-color: transparent;
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
