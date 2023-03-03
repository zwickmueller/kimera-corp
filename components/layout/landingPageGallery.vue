<template>
  <client-only>
    <div class="kimera-landing slider">
      <div ref="stickyElement" class="landing-title fixed-reset">
        <div :style="`height: ${stickyHeight}px`">
          <p
            :class="[
              stickyHeight < 150 ? 'fade-title' : '',
              this.elements[this.currentIndex].blackType
                ? ''
                : 'text-kimera-white',
            ]"
            class="kimera-text-kacheln"
          >
            <transition name="landing-title" mode="out-in">
              <span style="display: block" :key="slideShowTitle">
                {{ slideShowTitle }}</span
              >
            </transition>
          </p>
        </div>
      </div>
      <flicking
        ref="flicking"
        :options="options"
        :viewportTag="'div'"
        :cameraTag="'div'"
        @will-change="onChange"
        :plugins="plugins"
      >
        <div
          class="slide"
          :class="index == currentIndex ? 'active-slide' : ''"
          v-for="(_blok, index) in elements"
          :style="{ maxHeight: '100%', width: '100vw' }"
        >
          <!-- <kimera-image :blok="_blok"></kimera-image> -->
          <component
            :height="'100%'"
            :key="_blok.body[0]._uid"
            :blok="_blok.body[0]"
            :is="_blok.body[0].component"
          />
        </div>
        <!-- </div> -->

        <!-- </div> -->
      </flicking>
      <!-- <canvas id="glcanvas" width="100vw" height="100%" tabindex="1"></canvas> -->
    </div>
  </client-only>
</template>

<script>
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
      stickyHeight: 0,
      currentIndex: 0,
      options: {
        circular: true,
        moveType: "snap",
        align: "prev",
        defaultIndex: this.defaultIndex,
        preventClickOnDrag: true,
        noPanelStyleOverride: false,
        hideBeforeInit: true,
        firstPanelSize: "100vw",
        panelsPerView: 1,
        adaptive: true,
        deceleration: 0.03,
        interruptable: false,
        bounce: "1%",
        resizeOnContentsReady: true,
        inputType: ["touch", "mouse"],
      },
    };
  },
  name: "LandingPageGallery",
  props: ["elements"],
  methods: {
    onChange(e) {
      this.currentIndex = e.index;
    },
    handleScroll() {
      this.stickyHeight =
        this.$refs.stickyElement.getBoundingClientRect().height -
        window.scrollY;
    },
    // transformImage(image, option) {
    //   return (
    //     "https://cors.cables.gl/" + this.$helpers.transformImage(image, option)
    //   );
    // },
  },
  computed: {
    slideShowTitle() {
      if (!this.elements) return "";
      else return this.elements[this.currentIndex].title;
    },
  },
  created() {},
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("scroll", this.handleScroll);
      this.handleScroll();
      this.$refs.flicking.resize();
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@egjs/vue-flicking/dist/flicking.css";

.kimera-landing {
  * {
    /* disable on touch highlights of html elements, especially on mobile! */
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  img {
    width: 100%;
    object-fit: cover;
  }
  .landing-title {
    padding-left: var(--kimera-side-padding);
    z-index: 2;
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    div {
      position: sticky;
      display: flex;
      align-items: center;
      top: 50%;
      // transform: translateY(-50%);
      p {
        transition: opacity 0.37s ease;
        opacity: 1;
        &.fade-title {
          opacity: 0;
        }
      }
    }
  }
  position: relative;
  display: flex;
  height: 90vh;
  // height: 100%;
  max-height: 90vh;
  @include until($tablet) {
    aspect-ratio: 16/9;
    height: 100%;
  }
}
</style>
