<template>
  <div class="slider-documentation">
    <client-only>
      <Flicking ref="flicking" :options="options" :plugins="autoplay">
        <!-- :viewportTag="'div'"
      :cameraTag="'div'" -->
        <!-- :plugins="plugins" -->
        <div
          class="slide"
          :key="_blok._uid"
          v-for="(_blok, index) in blok.body"
        >
          <component :blok="_blok" :is="_blok.component" />
        </div>
      </Flicking>
    </client-only>
  </div>
</template>

<script>
// import {
//   Flicking
// } from "@egjs/vue-flicking";
//

import { AutoPlay } from "@egjs/flicking-plugins";
import { Flicking } from "@egjs/vue-flicking";

const plugins = [
  new AutoPlay({
    animationDuration: 1000,
    duration: 4000,
    direction: "NEXT",
    stopOnHover: false,
  }),
];

export default {
  components: {
    Flicking,
    // VueFlicking,
  },
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
      return this.blok.autoplay
        ? [
            new AutoPlay({
              animationDuration: 1000,
              duration: 4000,
              direction: "NEXT",
              stopOnHover: false,
            }),
          ]
        : [];
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
        useFractionalSize: true,
        // overflow: true,
        // inputType: ["touch", "mouse"],
        // autoInit: false,
        hideBeforeInit: true,
        // firstPanelSize: "100%",
      };
    },
  },
  methods: {},
  mounted() {
    // this.$nextTick(() => {
    //   this.$nextTick(() => {
    //     this.$refs.flicking.init();
    //     // setTimeout(() => {
    //     //   this.$refs.flicking.resize();
    //     // }, 1000);
    //   });
    // });
    if (!process.client) return;
    this.$nextTick(() => {
      this.$nextTick(() => {
        if (this.$refs.flicking) {
          this.$refs.flicking.$once("mounted", () => {
            this.$refs.flicking.resize();
          });
        }
      });
    });
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
        object-fit: contain !important;
        height: auto !important;
        max-width: 95vw;
      }
    }
    .video-container {
      height: min(55vh, 45rem) !important;
    }
    cursor: grab;

    margin-right: calc(var(--kimera-grid-gap) / 2);
    flex-shrink: 0;
    transform: translateX(var(--kimera-side-padding));
  }
  .flicking-viewport {
    height: 100% !important;
  }
}
</style>
