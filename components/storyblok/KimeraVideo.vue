<template>
  <div
    ref="container"
    class="video-container"
    v-editable="blok"
    :class="getClasses"
  >
    <video
      :controls="blok.controls"
      v-show="!showMobileFallback && !blok.previewMobileFallback"
      ref="video"
      class="video"
      :loop="blok.loop"
      muted
      :style="overrideStyles"
      playsinline
      preload="metadata"
    >
      <!-- :style="showMobileFallback ? 'height: 0 !important' : ''" -->
      <!-- :autoplay="blok.autoplay" -->
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
      observer: null,
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
    getClasses() {
      return {
        "hide-on-mobile": this.blok.hideOnMobile,
        "mobile-fallback": this.showMobileFallback,
      };
    },
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
    this.observer.disconnect();
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
    // this.showMobileFallback = true;

    this.$nextTick(() => {
      // setup intersection observer that only plays video when in viewport and pauses it when not
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.01,
      };

      const callback = (entries, observer) => {
        entries.forEach((entry) => {
          console.log(entry);
          if (!this.player) return;
          if (entry.isIntersecting) {
            this.player
              .play()
              .then(() => {})
              .catch((error) => {
                this.showMobileFallback = true;
                // alert(this.showMobileFallback);
              });
          } else {
            this.player.pause();
          }
        });
      };
      this.observer = new IntersectionObserver(callback, options);
      this.observer.observe(this.$refs.container);

      // this.player.on("error", (error) => {
      //   alert(error);
      //   // this.showMobileFallback = true;
      // });
      // this.$refs.video
      //   .play()
      //   .then(() => {})
      //   .catch((error) => {
      //     // this.$refs.video.classList.add("power-saving-mode");
      //     // this.prepareSuspendedVideo();
      //     // setTimeout(() => {
      //     this.showMobileFallback = true;

      //     // }, 0);
      //     // alert(error);
      //     //Do something like adding controls to allow user to manually play
      //   });
    });
  },
};
</script>
<style lang="scss">
video.video {
  width: 100%;
  // height: auto;
  height: 100%;
  max-width: 100vw;
  position: absolute;
  @include until($tablet) {
    position: relative;
  }
  &.power-saving-mode {
    opacity: 0.5;
    // z-index: 9999999;
  }
}
.mobile-fallback {
  .plyr {
    height: 0 !important;
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
    // display: flex;
  }
}
</style>
