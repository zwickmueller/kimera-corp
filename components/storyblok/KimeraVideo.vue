<template>
  <!-- <div>DEBUG IN PROGRESS NOTHING TO SEE HERE</div> -->
  <div
    ref="container"
    class="video-container"
    v-editable="blok"
    :class="blok.hideOnMobile ? 'hide-on-mobile' : ''"
  >
    <video
      :controls="blok.controls"
      v-if="!showMobileFallback && !blok.previewMobileFallback"
      ref="video"
      class="video"
      :loop="blok.loop"
      muted
      :style="overrideStyles"
      :autoplay="blok.autoplay"
      playsinline
      preload="metadata"
    >
      <source :src="blok.src.filename" type="video/mp4" />
    </video>

    <component
      v-if="
        blok.mobileFallback &&
        blok.mobileFallback[0] &&
        (showMobileFallback || blok.previewMobileFallback)
      "
      :is="blok.mobileFallback[0].component"
      :blok="blok.mobileFallback[0]"
    ></component>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMobileFallback: false,
      player: null,
    };
  },
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
        background: this.blok.overrideBackground
          ? this.blok.overrideBackground
          : "",
      };
    },
  },
  beforeDestroy() {
    this.player.destroy();
  },
  mounted() {
    //     Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    //     get: function () {
    //         return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    //     }
    // });
    // this.prepareSuspendedVideo();
    // return;
    // return;
    this.player = new Plyr(this.$refs.video, {
      controls: [],
    });

    this.$refs.video
      .play()
      .then(() => {})
      .catch((error) => {
        // this.$refs.video.classList.add("power-saving-mode");
        // this.prepareSuspendedVideo();
        // setTimeout(() => {
        this.showMobileFallback = true;

        // }, 0);
        // alert(error);
        //Do something like adding controls to allow user to manually play
      });
  },
};
</script>
<style lang="scss">
video.video {
  width: 100%;
  // height: auto;
  height: 100%;

  position: absolute;
  @include until($tablet) {
    position: relative;
  }
  &.power-saving-mode {
    opacity: 0.5;
    // z-index: 9999999;
  }
}
.plyr--video {
  height: 100%;
}
*::-webkit-media-controls-start-playback-button {
  display: none !important;
  -webkit-appearance: none;
}
video * {
  display: none !important;
}
*::-webkit-media-controls-panel,
*::-webkit-media-controls-start-playback-button {
  display: none !important;
}
*::-webkit-media-controls {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  -webkit-appearance: none !important;
}
.video-container {
  position: relative;
  width: 100%;
  height: 100%;
  @include until($tablet) {
    display: flex;
  }
}
</style>
