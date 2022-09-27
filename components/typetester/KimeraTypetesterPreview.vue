<template>
<div class="kimera-typetester center-all" :class="getClasses" @mouseenter="mouseEntered" @mouseleave="mouseLeaved" @click="handleTypetester">
  <div class="typetester-overlay">
    <div class="top">
      <div class="current-fonttype">
        <tag-button :isDiv="true" :isInverted="typetester.invertColors">{{typetester.style.fontFamily}}</tag-button>
        <tag-button :isDiv="true" :isInverted="typetester.invertColors">{{getReadableFontWeight(typetester.style.fontFamily, typetester.style.fontWeight)}}</tag-button>
      </div>
      <div class="close close-button" v-if="typetester.isUserCreated" :class="showCloseButton ? 'show-close-button' : ''">
        <span class="close-button" @click="deleteCustomTypetest">
          delete
          <!-- <close-icon :size="14"></close-icon> -->
        </span>
      </div>
    </div>
    <div class="bottom">
      <div class="timestamp">
        {{typetester.timestamp}}
      </div>
      <div class="toggle">
        <dark-mode-toggle @click.native="handleInvertColors" :invert="typetester.invertColors"></dark-mode-toggle>

        <!-- <input type="checkbox"  :checked="typetester.invertColors"> -->
      </div>
      <div class="spacer">

      </div>
    </div>
  </div>
  <div class="typetester-inner center-all" :style="getStyle" v-html="typetester.text">
    <!-- <div class="typetester-inner center-all" contenteditable="true" @input="onInput" @focus="isFocused = true" @focusout="isFocused = false"> -->
    <!-- {{typetester.text}} -->
  </div>
</div>
</template>

<script>
const cloneDeep = require('lodash.clonedeep');
import {
  mapMutations,
  mapGetters
} from 'vuex'
import {
  gsap
} from "gsap/all";
import TypetesterMixin from './TypetesterMixins.js'
export default {
  mixins: [TypetesterMixin],
  props: {
    typetester: {
      type: Object,
      default: () => ({
        invertColors: false,
        isUserCreated: false,
        text: 'Kimera',
        timestamp: '15:35',
        style: {
          fontFamily: 'Waldenburg',
          fontSize: '350px',
          textAlign: 'center',
          letterSpacing: '0em',
          lineHeight: '100%',
          // fontFamily: 'inherit',
          fontWeight: 375,
        }
      })
    }
  },
  data() {
    return {
      width: 8,
      isPreview: true,
      dom: {
        innerText: null,
        timestamp: null,
        currenFontType: null
      }
    }
  },
  computed: {
    ...mapGetters({
      getFontDataByName: 'fontData/getFontDataByName',
    })
  },
  methods: {
    ...mapMutations({
      removeCustomTypetest: 'typetester/removeCustomTypetest',
    }),
    handleTypetester(e) {
      if (e.target.classList.contains("dark-mode-toggle")) return
      console.log(e.target);
      if (e.target.parentNode.classList.contains("close-button")) return
      this.setCurrentTypetesterOptions(cloneDeep(this.typetester))
      // console.log(this.typetester);
      this.setIsTypetesterOpen(true)
    },
    deleteCustomTypetest() {
      this.removeCustomTypetest(this.typetester)
    },

    // onInput(e) {
    //   console.log(e.target.innerText, e);
    // },
    // onFocus(e) {
    //   console.log("focus", e);
    // },

    mouseEntered() {
      gsap.fromTo([this.dom.timestamp, this.dom.currenFontType], {
        x: '-50%',
        scale: 0.1,
      }, {
        scale: 1,
        x: '0%',
        duration: 0.5,
        ease: "elastic.out(0.45, 0.3)"
      })
      gsap.fromTo(this.dom.innerText, {
        y: '0',
      }, {
        y: '1rem',
        duration: 0.5,
        ease: "elastic.out(0.45, 0.3)"
      })
      if (!this.typetester.isUserCreated && this.typetester.isPreview) return

      this.$el.addEventListener('mousemove', this.handleMouseMove)
    },
    mouseLeaved() {
      gsap.fromTo([this.dom.timestamp, this.dom.currenFontType], {
        x: '0%',
        scale: 1,
      }, {
        scale: 0.1,
        x: '-50%',
        duration: 0.5,
        ease: "elastic.out(0.45, 0.3)"
      })
      gsap.fromTo(this.dom.innerText, {
        y: '1rem',
      }, {
        y: '0',
        duration: 0.5,
        ease: "elastic.out(0.45, 0.3)"
      })
      if (!this.typetester.isUserCreated && this.typetester.isPreview) return
      this.$el.removeEventListener('mousemove', this.handleMouseMove)
    },
  },
  mounted() {
    // this.$nextTick(() => {

    const fontData = this.getFontDataByName(this.getStyle.fontFamily)
    // console.log("fontDatafrom created", fontData);

    const fontFamily = fontData.fontFamilies.find(font => font.weight == this.getStyle.fontWeight)
    // console.log("here ", fontFamily, fontData, this.getStyle.fontWeight);
    // return
    this.loadFont(fontFamily, fontData.name, fontData.fontDir)
    // })


    this.dom.innerText = this.$el.querySelector('.typetester-inner')
    this.dom.timestamp = this.$el.querySelector('.timestamp')
    this.dom.currenFontType = this.$el.querySelector('.current-fonttype')
  }
}
</script>

<style lang="scss" scoped>
.kimera-typetester {
    .typetester-overlay {
        transition: opacity 0.375s ease;
        will-change: opacity;
        opacity: 0;
    }
    // .current-fonttype {
    //     transition: transform 0.2s ease;
    //     will-change: transform;
    //     transform: translateX(-50%) scale(0.2);
    //
    // }
    &:hover {
        // .current-fonttype {
        //     transform: translateX(0%) scale(1);
        // }
        .typetester-overlay {
            opacity: 1;

        }
    }
}
</style>
