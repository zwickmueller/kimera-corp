<template>
<!-- <div v-editable="blok" class="kimera-image"> -->
<picture v-editable="blok" class="kimera-image">
  <source type="image/webp" :srcset="`${transformImage(blok.src.filename, '0x380/filters:format(webp)')} 380w,
                ${transformImage(blok.src.filename, '800x0/filters:format(webp)')} 800w,
                ${transformImage(blok.src.filename, '1200x0/filters:format(webp)')} 1200w,
                ${transformImage(blok.src.filename, '1800x0/filters:format(webp)')} 1800w,
                ${transformImage(blok.src.filename, '2048x0/filters:format(webp)')} 2048w`" sizes="100vw">
  <source type="image/png" :srcset="`${transformImage(blok.src.filename, '0x380/filters:format(png)')} 380w,
                  ${transformImage(blok.src.filename, '800x0/filters:format(png)')} 800w,
                  ${transformImage(blok.src.filename, '1200x0/filters:format(png)')} 1200w,
                  ${transformImage(blok.src.filename, '1800x0/filters:format(png)')} 1800w,
                  ${transformImage(blok.src.filename, '2048x0/filters:format(png)')} 2048w`" sizes="100vw">
  <img class="image" :style="overrideStyles" :src="transformImage(blok.src.filename, '1024x0')" :alt="blok.src.alt">
  <!-- <source type="image/webp" :srcset="`${transformImage(blok.src.filename, '0x380/filters:format(webp)')} 380w,
                ${transformImage(blok.src.filename, '0x800/filters:format(webp)')} 800w,
                ${transformImage(blok.src.filename, '0x1200/filters:format(webp)')} 1200w,
                ${transformImage(blok.src.filename, '0x1800/filters:format(webp)')} 1800w,
                ${transformImage(blok.src.filename, '0x2560/filters:format(webp)')} 2560w`" sizes="100vw">
  <source type="image/png" :srcset="`${transformImage(blok.src.filename, '0x380/filters:format(png)')} 380w,
                  ${transformImage(blok.src.filename, '0x800/filters:format(png)')} 800w,
                  ${transformImage(blok.src.filename, '0x1200/filters:format(png)')} 1200w,
                  ${transformImage(blok.src.filename, '0x1800/filters:format(png)')} 1800w,
                  ${transformImage(blok.src.filename, '0x2560/filters:format(png)')} 2560w`" sizes="100vw">
  <img class="image" :src="transformImage(blok.src.filename, '0x1024')" :alt="blok.src.alt"> -->
</picture>

<!-- </div> -->
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  methods: {
    transformImage(image, option) {
      return this.$helpers.transformImage(image, option)
    }
  },
  computed: {
    overrideStyles() {
      return {

        objectFit: this.blok.overrideObjectfit == 'none' ? '' : this.blok.overrideObjectfit,
        padding: this.blok.overridePadding == '0em' ? '' : this.blok.overridePadding,

      }
    }
  }
}
</script>
<style lang="scss" scoped>
img.image {
    width: 100%;
    // height: auto;
}
</style>
