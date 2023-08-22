<template>
  <div class="intro-loader" v-if="renderSequence">
    <div class="lottie-container" id="lottie"></div>
  </div>
</template>

<script>
import { gsap } from "gsap/all";

export default {
  data() {
    return {
      renderSequence: true,
      debug: false,
      animation: null,
    };
  },
  beforeDestroy() {
    if (this.animation) this.animation.destroy();
  },
  mounted() {
    if (window !== window.parent) this.renderSequence = false;

    if (!this.renderSequence) return;
    this.animation = lottie.loadAnimation({
      container: document.getElementById("lottie"), // Required
      path: "/kimera_INTRO_ANIMATION_12.json", // Required
      renderer: "svg", // Required
      loop: false, // Optional
      autoplay: !this.debug, // Optional
      name: "Kimera Intro", // Name for future reference. Optional.
      rendererSettings: {
        viewBoxOnly: window.innerWidth > 1024 ? true : false,
      },
    });
    // this.$nextTick(() => {
    if (this.debug) {
      this.animation.goToAndStop(60, true);
      return;
    }
    // });
    // animation.addEventListener("complete", () => {
    //   console.log("animation complete");
    // });
    this.animation.addEventListener("DOMLoaded", () => {
      // console.log(animation.getDuration(false));
      let fadeOutDuration = 0.75;
      gsap.to(".intro-loader", {
        duration: fadeOutDuration,
        delay: this.animation.getDuration(false) - fadeOutDuration,
        "--opacity": 0,
        //   delay: -0.5,
        onStart: () => {
          console.log("animation started");
          this.$root.$emit("intro-animation-complete");
        },
        onComplete: () => {
          if (this.debug) return;

          this.renderSequence = false;
          // alert("animation complete");
        },
      });
    });
    // return;
  },
};
</script>
<style lang="scss">
.intro-loader {
  --opacity: 1;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  // background-color: var(--white);
  z-index: 10000;
  .lottie-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    @include until($tablet) {
      display: flex;
      // justify-content: center;
      height: 100svh;
      align-items: center;
    }
  }
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--white);
    opacity: var(--opacity);
    z-index: -1;
  }
}
</style>
