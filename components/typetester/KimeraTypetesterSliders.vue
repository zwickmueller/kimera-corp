<template>
  <div class="font-sliders kimera-text-filter">
    <kimera-slider
      :isInverted="typetester.invertColors"
      :slider-data="typetester.sliders.fontSize"
      :target="'fontSize'"
      :name="'Size'"
      :unit="'px'"
      @handleSliders="handleSliders"
    ></kimera-slider>

    <kimera-slider
      :isInverted="typetester.invertColors"
      :slider-data="typetester.sliders.letterSpacing"
      :target="'letterSpacing'"
      :name="'Spacing'"
      :unit="'em'"
      @handleSliders="handleSliders"
    ></kimera-slider>

    <kimera-slider
      :isInverted="typetester.invertColors"
      :slider-data="typetester.sliders.lineHeight"
      :target="'lineHeight'"
      :name="'Leading'"
      :unit="'%'"
      @handleSliders="handleSliders"
    ></kimera-slider>
  </div>
</template>

<script>
export default {
  props: ["typetester"],
  emits: ["handleSliders"],
  data() {
    return {};
  },
  methods: {
    handleSliders($event) {
      this.$emit("handleSliders", $event);
      // handle the slider values
    },
  },
};
</script>
<style lang="scss"></style>
