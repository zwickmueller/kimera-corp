<template>
<div v-editable="blok">
  <video class="video" controls :loop="blok.loop" :src="blok.src.filename" muted :autoplay="blok.autoplay">

  </video>
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
video.video {
    width: 100%;
    height: auto;
}
</style>
