<template>
  <div
    class="kimera-font-feature"
    :class="`grid-width-${this.blok.width}`"
    :style="baseStyle"
  >
    <div v-if="blok.title" class="feature-title kimera-text-filter-tags">
      {{ blok.title }}
    </div>
    <div class="feature-after feature" :style="featureStyle">
      <div class="feature-inner" ref="after" v-html="blok.textAfter"></div>
    </div>
    <div class="feature-before feature">
      <div class="feature-inner" ref="before" v-html="blok.textBefore"></div>
    </div>
  </div>
</template>

<script>
import fitty from "fitty";
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedFontData: null,
    };
  },
  computed: {
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
  },
  methods: {
    resizeType() {
      this.$nextTick(() => {
        const fitter = new this.$helpers.fitText(this.$refs.before);
        fitter.fit();
        let fontSize = window.getComputedStyle(this.$refs.before).fontSize;
        this.$refs.after.style.fontSize = fontSize;
      });
    },
  },
  mounted() {
    this.resizeType();
    document.addEventListener("resize", this.resizeType);
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
  &:hover {
    .feature-after {
      opacity: 1;
    }
  }
}
.feature-inner {
  padding: 3rem;
  // white-space: pre-wrap;
  line-height: 1;
  //   max-height: 100%;
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
  //   display: inline-block;
  //   white-space: nowrap;
}

.feature-after {
  opacity: 0;
  transition: opacity 0.3s ease;
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
</style>
