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
    };
  },
  mounted() {
    if (!this.renderSequence) return;
    var animation = lottie.loadAnimation({
      container: document.getElementById("lottie"), // Required
      path: "/kimera_INTRO_ANIMATION_08.json", // Required
      renderer: "svg", // Required
      loop: false, // Optional
      autoplay: true, // Optional
      name: "Kimera Intro", // Name for future reference. Optional.
      rendererSettings: {
        viewBoxOnly: true,
      },
    });
    // this.$nextTick(() => {
    // animation.goToAndStop(60, true);
    // return;
    // });
    animation.addEventListener("complete", () => {
      this.$root.$emit("intro-animation-complete");
    });
    animation.addEventListener("DOMLoaded", () => {
      console.log(animation.getDuration(false));
      let fadeOutDuration = 0.75;
      gsap.to(".intro-loader", {
        duration: fadeOutDuration,
        delay: animation.getDuration(false) - fadeOutDuration,
        "--opacity": 0,
        //   delay: -0.5,
        onComplete: () => {
          this.renderSequence = false;
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
