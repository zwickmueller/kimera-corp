<template>
<div class="kimera-typetester-background-wrapper">

  <div class="kimera-typetester" :class="getClasses">
    <!--  @mouseenter="mouseEntered" @mouseleave="mouseLeaved" -->
    <div class="typetester-overlay">
      <div class="top">
        <div class="current-fonttype">

          <div @mouseenter="animateFontSelection()" @mouseleave="animateFontSelection(false)" class="button-wrapper" style="order: 0">

            <div class="button-wrapper-inner current-font" data-flip-id="current-font">
              <tag-button>{{typetester.style.fontFamily}}</tag-button>
            </div>
            <div class="button-wrapper-inner font-selection" data-flip-id="current-font">
              <tag-button v-for="font in getFontData" :isInverted="typetester.invertColors" :key="font.name" @click.native="setFontFamily(font)" :style="typetester.style.fontFamily.toLowerCase() == font.name.toLowerCase() ? 'order: 0' : 'order: 1'">
                {{font.name}}</tag-button>
            </div>
          </div>

          <div class="button-wrapper" @mouseenter="animateWeightSelection()" @mouseleave="animateWeightSelection(false)" style="order: 1">
            <div class="button-wrapper-inner current-weight" data-flip-id="current-weight" :key="'abc2'">
              <tag-button>{{currentWeightReadable}}</tag-button>
            </div>
            <div class="button-wrapper-inner weight-selection" data-flip-id="current-weight" :key="'abc'">
              <tag-button @click.native="setWeight(weights.weight)" v-for="weights in getCurrentFontData.fontFamilies" :isInverted="typetester.invertColors" :key="weights.weightReadable">{{weights.weightReadable}}</tag-button>
            </div>
          </div>


        </div>
        <div class="font-sliders kimera-text-filter">
          <kimera-slider :isInverted="typetester.invertColors" :slider-data="typetester.sliders.fontSize" :target="'fontSize'" :name="'Size'" :unit="'px'" @handleSliders="handleSliders"></kimera-slider>

          <kimera-slider :isInverted="typetester.invertColors" :slider-data="typetester.sliders.letterSpacing" :target="'letterSpacing'" :name="'Leading'" :unit="'em'" @handleSliders="handleSliders"></kimera-slider>

          <kimera-slider :isInverted="typetester.invertColors" :slider-data="typetester.sliders.lineHeight" :target="'lineHeight'" :name="'Spacing'" :unit="'%'" @handleSliders="handleSliders"></kimera-slider>


        </div>
        <div class="close close-button show-close-button">
          <!-- <div class="close close-button" :class="showCloseButton ? 'show-close-button' : ''"> -->
          <span class="close-button" @click="setIsTypetesterOpen(false)">
            close
          </span>
        </div>
      </div>
      <div class="middle">
        <button v-if="showSubmit" class="submit-button button-reset" @click="submit">
          submit
        </button>
      </div>
      <div class="bottom">
        <div class="timestamp">
          <span>{{typetester.timestamp}}</span>
        </div>
        <div class="toggle">
          <dark-mode-toggle @click.native="handleInvertColors" :invert="typetester.invertColors"></dark-mode-toggle>
          <!-- <input type="checkbox" @input="handleInvertColors" name="" :checked="typetester.invertColors"> -->
        </div>
        <div class="spacer">

        </div>
      </div>

    </div>
    <div class="typetester-inner center-all">
      <content-editable multiline spellcheck="false" class="editable-text" :style="getStyle" contenteditable="true" @input="onInput" v-on:edit="onEdit" v-html="typetester.text">

      </content-editable>

    </div>
  </div>
</div>
</template>

<script>
import TypetesterMixin from './TypetesterMixins.js'
const cloneDeep = require('lodash.clonedeep');
const isEqual = require('lodash.isequal');

import {
  mapMutations,
  mapGetters
} from 'vuex'
// import Waldenburg from '../../scripts/fontData/waldenburg.js'

import {
  gsap,
  Flip
} from "gsap/all";

