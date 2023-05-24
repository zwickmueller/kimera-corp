<template>
  <div class="kimera-buy-section-wrapper">
    <div class="kimera-buy-section" ref="buySection">
      <!-- <div class="buy-cta buy-cta-small kimera-text-bigger">
        {{ blok.title }}
      </div> -->

      <div
        @click="isBuyButtonExpanded ? null : handleClick()"
        ref="buyCta"
        class="buy-cta buy-cta-small kimera-text-bigger is-big is-buy-button"
      >
        <!--  -->
        <div class="buy-cta-text">{{ blok.title }}</div>
        <div class="buy-content">
          <shop-overlay-content></shop-overlay-content>
        </div>
      </div>
      <!-- <tag-button
        class="buy-cta buy-cta-small"
        :isBig="true"
        :isBuyButton="true"
        @click.native="handleClick"
        ref="buyCta"
      >
        {{ blok.title }}</tag-button
      > -->
      <!-- <div class="buy-cta">{{ blok.title }}</div> -->
    </div>
    <div
      class="fixed fixed-reset buy-section-background-wrapper"
      :class="isBuyButtonExpanded ? 'is-expanded' : ''"
      ref="background"
      @click="isBuyButtonExpanded ? handleClick() : null"
    ></div>
  </div>
</template>

<script>
import { gsap, Flip } from "gsap/all";

if (process.client) {
  gsap.registerPlugin(Flip);
}

function sleep(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isFixed: false,
      stopScroll: false,
      isBuyButtonExpanded: false,
      minHeight: 0,
      minWidth: 0,
    };
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    async handleClick() {
      this.isBuyButtonExpanded = !this.isBuyButtonExpanded;
      this.stopScroll = this.isBuyButtonExpanded;
      const ctaButton = this.$refs.buyCta;
      const ctaButtonText = this.$refs.buyCta.querySelector(".buy-cta-text");
      const buyContent = this.$refs.buyCta.querySelector(".buy-content");

      const durationIn = 1;
      const durationOut = 1.25;
      // ctaButton.style.transform = "scale(1)";
      // ctaButton.style.transition = "";
      if (!this.isFixed) {
        ctaButton.style.transform = this.stopScroll ? "scale(1)" : "";
        // ctaButton.classList.add("fixed");
        // ctaButton.classList.remove("is-sticky");
        await sleep(500);
      }
      let state = Flip.getState([ctaButton, ctaButtonText], {
        props: "position, bottom, borderRadius",
      });
      // if (!this.isFixed) {
      //   ctaButton.classList.add("fixed");
      //   ctaButton.classList.remove("is-sticky");
      // }
      // ctaButton.classList.remove("is-sticky");
      this.handleScroll();
      if (this.isBuyButtonExpanded) {
        ctaButton.classList.add("is-expanded");
        gsap.to(".buy-cta-text", {
          fontSize: "1rem",
          duration: durationIn,
          ease: "power1.inOut",
        });
        // gsap.to(buyContent, { opacity: 1 });

        ctaButton.querySelector(".buy-content").style.display = "block";
        ctaButton.querySelector(".buy-content").opacity = 1;
      } else {
        gsap.to(".buy-cta-text", {
          fontSize: "1.5rem",
          duration: durationOut,
          ease: "power4.out",
        });
        // gsap.to(buyContent, { opacity: 0 });

        ctaButton.classList.remove("is-expanded");
        ctaButton.querySelector(".buy-content").style.display = "none";
        ctaButton.querySelector(".buy-content").opacity = 0;

        const buyCtaText = this.$refs.buyCta.querySelector(".buy-cta-text");

        gsap.set(buyCtaText, {
          minWidth: this.minWidth,
          minHeight: this.minHeight,
        });
      }

      // ctaButton.style.height = "calc(100vh - var(--kimera-side-padding))";
      // ctaButton.style.maxWidth = "30rem";
      // ctaButton.style.width = "30rem";
      // ctaButton.style.justifyContent = "center";

      this.$nextTick(() => {
        Flip.from(state, {
          // duration: 1,
          // ease: "power4.out",
          // absolute: true,
          // props: "position, borderRadius",
          // absolute: ".buy-content, .buy-cta-text",
          // absolute: ".buy-content",
          // absolute: true,
          // nested: true,
          // absoluteOnLeave: true,
          toggleClass: "is-expanding",
          targets: ".buy-cta, .buy-content",
          duration: this.isBuyButtonExpanded ? durationIn : durationOut,
          ease: this.isBuyButtonExpanded ? "power1.inOut" : "power4.out",
          onStart: () => {
            console.log("start");
            if (this.isBuyButtonExpanded) {
              gsap.to(this.$refs.background, { opacity: 0.5, delay: 0.5 });
              // gsap.fromTo(".buy-cta-text", { opacity: 1 }, { opacity: 0 });
            } else {
              gsap.to(this.$refs.background, { opacity: 0 });
              // gsap.fromTo(
              //   ".buy-cta-text",
              //   { opacity: 0 },
              //   { opacity: 1, delay: 0.5 }
              // );

              // gsap.to(".buy-cta-text", { opacity: 1 });
            }
          },
          onEnter: (elements) => {
            console.log(elements);
            if (this.isBuyButtonExpanded)
              gsap.fromTo(elements, { opacity: 0 }, { opacity: 1, delay: 1 });
          },
          onLeave: (elements) => {
            console.log("leave ", elements);
            gsap.fromTo(elements, { opacity: 1 }, { opacity: 0 });
          },
          onComplete: () => {
            this.handleScroll();
          },
        });
      });
    },
    handleScroll() {
      if (this.stopScroll) return;
      const buyCta = this.$refs.buyCta;
      const buySection = this.$refs.buySection;
      const triggerTop =
        window.scrollY -
        buySection.getBoundingClientRect().top +
        buySection.getBoundingClientRect().height;
      if (window.scrollY > window.innerHeight / 2) {
        buyCta.classList.add("is-loaded");
      } else {
        buyCta.classList.remove("is-loaded");
      }
      if (window.scrollY >= triggerTop && !this.isFixed) {
        buyCta.classList.add("fixed");
        buyCta.classList.remove("is-sticky");
        this.isFixed = true;
      } else if (window.scrollY < triggerTop && this.isFixed) {
        buyCta.classList.remove("fixed");
        buyCta.classList.add("is-sticky");
        this.isFixed = false;
      }
    },
  },
  mounted() {
    const footer = document.querySelector(".kimera-footer");
    if (footer) {
      const height = footer.getBoundingClientRect().height;
      this.$refs.buySection.style.minHeight = `calc(100vh - ${height}px)`;
    }
    window.addEventListener("scroll", this.handleScroll);
    this.$nextTick(() => {
      this.$nextTick(() => {
        const buyCtaText = this.$refs.buyCta.querySelector(".buy-cta-text");
        this.minWidth = buyCtaText.getBoundingClientRect().width + 36;
        this.minHeight = buyCtaText.getBoundingClientRect().height;
        gsap.set(buyCtaText, {
          minWidth: this.minWidth,
          minHeight: this.minHeight,
        });
      });
    });
  },
};
</script>
<style lang="scss">
.kimera-buy-section-wrapper {
  height: 100%;
  width: 100%;
  @include until($tablet) {
    margin-top: calc(-1 * var(--kimera-grid-gap));
    margin-bottom: calc(-1 * var(--kimera-grid-gap));
  }
}
.buy-cta.buy-cta-small.is-sticky:not(.is-expanded) {
  position: sticky;
  //   top: 0;
  transform: translateY(0) scale(4);
  @include until($tablet) {
    transform: translateY(0) scale(2);
  }
}
.buy-cta-small.is-loaded {
  transform: translateY(0) scale(1);
}
.kimera-buy-section {
  height: 100%;
  width: 100%;
  background-color: var(--kimera-green);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}
