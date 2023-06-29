<template>
  <div class="intro-loader" v-if="renderSequence">
    <!-- class="kimera-logo" -->
    <!-- viewBox="0 0 391.75 80.75" -->
    <svg
      id="logo_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 391.75 80.75"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Ebene_1" data-name="Ebene 1">
          <path
            d="M23.36,0V47.5L42.5,19.91H69.19L48.61,48.05,69.75,79.42H41.38l-18-30.81V79.42H0V0Z"
          />
          <path d="M72.41,0H95.77V15H72.41Zm0,19.91H95.77V79.42H72.41Z" />
          <path
            d="M182.2,44.05c0-7-3.12-9-7.23-9-4.67,0-8.57,3.22-8.57,12.12V79.42H143.05V44.05c0-6.89-3.12-9-7.24-9-4.67,0-8.56,3.22-8.56,12.12V79.42H103.89V29l-.22-9.12h23l.55,6.79h.34c3.11-5.34,10.23-8.12,16.56-8.12,9.35,0,15.58,3.56,18.81,9.9h.22c5.22-7.34,12-9.9,20.13-9.9,15.46,0,22.25,9.9,22.25,23.47V79.42H182.2Z"
          />
          <path
            d="M233.92,55.4c.78,9.23,3.56,12,9.23,12,4.67,0,7.46-3,7.9-7.46h23.69c-.89,12.8-14.9,20.8-30.48,20.8-20.69,0-33.59-10.56-33.59-31.14s13-31,32.48-31c20,0,32.15,10.34,32.15,32.37V55.4Zm18.24-12.24c-1-8.68-4.22-11.23-9-11.23S235,34.48,234,43.16Z"
          />
          <path
            d="M281,19.91h23.36l.22,9.57h.33c2-5.56,8.12-10.9,17-10.9h5V37.16h-7.79c-9.45,0-14.57,5-14.57,18.35V79.42H281.19V29Z"
          />
          <path
            d="M353.05,37.16H329.69c.66-12.8,10.23-18.7,30.81-18.7,21.13,0,30.7,7,30.7,19.47V65.29a118.49,118.49,0,0,0,.55,14H368.39a36.08,36.08,0,0,1-.55-6.12h-.34c-3.78,4.56-10.45,7.46-18.24,7.46-12.23,0-21.8-6.23-21.8-18.69,0-12.24,8.12-19,21.91-20.8l18.47-2.45V38c0-5.11-2.56-6.78-7.34-6.78C356.61,31.26,353.26,32.93,353.05,37.16Zm4.45,29.25c5.55,0,10.67-4.12,10.67-12.24v-2l-9.45,1.34c-4.78.66-7.79,2.67-7.79,6.78C350.93,64.19,353.38,66.41,357.5,66.41Z"
          />
        </g>
      </g>
    </svg>
    <svg
      id="logo_2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 391.75 80.75"
    >
      <g id="Layer_22" data-name="Layer 22">
        <g id="Ebene_12" data-name="Ebene 12">
          <path
            d="M23.36,0V47.5L42.5,19.91H69.19L48.61,48.05,69.75,79.42H41.38l-18-30.81V79.42H0V0Z"
          />
          <path d="M72.41,0H95.77V15H72.41Zm0,19.91H95.77V79.42H72.41Z" />
          <path
            d="M182.2,44.05c0-7-3.12-9-7.23-9-4.67,0-8.57,3.22-8.57,12.12V79.42H143.05V44.05c0-6.89-3.12-9-7.24-9-4.67,0-8.56,3.22-8.56,12.12V79.42H103.89V29l-.22-9.12h23l.55,6.79h.34c3.11-5.34,10.23-8.12,16.56-8.12,9.35,0,15.58,3.56,18.81,9.9h.22c5.22-7.34,12-9.9,20.13-9.9,15.46,0,22.25,9.9,22.25,23.47V79.42H182.2Z"
          />
          <path
            d="M233.92,55.4c.78,9.23,3.56,12,9.23,12,4.67,0,7.46-3,7.9-7.46h23.69c-.89,12.8-14.9,20.8-30.48,20.8-20.69,0-33.59-10.56-33.59-31.14s13-31,32.48-31c20,0,32.15,10.34,32.15,32.37V55.4Zm18.24-12.24c-1-8.68-4.22-11.23-9-11.23S235,34.48,234,43.16Z"
          />
          <path
            d="M281,19.91h23.36l.22,9.57h.33c2-5.56,8.12-10.9,17-10.9h5V37.16h-7.79c-9.45,0-14.57,5-14.57,18.35V79.42H281.19V29Z"
          />
          <path
            d="M353.05,37.16H329.69c.66-12.8,10.23-18.7,30.81-18.7,21.13,0,30.7,7,30.7,19.47V65.29a118.49,118.49,0,0,0,.55,14H368.39a36.08,36.08,0,0,1-.55-6.12h-.34c-3.78,4.56-10.45,7.46-18.24,7.46-12.23,0-21.8-6.23-21.8-18.69,0-12.24,8.12-19,21.91-20.8l18.47-2.45V38c0-5.11-2.56-6.78-7.34-6.78C356.61,31.26,353.26,32.93,353.05,37.16Zm4.45,29.25c5.55,0,10.67-4.12,10.67-12.24v-2l-9.45,1.34c-4.78.66-7.79,2.67-7.79,6.78C350.93,64.19,353.38,66.41,357.5,66.41Z"
          />
        </g>
      </g>
    </svg>
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
    const timeline = gsap.timeline({ paused: false });
    const ease = "back.inOut(1.7)";
    // const ease = "elastic.out(0.5, 0.75)";
    // const ease = "power2.inOut";
    const duration = 0.75;
    const stagger = 0.1;
    const y = 150;
    // const height =
    //   document.querySelector(".intro-loader svg").getBoundingClientRect()
    //     .height * 1.25;
    // console.log(height);
    gsap.set("#logo_1 path", { y: -y + "%" });
    gsap.set("#logo_2 path", { y: -y + "%" });
    timeline.fromTo(
      "#logo_1 path",
      {
        y: y + "%",
      },
      {
        y: 0,
        duration: duration,
        stagger: stagger,
        ease: ease,
      }
    );
    // timeline.to("#logo_1 path", {
    //   duration: 1,
    // });
    timeline.to(
      "#logo_1 path",

      {
        // y: -height + "px",
        y: -y + "%",
        duration: duration,
        stagger: stagger,
        ease: ease,
        delay: (-duration / 3) * 2,
        // delay: -0.5,
      }
    );
    // timeline.delay(2);

    timeline.fromTo(
      "#logo_2 path",
      {
        // y: height + "px",
        y: y + "%",
      },
      {
        y: 0,

        duration: duration,
        stagger: stagger,
        ease: ease,
        delay: (-duration / 3) * 5,
        // delay: -1.25,
      }
    );

    timeline.to(".intro-loader", {
      duration: duration + 0.5,
      opacity: 0,

      delay: (-duration / 3) * 2,
      //   delay: -0.5,
      onStart: () => {
        // gsap.set("#logo_2", {
        //   overflow: "unset",
        // });
        gsap.to("#logo_2 path", {
          duration: duration,
          y: -y + "%",
          ease: ease,
          stagger: stagger,
          opacity: 0,
          //   filter: "blur(10px)",
          //   scale: 2,
        });
      },
      onComplete: () => {
        if (this.debug) return;
        this.renderSequence = false;
      },
    });
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
  background-color: var(--kimera-grey);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  svg path {
    fill: black;

    // stro
  }
  svg {
    // overflow: unset;
    min-width: 50vw;
    max-width: 80vw;
    width: 100%;
    position: absolute;
    @include from($tablet) {
      max-width: 50vw;
    }
    // clip-path: url(#clip);
  }
  // background-color: red;
}
</style>
