<template>
  <div
    class="kimera-close-button close-button"
    @mouseenter="animate(true)"
    @mouseleave="animate()"
    :class="isInverted ? 'is-inverted' : ''"
  >
    <svg
      v-if="isCross"
      viewBox="0 0 8 8 "
      style="transform: scale(0.8)"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.09059 5.4482C1.97062 5.56817 1.96817 5.78118 2.09304 5.90604C2.22035 6.03091 2.43336 6.02846 2.55088 5.91094L4.00031 4.46151L5.44728 5.90849C5.5697 6.03091 5.78026 6.03091 5.90513 5.90604C6.02999 5.77873 6.02999 5.57062 5.90757 5.4482L4.4606 4.00122L5.90757 2.5518C6.02999 2.42938 6.03244 2.21882 5.90513 2.09396C5.78026 1.96909 5.5697 1.96909 5.44728 2.09151L4.00031 3.53849L2.55088 2.09151C2.43336 1.97154 2.2179 1.96664 2.09304 2.09396C1.96817 2.21882 1.97062 2.43428 2.09059 2.5518L3.53757 4.00122L2.09059 5.4482Z"
        fill="black"
        stroke="black"
        stroke-width="0"
      />
    </svg>

    <svg
      v-if="!isCross"
      ref="line1"
      width="10"
      height="3"
      viewBox="0 0 10 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.9043 1.54271L1.99974 1.54297"
        :stroke="isInverted ? 'var(--white)' : 'var(--black)'"
        stroke-width="2.19089"
        stroke-linecap="round"
      />
    </svg>
    <svg
      v-if="!isCross"
      ref="line2"
      width="10"
      height="3"
      viewBox="0 0 10 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.9043 1.54271L1.99974 1.54297"
        :stroke="isInverted ? 'var(--white)' : 'var(--black)'"
        stroke-width="2.19089"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script>
import { gsap } from "gsap/all";

export default {
  props: {
    isInverted: {
      type: Boolean,
      default: false,
    },
    isCross: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tl: null,
    };
  },
  methods: {
    animate(_in) {
      if (this.isCross) return;
      if (_in) {
        this.tl.restart();
      } else {
        this.tl.reverse(0);
      }
    },
  },
  mounted() {
    const line1 = this.$refs.line1;
    const line2 = this.$refs.line2;

    if (this.isCross) return;

    this.tl = gsap.timeline({ paused: true });
    gsap.set(line1, {
      transformOrigin: "top left",
      y: "0.2rem",
    });
    gsap.set(line2, {
      transformOrigin: "bottom left",
      display: "none",
    });
    this.tl.fromTo(
      [line1, line2],
      {
        y: "0.2rem",
      },
      {
        y: "0rem",
        duration: 0.2,
        ease: "power4.inOut",
      }
    );
    this.tl.fromTo(
      line1,
      {
        x: 0,
        rotate: 0,
      },
      {
        x: "2px",
        rotate: 45,
        duration: 0.2,
        ease: "power4.out",
      }
    );
    this.tl.fromTo(
      line2,
      {
        x: 0,
        y: 0,
        rotate: 0,
        display: "none",
      },
      {
        display: "block",
        x: "2px",
        y: "1px",
        rotate: -45,
        duration: 0.2,
        ease: "power4.out",
      },
      ">-0.2"
    );
  },
};
</script>
<style lang="scss">
.kimera-close-button {
  background-color: var(--kimera-grey);
  width: 1.5rem;
  aspect-ratio: 1;
  border-radius: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: all !important;
  transition: $typetester-invert-transition;
  svg {
    position: absolute;
    // transition: transform 0.2s ease;
    // transform: translateY(0.2rem);
    path {
      transition: stroke 0.2s ease;
    }
  }
  &:hover {
    background-color: var(--black);

    svg {
      //   transform: translateY(0rem);
      path {
        fill: var(--kimera-white);
        stroke: var(--kimera-white) !important;
      }
    }
  }
}
.kimera-close-button.is-inverted {
  background-color: var(--kimera-dark-grey);
  &:hover {
    background-color: var(--kimera-white);
    svg path {
      stroke: var(--black) !important;
      fill: var(--black) !important;
    }
  }
}
</style>
