<template>
  <div class="video-container" v-editable="blok">
    <video
      class="video"
      :controls="blok.controls"
      :loop="blok.loop"
      :src="blok.src.filename"
      muted
      :style="overrideStyles"
      :autoplay="blok.autoplay"
    ></video>
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  methods: {},
  computed: {
    overrideStyles() {
      return {
        objectFit:
          this.blok.overrideObjectfit == "none"
            ? ""
            : this.blok.overrideObjectfit,
        padding:
          this.blok.overridePadding == "0em" ? "" : this.blok.overridePadding,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
video.video {
  width: 100%;
  // height: auto;
  height: 100%;

  position: absolute;
  @include until($tablet) {
    position: relative;
  }
}
.video-container {
  position: relative;
  width: 100%;
  @include until($tablet) {
    display: flex;
  }
}
</style>
