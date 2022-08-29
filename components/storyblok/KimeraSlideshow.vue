<template >
<div class="slider">
  <flicking :options="options" :viewportTag="'div'" :cameraTag="'div'" @need-panel="e => {
      // ADD PANELS
    }">
    <!-- <div class="a"> -->
    <!-- <div class="slide">CONTENTS OF PANEL 0</div>
    <div class="slide">CONTENTS OF PANEL 1</div>
    <div class="slide">CONTENTS OF PANEL 2</div> -->
    <!-- <div class="a"> -->
    <!-- <div class="" v-for="a in 4">
      <img :src="require('~/assets/img/Bild1.png')" alt="" style="user-select: none; pointer-events:none">
    </div> -->
    <div class="slide" v-for="_blok in blok.body" :style="{maxHeight: height}">

      <component :key="_blok._uid" :blok="_blok" :is="_blok.component" />
    </div>
    <!-- </div> -->

    <!-- </div> -->
  </flicking>
</div>
</template>

<script>
// import {
//   Flicking
// } from "@egjs/vue-flicking";
//
export default {
  data() {
    return {
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
    }
  },
  props: {
    blok: {
      type: Object,
      required: true
    },
    height: {
      default: 0,
      required: false
    }

  },
  computed: {
    defaultIndex() {

      let lastClickedImageId = this.$root.lastClickedImageId
      if (!lastClickedImageId) return 0
      else return this.blok.body.findIndex(el => el.src && el.src.id == lastClickedImageId)
    },
    options() {
      return {
        circular: false,
        moveType: 'snap',
        align: 'prev',
        defaultIndex: this.defaultIndex,
        preventClickOnDrag: true,
        noPanelStyleOverride: false,

        panelsPerView: 1,
        adaptive: true,
        deceleration: 0.03,
        interruptable: false,
        bounce: '1%',
        // resizeOnContentsReady: true,
        // overflow: true,
        inputType: ['touch', 'mouse'],
        // autoInit: true
      }
    }
  },

}
</script>
<style>
.slider .slide {
  pointer-events: none
}
</style>
<style lang="scss" >
.slider {
    .a {
        height: 100%;
        width: 100%;
    }
    height: 100%;
    .slide {
        * {
            pointer-events: none;
            // pointer-events: none;
            user-select: none;
        }
        // height: 100%;
        background: var(--kimera-grey);
        // height: inherit;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        max-width: 100vw;
        pointer-events: all;
    }
}
</style>
