<template>
  <kimera-typetester-preview
    :class="`grid-width-${this.blok.width}`"
    :key="blok.fontSelector.selectedFontData"
    :typetester-data="typetesterData"
    v-if="shouldRender"
  ></kimera-typetester-preview>
  <!-- @typetester-data-updated="updateTypetesterData" -->
  <!-- :class="`grid-width-${this.blok.width}`" -->
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  // FIXME: SHOULD BE selectedOpenTypeFeatures -> storyblok cached?
  // const openTypeFeatures = this.blok.fontSelector.selectedOpenTypeFeatures
  // let openTypeFeatures = this.blok.fontSelector.selectedOpenTypeFeatures
  // console.log(openTypeFeatures);
  // if (openTypeFeatures && openTypeFeatures.length > 0) {
  //   let values = openTypeFeatures.map(el => el.value)
  //   openTypeFeatures = "'" + values.join("', '") + "'"
  //   // console.log(b);
  // } else {
  //   openTypeFeatures = 'normal'
  // }
  //   methods: {
  //   updateTypetesterData(newTypetesterData) {
  //     // Update the prop value
  //     this.typetesterData = newTypetesterData;
  //   }
  // },
  computed: {
    ...mapGetters({
      isMobile: "isMobile",
    }),
    shouldRender() {
      if (this.blok.hideOnMobile && this.isMobile) return false;
      else return true;
    },
    typetesterData() {
      if (this.blok.fontSelector.selectedFontData == undefined) return {};
      const selectedFontData = JSON.parse(
        this.blok.fontSelector.selectedFontData
      );
      return {
        text: this.blok.text,
        invertColors: this.blok.invertColors,
        openTypeFeatures: {
          selectedOpenTypeFeatures:
            this.blok.fontSelector.selectedOpenTypeFeatures,
        },
        timestamp: this.blok.timestamp,
        style: {
          fontFamily: this.blok.fontSelector.selectedFontFamily
            ? this.blok.fontSelector.selectedFontFamily
            : "Waldenburg",
          // fontSize: this.blok.fontSize + "px",
          fontSize:
            this.blok.fontSize +
            "cqw" +
            (this.blok.fontSizeOverride ? "!important" : ""),
          letterSpacing: this.blok.letterSpacing / 100 + "em",
          lineHeight: this.blok.lineHeight + "%",
          textAlign: this.blok.textAlign == "" ? "center" : this.blok.textAlign,
          fontWeight: selectedFontData.weight ? selectedFontData.weight : 375,
          fontStretch: selectedFontData.fontStretch
            ? selectedFontData.fontStretch
            : "normal",
          fontStyle: selectedFontData.fontStyle
            ? selectedFontData.fontStyle
            : "normal",
          fontFeatureSettings: this.$helpers.getOpenTypeFeatures(
            this.blok.fontSelector
          ),
          // fontFeatureSettings: openTypeFeatures
        },
      };
    },
  },
};
</script>

<style lang="css" scoped></style>
