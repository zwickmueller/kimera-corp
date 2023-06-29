<template>
  <div
    ref="container"
    class="video-container"
    v-editable="blok"
    :class="blok.hideOnMobile ? 'hide-on-mobile' : ''"
  >
    <video
      v-if="!showMobileFallback && !blok.previewMobileFallback"
      ref="video"
      class="video"
      :controls="blok.controls"
      :loop="blok.loop"
      :src="blok.src.filename"
      muted
      :style="overrideStyles"
      :autoplay="blok.autoplay"
      playsinline
    ></video>
    <component
      v-if="
        blok.mobileFallback &&
        blok.mobileFallback[0] &&
        (showMobileFallback || blok.previewMobileFallback)
      "
      :is="blok.mobileFallback[0].component"
      :blok="blok.mobileFallback[0]"
    ></component>
    <!-- <img
      
      :src="blok.mobileFallback.filename"
      alt=""
    /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMobileFallback: false,
    };
  },
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  methods: {
    prepareSuspendedVideo() {
      var video = this.$refs.video;

      // Create a <canvas> element

      // Listen for the "loadedmetadata" event to ensure the video is loaded
      video.addEventListener("loadedmetadata", () => {
        setTimeout(() => {
          var canvas = document.createElement("canvas");

          // Set the canvas dimensions to match the video
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          // Get the 2D context of the canvas
          var context = canvas.getContext("2d");
          // Draw the first frame of the video onto the canvas
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Get the data URL of the canvas
          var dataURL = canvas.toDataURL();
          console.log(dataURL);

          // Create an <img> element to display the first frame
          // var img = document.createElement("img");
          var img = new Image();
          img.setAttribute("crossOrigin", "anonymous");
          img.src = dataURL;

          // Append the image to the document body or any other desired location
          this.$refs.container.appendChild(img);
          video.style.opacity = 0.5;
        }, 100);
      });
    },
  },
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
  mounted() {
    //     Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    //     get: function () {
    //         return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    //     }
    // });
    // this.prepareSuspendedVideo();
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