export default {
  mixins: [TypetesterMixin],
  data() {
    return {
      width: 8,
      isPreview: false,
      showSubmit: false,
      oldText: '',
      typetester: {
        invertColors: false,
        isUserCreated: false,
        text: 'Kimera',
        timestamp: '13:35',
        style: {
          fontFamily: 'Waldenburg',
          fontSize: '350px',
          letterSpacing: '0em',
          lineHeight: '100%',
          fontFamily: 'inherit',
          textAlign: 'center',
          fontWeight: 375,
        },
        sliders: {
          fontSize: {
            value: 8,
            min: 8,
            max: 450
          },
          lineHeight: {
            value: 100,
            min: 60,
            max: 110
          },
          letterSpacing: {
            value: 0,
            min: -0.15,
            max: 0.1
          },
        }
      },
      typetesterDefault: {}
    }
  },
  computed: {
    ...mapGetters({
      getFontDataByName: 'fontData/getFontDataByName',
      getFontData: 'fontData/getFontData'
    }),
    currentTypetesterOptions() {
      return this.$store.state.typetester.currentTypetesterOptions
    },
    getCurrentFontData() {
      return this.getFontDataByName(this.typetester.style.fontFamily)
    },
    currentWeightReadable() {
      return this.getFontWeightAsReadable(this.typetester.style.fontFamily, this.typetester.style.fontWeight)
    }
  },
  // watch: {
  //   typetester: {
  //     handler: function(a, b) {
  //       console.log(a, b);
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    ...mapMutations({
      addCustomTypetest: 'typetester/addCustomTypetest',
      updateCustomTypetest: 'typetester/updateCustomTypetest'
    }),
    setFontFamily(fontData) {
      console.log(fontData);
      this.loadFont(fontData.fontFamilies[0], fontData.name, fontData.fontDir)

      this.typetester.style.fontFamily = fontData.name
      this.typetester.style.fontWeight = fontData.fontFamilies[0].weight
      this.animateFontSelection()
    },
    async setWeight(weight) {
      // return
      const fontData = this.getCurrentFontData.fontFamilies.find(font => font.weight == weight)
      // console.log("here ", fontData);
      await this.loadFont(fontData, this.getCurrentFontData.name, this.getCurrentFontData.fontDir)
      // this.$nextTick(() => {

      // this.animateWeightSelection(false)

      this.typetester.style.fontWeight = weight
      // })
      // setTimeout(() => {
      //
      // }, 100)

      this.animateWeightSelection(true, true)

    },

    submit() {
      this.typetester.path = this.$route.fullPath
      if (this.typetester.isUserCreated) {
        this.updateCustomTypetest(this.typetester)
      } else {

        this.typetester.timestamp = String(new Date())
        this.typetester.isUserCreated = true
        this.addCustomTypetest({
          // TODO: DYNAMIC FONT MATCHING (by path params?)
          // font: this.typetester.path,
          options: this.typetester
        })
      }
      this.setIsTypetesterOpen(false)
    },
    handleSliders(e) {
      // this.showSubmit = true
      const style = e.target.name
      // console.log("EVENT FROM PARENT", style, e);
      this.typetester.sliders[style].value = e.target.value
      this.typetester.style[style] = this.typetester.sliders[style].value + (e.target.dataset.unit ? e.target.dataset.unit : '')
    },
    onInput(e) {
      console.log();
      if (e.target.innerText !== this.oldText) this.showSubmit = true
      // else this.showSubmit = false
    },

    onEdit(e) {
      this.typetester.text = e.target.innerHTML
    },
    animateFontSelection(enter = true) {
      const currenFontDom = this.$el.querySelector('.current-font')
      const fontSelectionDom = this.$el.querySelector('.font-selection')
      const state = Flip.getState(".current-font, .font-selection");
      if (enter) {
        currenFontDom.classList.add("active");
        fontSelectionDom.classList.add("active");
      } else {
        currenFontDom.classList.remove("active");
        fontSelectionDom.classList.remove("active");
      }
      this.$nextTick(() => {
        console.log(Flip.isFlipping(".current-font, .font-selection"));

        Flip.from(state, {
          duration: 0.375,
          // fade: true,
          // absolute: true,
          // absolute: ".kimera-button",
          // nested: true,
          // absoluteOnLeave: true,
          // simple: true,
          // stagger: 1,
          // props: "padding",
          toggleClass: "flipping",
          // ease: "elastic.out(0.45, 0.3)"
          // ease: "back.out(1.7)"
          ease: "power3.out"

        });
      })
    },
    animateWeightSelection(enter = true, override = false) {
      const currenWeightDom = this.$el.querySelector('.current-weight')
      const weightSelectionDom = this.$el.querySelector('.weight-selection')
      const state = Flip.getState(".current-weight, .weight-selection");
      if (enter) {
        currenWeightDom.classList.add("active");
        weightSelectionDom.classList.add("active");
      } else {
        console.log("LEFT");
        currenWeightDom.classList.remove("active");
        weightSelectionDom.classList.remove("active");
      }
      this.$nextTick(() => {
        // console.log(Flip.isFlipping(".current-weight, .font-selection"));

        Flip.from(state, {
          duration: override ? 0 : 0.375,
          // fade: true,
          // absolute: true,
          // absolute: ".kimera-button",
          // nested: true,
          // absoluteOnLeave: true,
          // simple: true,
          // stagger: 1,
          // props: "padding",


          toggleClass: "flipping",
          // ease: "elastic.out(1.1, 0.5)"
          ease: "power3.out"

        });
      })
    }

  },
  created() {
    this.typetesterDefault = this.typetester
    // // TODO: check if currentTypetesterOptions exists? needed?
    this.typetester = cloneDeep(Object.assign({}, this.typetester, this.currentTypetesterOptions))
    this.typetester.sliders.fontSize.value = parseFloat(this.typetester.style.fontSize)
    this.typetester.sliders.letterSpacing.value = parseFloat(this.typetester.style.letterSpacing)
    this.typetester.sliders.lineHeight.value = parseFloat(this.typetester.style.lineHeight)
    this.oldText = this.typetester.text

    const oldTypetester = cloneDeep(this.typetester)
    const unwatch = this.$watch('typetester', (typetester) => {
      console.log("aaa");
      if (!isEqual(oldTypetester, typetester)) {
        this.showSubmit = true
        unwatch()
      }
    }, {
      deep: true
    })
  },
  mounted() {
    // document.addEventListener("click", this.animateFontSelection)

    // console.log(this.getFontDataByName("waldenburg"));
    // const element = this.$el.querySelector('content-editable');
    // element.addEventListener('edit', (e) => {
    //   console.log(e.target.innerHTML); // the new value
    //   console.log(e.target.previousInnerHTML); // old value
    // });
  }
}
</script>

