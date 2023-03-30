<template>
  <div class="kimera-buy-section-wrapper">
    <div class="kimera-buy-section">
      <!-- <div class="buy-cta buy-cta-small kimera-text-bigger">
        {{ blok.title }}
      </div> -->
      <tag-button
        class="buy-cta buy-cta-small"
        :isBig="true"
        :isBuyButton="true"
      >
        {{ blok.title }}</tag-button
      >
      <!-- <div class="buy-cta">{{ blok.title }}</div> -->
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
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
    };
  },
  mounted() {
    const footer = document.querySelector(".kimera-footer");
    if (footer) {
      const height = footer.getBoundingClientRect().height;
      const buySection = document.querySelector(".kimera-buy-section");
      buySection.style.minHeight = `calc(100vh - ${height}px)`;
    }

    // Can you rewrite this logic using scrolltrigger and gsap?

    //start
    const buyCta = document.querySelector(".buy-cta");
    const buySection = document.querySelector(".kimera-buy-section");

    // this.isFixed = false;
    window.addEventListener("scroll", () => {
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
    });

    //end
  },
};
</script>
<style lang="scss">
.kimera-buy-section-wrapper {
  height: 100%;
  width: 100%;
}
.buy-cta.buy-cta-small.is-sticky {
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
  transition: filter 0.375s ease;
  &:hover {
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
  font-weight: 400;
  letter-spacing: 0rem !important;
  //   transform-origin: center;
  &.fixed {
    position: fixed;
    // transform-origin: bottom;
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
