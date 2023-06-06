<template>
  <span class="inline-font-preview" :style="getFontStyle">
    {{ fontData.weightReadable }}
  </span>
</template>

<script>
export default {
  props: {
    fontData: {
      type: Object,
      required: true,
    },
    fontName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    getFontStyle() {
      return {
        fontFamily: this.fontName,
        fontWeight: this.fontData.weight,
        fontStyle: this.fontData.fontStyle,
        fontStretch: this.fontData.fontStretch,
      };
    },
  },
  mounted() {
    this.$helpers.loadFont(this.fontData, this.fontName);
  },
};
</script>
<style lang="scss"></style>
