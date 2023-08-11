<template>
  <div
    class="image-cta-container"
    @mouseenter="playLottieAnim()"
    @mouseleave="playLottieAnim('reverse')"
  >
    <div class="cta-image">
      <div class="placeholder" v-if="!lottieAnimName"></div>
      <div class="lottie-container" ref="lottieContainer" v-else></div>
    </div>
    <div class="cta-button">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    // blok: {
    //     type: Object,
    //     required: true
    // }
    title: {
      type: String,
      required: true,
    },
    lottieAnimName: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      lottieAnim: null,
    };
  },
  methods: {
    playLottieAnim(direction) {
      console.log("playLottieAnim", this.lottieAnim);
      if (!this.lottieAnim) return;
      if (direction === "reverse") {
        this.lottieAnim.setSpeed(1.5);
        this.lottieAnim.setDirection(-1);
      } else {
        this.lottieAnim.setSpeed(1);
        this.lottieAnim.setDirection(1);
      }
      this.lottieAnim.play();
    },
  },
  mounted() {
    if (!this.lottieAnimName) return;
    this.lottieAnim = lottie.loadAnimation({
      container: this.$refs.lottieContainer, // Required
      path: `/${this.lottieAnimName}.json`, // Required
      renderer: "svg", // Required
      loop: false, // Optional
      autoplay: false, // Optional
      name: "Kimera Intro", // Name for future reference. Optional.
      rendererSettings: {
        viewBoxOnly: true,
      },
    });
  },
};
</script>
<style lang="scss">
.image-cta-container {
  background-color: var(--white);
  border-radius: 1.5rem;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  width: 100%;
  padding: 0.5rem;
  .lottie-container {
    width: 100%;
    line-height: 0;
    // overflow: hidden;
    // border-radius: 1.5rem;
    // position: relative;
    // &:before {
    //   content: "";
    //   width: 100%;
    //   height: 100%;
    //   border-radius: 1.5rem;
    //   position: absolute;
    //   // background-color: red;
    //   border: 1px solid black;
    //   z-index: 1;
    // }
  }
  .cta-image {
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    .placeholder {
      aspect-ratio: 1/1;
      border-radius: 1.2rem;
      width: 100%;
      background-color: black;
    }
    transform: scale(0.5);
    transition: transform 0.25s ease;
  }
  .cta-button {
    margin-top: 0.5rem;
    border-radius: 1.25rem;
    background-color: var(--kimera-white);
    padding: 0.5rem 0.75rem;
    transition: background-color 0.25s ease, color 0.25s ease;
  }
  &:hover {
    cursor: pointer;
    .cta-image {
      // .placeholder {
      transform: scale(1);
      // }
    }
    .cta-button {
      color: var(--kimera-white);
      background-color: var(--black);
    }
  }
}
</style>
