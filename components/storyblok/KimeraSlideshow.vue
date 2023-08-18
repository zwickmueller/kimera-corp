<template>
  <div class="slider" :class="initAnim ? '' : 'stop-anim'">
    <!-- <client-only> -->
    <Flicking
      ref="flicking"
      :options="options"
      :viewportTag="'div'"
      :cameraTag="'div'"
      @will-change="test"
      :plugins="plugins"
      @need-panel="
        (e) => {
          // ADD PANELS
        }
      "
    >
      <!-- <div class="a"> -->
      <!-- <div class="slide">CONTENTS OF PANEL 0</div>
    <div class="slide">CONTENTS OF PANEL 1</div>
    <div class="slide">CONTENTS OF PANEL 2</div> -->
      <!-- <div class="a"> -->
      <!-- <div class="" v-for="a in 4">
      <img :src="require('~/assets/img/Bild1.png')" alt="" style="user-select: none; pointer-events:none">
    </div> -->
      <div
        class="slide"
        :class="index == currentIndex ? 'active-slide' : ''"
        v-for="(_blok, index) in blok.body"
        :style="{ maxHeight: height }"
      >
        <component :key="_blok._uid" :blok="_blok" :is="_blok.component" />
      </div>
      <!-- </div> -->

      <!-- </div> -->
    </Flicking>
    <!-- </client-only> -->
  </div>
</template>

<script>
// import {
//   Flicking
// } from "@egjs/vue-flicking";
//
import { Flicking } from "@egjs/vue-flicking";

import { AutoPlay } from "@egjs/flicking-plugins";

const plugins = [
  new AutoPlay({
    animationDuration: 1000,
    duration: 4000,
    direction: "NEXT",
    stopOnHover: false,
  }),
];

export default {
  data() {
    return {
      plugins,
      currentIndex: 0,
      initAnim: false,
      // options: {
      //   circular: false,
      //   moveType: 'snap',
      //   align: 'prev',
      //   preventClickOnDrag: true,
      //   noPanelStyleOverride: true,
      //   panelsPerView: 1,
      //   adaptive: true,
      //   deceleration: 0.03,
      //   interruptable: false,
      //   bounce: '1%',
      //   resizeOnContentsReady: true,
      //   overflow: true,
      //   inputType: ['touch', 'mouse'],
      //   autoInit: true
      // }
    };
  },
  components: {
    Flicking,
  },
  props: {
    blok: {
      type: Object,
      required: true,
    },
    height: {
      default: "100vh",
      required: false,
    },
  },
  computed: {
    // currentIndex() {
    //   return this.$refs.flicking.currentPanel
    // },
    defaultIndex() {
      let lastClickedImageId = this.$root.lastClickedImageId;

      if (!lastClickedImageId) return 0;
      if (String(lastClickedImageId).length < 3) return lastClickedImageId;
      else
        return this.blok.body.findIndex(
          (el) => el.src && el.src.id == lastClickedImageId
        );
    },
    options() {
      return {
        circular: true,
        moveType: "snap",
        align: "prev",
        defaultIndex: this.defaultIndex,
        preventClickOnDrag: true,
        noPanelStyleOverride: false,

        panelsPerView: 1,
        adaptive: true,
        deceleration: 0.03,
        interruptable: false,
        bounce: "1%",
        // resizeOnContentsReady: true,
        // overflow: true,
        inputType: ["touch", "mouse"],
        // autoInit: true
      };
    },
  },
  methods: {
    test(e) {
      const videoElement = e.panel.element.querySelector("video");
      this.currentIndex = e.index;
      if (videoElement) {
        videoElement.currentTime = 0;
        videoElement.play();
      }
    },
  },
  mounted() {
    // console.log(
    //   "this.$root.lastClickedImageId ",
    //   this.$root.lastClickedImageId
    // );
    this.currentIndex = this.defaultIndex;
    this.$nextTick(() => {
      this.initAnim = true;
      // const a = document.querySelectorAll('.stop-anim')
      // console.log(a);
      // a.forEach(el => el.classList.remove('stop-anim'))
    });
    // console.log(this.$refs.flicking);
    // console.log("lastClickedImageId ", this.$root.lastClickedImageId);
  },
};
</script>
<style>
/* .slider .slide {
  pointer-events: none;
} */
</style>
<style lang="scss">
// .stop-anim picture {
//   transition: none !important;
// }
// .slider {
//   .a {
//     height: 100%;
//     width: 100%;
//   }
//   height: 100%;
//   width: 100%;
//   .slide {
//     * {
//       pointer-events: none;
//       // pointer-events: none;
//       user-select: none;
//     }

//     picture {
//       transition: all 0.5s ease;
//       transform: scale(1.3);
//     }
//     overflow: hidden;
//     &.active-slide picture {
//       transform: scale(1);
//     }
//     // height: 100%;
//     background: var(--kimera-grey);
//     // height: inherit;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 100%;
//     max-width: 100vw;
//     pointer-events: all;
//   }
//   .flicking-viewport {
//     height: 100% !important;
//   }
// }
</style>
