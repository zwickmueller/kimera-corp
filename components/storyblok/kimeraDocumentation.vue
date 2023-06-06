<template>
  <div class="slider-documentation">
    <client-only>
      <flicking
        ref="flicking"
        :options="options"
        :viewportTag="'div'"
        :cameraTag="'div'"
        :plugins="autoplay"
      >
        <!-- :plugins="plugins" -->
        <div class="slide" v-for="(_blok, index) in blok.body">
          <component :key="_blok._uid" :blok="_blok" :is="_blok.component" />
        </div>
      </flicking>
    </client-only>
  </div>
</template>

<script>
// import {
//   Flicking
// } from "@egjs/vue-flicking";
//

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
      // plugins,
      currentIndex: 0,
      initAnim: false,
      // options: {
      //   // circularFallback: "linear",

      //   circular: true,
      //   moveType: "snap",
      //   align: "prev",
      //   defaultIndex: 0,
      //   preventClickOnDrag: true,
      //   // noPanelStyleOverride: true,

      //   panelsPerView: -1,
      //   adaptive: true,
      //   deceleration: 0.03,
      //   interruptable: true,
      //   bounce: "3%",
      //   resizeOnContentsReady: true,
      //   // overflow: true,
      //   inputType: ["touch", "mouse"],
      //   autoInit: true,
      // },
    };
  },
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  computed: {
    autoplay() {
      return this.blok.autoplay ? plugins : [];
    },
    options() {
      return {
        // circularFallback: "linear",

        circular: this.blok.loop,
        moveType: "snap",
        align: "prev",
        // align: "prev",
        defaultIndex: 0,
        preventClickOnDrag: true,
        // noPanelStyleOverride: true,

        panelsPerView: -1,
        // adaptive: true,
        // deceleration: 0.03,
        interruptable: true,
        bounce: 0,
        resizeOnContentsReady: true,
        // overflow: true,
        inputType: ["touch", "mouse"],
        autoInit: true,
        hideBeforeInit: true,
        // firstPanelSize: "100%",
      };
    },
    // currentIndex() {
    //   return this.$refs.flicking.currentPanel
    // },
    // defaultIndex() {
    //   let lastClickedImageId = this.$root.lastClickedImageId;
    //   if (!lastClickedImageId) return 0;
    //   else
    //     return this.blok.body.findIndex(
    //       (el) => el.src && el.src.id == lastClickedImageId
    //     );
    // },
  },
  methods: {},
  mounted() {
    // this.currentIndex = this.defaultIndex;
    // this.$nextTick(() => {
    //   this.$nextTick(() => {
    //     this.$refs.flicking.resize();
    //     //   this.initAnim = true;
    //     //   // const a = document.querySelectorAll('.stop-anim')
    //     //   // console.log(a);
    //     //   // a.forEach(el => el.classList.remove('stop-anim'))
    //   });
    // });
    setTimeout(() => {
      this.$refs.flicking.resize();
    }, 200);
    // console.log(this.$refs.flicking);
  },
};
</script>

<style lang="scss">
.slider-documentation {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // padding: 0 var(--kimera-side-padding);
  .slide {
    * {
      pointer-events: none;
      // pointer-events: none;
      user-select: none;
    }
    img,
    video {
      height: min(55vh, 45rem) !important;
      position: relative !important;
      width: 100%;
      object-fit: cover;
      border-radius: var(--kimera-border-radius);
      overflow: hidden;
      @include until($tablet) {
        max-width: 95vw;
      }
    }
    .video-container {
      height: min(55vh, 45rem) !important;
    }

    margin-right: calc(var(--kimera-grid-gap) / 2);
    flex-shrink: 0;
    transform: translate(var(--kimera-side-padding), 0px);
  }
  .flicking-viewport {
    height: 100% !important;
  }
}
</style>
