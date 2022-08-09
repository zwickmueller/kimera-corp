<template>
<div class="kimera-landing">
  <div ref="stickyElement" class="landing-title fixed-reset">
    <div :style="`height: ${stickyHeight}px`">
      <p :class="[stickyHeight < 150 ? 'fade-title' : '',this.elements[this.cablesIndex].blackType ? '':'text-kimera-white' ]" class="kimera-text-kacheln">
        {{slideShowTitle}}
      </p>
    </div>
  </div>
  <canvas id="glcanvas" width="100vw" height="100%" tabindex="1"></canvas>
</div>
</template>

<script>
export default {
  data() {
    return {
      stickyHeight: 0,
      cablesIndex: 0
    }
  },
  name: 'LandingPageGallery',
  props: ['elements'],
  methods: {
    handleScroll() {
      this.stickyHeight = this.$refs.stickyElement.getBoundingClientRect().height - window.scrollY
    },
    transformImage(image, option) {
      return "https://cors.cables.gl/" + this.$helpers.transformImage(image, option)
    }
  },
  computed: {
    slideShowTitle() {
      if (!this.elements) return ''
      else return this.elements[this.cablesIndex].title
    }
  },
  created() {},
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {


    let that = this

    let images = this.elements.map(el => this.transformImage(el.image.filename, '2048x0/filters:format(webp)'))

    function patchInitialized(patch) {}
    const onError = (error) => console.log(error)
    const patchFinishedLoading = (patch) => {
      const currentIndex = CABLES.patch.getVar("currentIndex");
      if (currentIndex) {
        currentIndex.addListener(function(newValue) {
          that.cablesIndex = newValue
        });
      }
    }
    console.log(CABLES.patch);
    // if (CABLES.patch) return
    CABLES.patch = new CABLES.Patch({
      patch: CABLES.exportedPatch,
      "prefixAssetPath": "",
      "glCanvasId": "glcanvas",
      "glCanvasResizeToWindow": false,
      "glCanvasResizeToParent": true,
      "onPatchLoaded": patchInitialized,
      "onFinishedLoading": patchFinishedLoading,
      "onError": onError,
      // "canvas": {
      //   "alpha": true,
      //   "premultipliedAlpha": true
      // },
      "variables": {
        "imageArray": images
      }
    });
    // });
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll()
  }
}
</script>

<style lang="scss" >
#performance {
    display: none !important;
}
</style>
<style lang="scss" scoped>
.kimera-landing {
    canvas {
        display: block;
        position: absolute;
        outline: 0;
        max-height: 90vh;
        height: 100%;

    }
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
        z-index: 1;
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
    max-height: 90vh;
}
</style>
