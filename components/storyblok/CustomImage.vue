<template>
<div v-editable="blok">
  <picture>
    <source type="image/webp" :srcset="`${transformImage(blok.src.filename, '0x380/filters:format(webp)')} 380w,
                ${transformImage(blok.src.filename, '0x800/filters:format(webp)')} 800w,
                ${transformImage(blok.src.filename, '0x1200/filters:format(webp)')} 1200w`" sizes="100vw">
    <source type="image/png" :srcset="`${transformImage(blok.src.filename, '0x380/filters:format(png)')} 380w,
                  ${transformImage(blok.src.filename, '0x800/filters:format(png)')} 800w,
                  ${transformImage(blok.src.filename, '0x1200/filters:format(png)')} 1200w`" sizes="100vw">
    <img class="image" :src="transformImage(blok.src.filename, '0x1024')" :alt="blok.src.alt">
  </picture>

</div>
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
      if (!image) return "";
      if (!option) return "";
      //
      // let imageService = "//img2.storyblok.com/";
      // let path = image.replace("//a.storyblok.com", "");
      // return imageService + option + path;
      var imageService = '//img2.storyblok.com/'
      var path = image.replace('https:', '').replace('//a.storyblok.com', '')
      // path.replace('https:', '')

      return imageService + option + path
    }
  }
}
</script>
<style lang="scss" scoped>
img.image {
    width: 100%;
    height: auto;
}
</style>
