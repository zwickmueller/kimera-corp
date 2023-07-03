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
      path: "/kimera_INTRO_ANIMATION_02.json", // Required
      renderer: "svg", // Required
      loop: false, // Optional
      autoplay: true, // Optional
      name: "Kimera Intro", // Name for future reference. Optional.
      rendererSettings: {
        viewBoxOnly: true,
      },
    });
    animation.addEventListener("complete", () => {
      this.$root.$emit("intro-animation-complete");
    });
    gsap.to(".intro-loader", {
      duration: 0.5,
      delay: 1.8,
      opacity: 0,
      //   delay: -0.5,
      onComplete: () => {
        this.renderSequence = false;
      },
    });
    // animation.goToAndStop(60, true);
  },
};
</script>
<style lang="scss">
.intro-loader {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--white);
  z-index: 10000;
  .lottie-container {
    width: 100%;
    height: 100%;
  }
}
</style>