.buy-cta-small {
  // background-color: red;
  // animation: slide-up 0.5s ease;
  // animation-fill-mode: forwards;
  // animation-delay: 2s;
  transform: translateY(5rem) scale(1);
  border-radius: 5rem;
  filter: drop-shadow(0px 0.4rem 0.3rem rgba(0, 0, 0, 0.075));
  padding: 1rem;
  background-color: var(--kimera-green);
  transition: filter 0.375s ease, transform 0.375s ease;
  &:not(.is-expanded):hover {
    cursor: pointer;
    filter: drop-shadow(0px 1rem 1rem rgba(0, 0, 0, 0.3));
  }
}

.buy-cta-small {
  //   position: fixed;
  //   transition: filter 0.375s ease, transform 1s ease;
  bottom: 1rem;
  z-index: 2;
  //   transform: scale(1);
  font-weight: 500;
  letter-spacing: 0rem !important;
  //   transform-origin: center;
  &.fixed {
    position: fixed;
    bottom: 1rem;

    // transform-origin: bottom;
  }
  .buy-content {
    display: none;
    opacity: 0;
    // position: absolute;
    // white-space: normal;
    // max-width: calc(38rem) !important;
    // width: 100%;
  }
}
.buy-content {
  // transition: opacity 0.375s ease;
  display: block;
  padding-top: 1.5rem;
}

.buy-cta-small.is-expanded {
  height: calc(100vh - var(--kimera-side-padding));
  max-width: 40rem;
  min-width: 30rem;
  width: 100%;
  justify-content: center;
  transform: scale(1) !important;
  position: fixed;
  z-index: 100;
  border-radius: 1rem;
  // overflow: hidden;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  @include until($tablet) {
    width: 95vw;
    min-width: auto;
    max-width: 95vw;
    height: 100%;
    max-height: 90svh;
    // top: 5vh;
  }
  .buy-cta-text {
    // display: none;
    position: absolute;
    width: calc(100% - 2rem);
    // font-size: 1rem;
    // width: calc(100%);
  }
  .buy-content {
    // opacity: 1;
    // opacity: 1;
    display: block;
  }
  // hide the scrollbar
  &::-webkit-scrollbar {
    display: none;
  }
}
.buy-cta-small.is-expanding {
  overflow: hidden !important;
}
.buy-cta-text {
  // transition: font-size 5s ease;
  text-align: center;
  // font-size: 1.5rem;
  // line-height: 1;
  white-space: pre;
  // background-color: red;
  width: calc(100%);
}
.buy-section-background-wrapper {
  background: var(--black);
  opacity: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  pointer-events: none;
  &.is-expanded {
    pointer-events: all;
  }
}
// a css keyframe animation called slide up that moves the button from the bottom to the top

@keyframes slide-up {
  0% {
    transform: translateY(5rem);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
