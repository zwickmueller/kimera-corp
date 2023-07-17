<template>
  <div
    class="kimera-font-feature"
    :class="`grid-width-${this.blok.width}`"
    :style="baseStyle"
  >
    <div v-if="blok.title" class="feature-title kimera-text-filter-tags">
      {{ blok.title }}
    </div>
    <div
      v-if="mobileToggle"
      :style="'right: 0; left: auto'"
      class="feature-title kimera-text-filter-tags mobile-indicator"
    >
      ●
    </div>
    <!-- @touchstart="mobileToggle = !mobileToggle" -->
    <div
      v-touch:tap="touchHandler"
      class="feature-after feature"
      :style="featureStyle"
      :class="mobileToggle ? 'mobile-toggle' : ''"
    >
      <div class="feature-inner" ref="after" v-html="blok.textAfter"></div>
    </div>
    <div
      class="feature-before feature"
      :class="mobileToggle ? 'mobile-toggle' : ''"
      :style="featureStyleOverride"
    >
      <div class="feature-inner" ref="before" v-html="blok.textBefore"></div>
    </div>
  </div>
</template>

<script>
import fitty from "fitty";
import { mapGetters } from "vuex";

export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      mobileToggle: false,
      selectedFontData: null,
    };
  },
  computed: {
    ...mapGetters({
      isMobile: "isMobile",
    }),
    baseStyle() {
      if (!this.selectedFontData) return;
      // this.selectedFontData = JSON.parse(this.blok.font.selectedFontData)
      return {
        fontFamily: this.blok.font.selectedFontFamily,
        fontWeight: this.selectedFontData.weight,
        fontStretch: this.selectedFontData.fontStretch,
        fontStyle: this.selectedFontData.fontStyle,
        aspectRatio: `${this.blok.width / 2}/1`,
        // aspectRatio: this.blok.width < 3 ? "1" : "2/1",
      };
    },

    featureStyle() {
      if (!this.blok.font) return;
      return `font-feature-settings: ${this.$helpers.getOpenTypeFeatures(
        this.blok.font
      )}`;
    },
    featureStyleOverride() {
      if (!this.blok.featureStyleOverride) return "";
      else return `font-feature-settings: ${this.blok.featureStyleOverride}`;
    },
  },
  methods: {
    touchHandler() {
      if (!this.isMobile) return;
      this.mobileToggle = !this.mobileToggle;
    },
    resizeType() {
      this.$nextTick(() => {
        this.$nextTick(() => {
          const beforeWidth = this.$refs.before.getBoundingClientRect().width;
          const afterWidth = this.$refs.after.getBoundingClientRect().width;
          let toFit;
          let toAdjust;
          if (beforeWidth > afterWidth) {
            toAdjust = this.$refs.after;
            toFit = this.$refs.before;
          } else {
            toAdjust = this.$refs.before;
            toFit = this.$refs.after;
          }

          const fitter = new this.$helpers.fitText(toFit);
          fitter.fit();
          let fontSize = window.getComputedStyle(toFit).fontSize;
          toAdjust.parentNode.style.fontSize = fontSize;
          // const fitter2 = new this.$helpers.fitText(this.$refs.before);
          // const fitter3 = new this.$helpers.fitText(this.$refs.after);
          // fitter2.fit();
          // fitter3.fit();

          // console.log(
          //   this.$refs.after,
          //   this.$refs.before.getBoundingClientRect().height,
          //   this.$refs.after.getBoundingClientRect().height,
          //   window.getComputedStyle(this.$refs.after).height,
          //   window.getComputedStyle(this.$refs.before).height,
          //   Math.min(beforeWidth, afterWidth)
          // );
          // let after = this.$refs.before.getBoundingClientRect().height;
          // let before = this.$refs.after.getBoundingClientRect().height;
          // if (before > after)
          //   this.$refs.before.style.height =
          //     this.$refs.after.getBoundingClientRect().height + "px";
        });
      });
    },
  },
  mounted() {
    if (process.client) {
      this.resizeType();
      document.addEventListener("resize", this.resizeType);
    }
  },
};
</script>
<style lang="scss">
.kimera-font-feature {
  background-color: var(--white);
  min-height: max(20em, 25vh);
  border-radius: var(--kimera-border-radius);
  position: relative;
  padding: 1rem;
  overflow: hidden;
  text-align: center;
  // transition: background-color 0.2s ease;

  @include from($tablet) {
    &:hover {
      background-color: transparent;
      .feature-after {
        opacity: 1;
      }
      .feature {
        background-color: var(--kimera-white);
      }
    }
  }
  @include until($tablet) {
    .feature-after.mobile-toggle {
      opacity: 1;
    }
    .feature.mobile-toggle {
      background-color: var(--kimera-white);
    }
  }
}
.feature-inner {
  padding: 3rem;
  // white-space: pre-wrap;
  white-space: pre;

  line-height: 1;
  //   max-height: 100%;
  // width: 100%;
  // height: 100%;
  // display: flex;
  // align-items: center;
  // justify-content: center;
}
.feature {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
  white-space: pre-line;
  transition: background-color 0.3s ease;
  //   display: inline-block;
  //   white-space: nowrap;
}

.feature-after {
  opacity: 0;
  transition: opacity 0.3s ease, background-color 0.3s ease;
  background-color: var(--white);
  z-index: 1;
  position: relative;
}
.feature-title {
  padding: var(--kimera-grid-gap);
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
}
.mobile-indicator {
  color: var(--black);
  font-size: 1.15rem;
  top: -0.5rem;
  // filter: drop-shadow(0 0 2px var(--kimera-green));
}
</style>