<style media="screen">
.kimera-typetester .button-wrapper button {
  justify-content: flex-start;
  align-items: baseline;
}
</style>
<style lang="scss" scoped>
$typetester-margin: var(--kimera-side-padding);
.font-selection,
.weight-selection {
    display: none;
}
.font-selection.active,
.weight-selection.active {
    display: flex;
    flex-direction: column;
}
.font-selection,
.weight-selection {
    overflow: hidden;

}
.current-font {
    // min-height: 2em;
}
.current-font.active,
.current-weight.active {
    // visibility: hidden;
    display: none;

}
.font-selection,
.font-selection.flipping,
.weight-selection,
.weight-selection.flipping {
    visibility: visible;
    min-height: 2em;
}
.font-selection.flipping button {
    // pointer-events: none !important;
}

.kimera-typetester-background-wrapper {
    // margin: $typetester-margin;
    height: calc(100vh);
    width: calc(100vw);
    z-index: 100;
    padding: $typetester-margin;
    background: rgba(0,0,0,0.8);
    position: fixed;
    top: 0;
    left: 0;
}
.editable-text {
    // display: inline-block !important;
    outline: none;
}
.button-wrapper {
    // position: relative;
    display: flex;
    flex-direction: row;
}
.button-wrapper-inner {
    // display: flex;
    // flex-direction: column;
    height: fit-content;
    background: var(--black);
    border-radius: 0.7em;
}
.current-fonttype {
    flex-grow: 1;
    flex-basis: 0;
}
.font-sliders {
    column-gap: 2em;
    display: flex;
    flex-grow: 1;
    align-items: flex-start;

}
.close {
    flex-basis: 0;

}
.kimera-typetester {
    position: relative;
    // height: 100vh;
    // width: 100%;
    background: var(--kimera-grey);
    cursor: default;
    // height: calc(100vh - ($typetester-margin * 2));
    // width: calc(100vw - ($typetester-margin * 2));
    height: 100%;
    width: 100%;
    .top .close-button,
    .top .font-slider,
    .top button,
    .top input {
        pointer-events: all;
    }
    .top div {
        pointer-events: none;
    }
}
content-editable {
    white-space: pre;
    min-width: 250px;
    cursor: auto;
}

.middle {
    align-self: flex-end;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    .submit-button {
        pointer-events: all;
        transform: rotateY(0deg);
        animation: wiggle 0.82s cubic-bezier(.36,.07,.19,.97) both;
        &:hover {
            animation: wiggle 0.82s cubic-bezier(.36,.07,.19,.97) forwards;
        }
    }
}
</style>
