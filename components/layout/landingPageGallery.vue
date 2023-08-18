<template>
  <div class="kimera-landing slider">
    <client-only>
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
              <tag-button
                :key="slideShowTitle"
                @click.native="handleTransition"
                style="display: block; cursor: pointer"
                :is-div="true"
                :is-secondary="true"
                :is-small="false"
                >View Project</tag-button
              >
            </transition>
          </p>
        </div>
      </div>
      <Flicking
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
          <component
            :height="'100%'"
            :key="_blok.body[0]._uid"
            :blok="_blok.body[0]"
            :is="_blok.body[0].component"
          />
        </div>
      </Flicking>
    </client-only>
  </div>
</template>

<script>
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
  },
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
    handleTransition() {
      const currentProject = this.elements[this.currentIndex];

      if (currentProject.link && currentProject.link.cached_url)
        this.$root.$emit("transitionTo", currentProject.link.cached_url);
    },
    onChange(e) {
      this.currentIndex = e.index;
    },
    handleScroll() {
      if (!process.client || !this.$refs.stickyElement) return;
      this.stickyHeight =
        this.$refs.stickyElement.getBoundingClientRect().height -
        window.scrollY;
    },
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
    if (!process.client) return;
    this.$nextTick(() => {
      window.addEventListener("scroll", this.handleScroll);
      // this.$refs.flicking.resize();
      // console.log(this.$refs.flicking);
      this.$nextTick(() => {
        if (this.$refs.flicking) {
          this.$refs.flicking.$once("mounted", () => {
            this.$refs.flicking.resize();
          });
        }
        this.handleScroll();
        // console.log(this.$refs.flicking);
      });
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
  .image-container {
    // overflow: auto;
    align-items: center;
    height: 100% !important;
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
    // aspect-ratio: 16/9;
    height: 60vh;
  }
}
</style>
