<template>
  <div
    class="kimera-typetester center-all"
    :class="getClasses"
    @mouseenter="mouseEntered"
    @mouseleave="mouseLeaved"
    @click="handleTypetester"
  >
    <div class="typetester-overlay">
      <div class="top">
        <div class="current-fonttype">
          <!-- <tag-button
            :isDiv="true"
            :isSmall="true"
            :isInverted="typetester.invertColors"
            >{{
              getFontDataByName(typetester.style.fontFamily).nameReadable
            }}</tag-button
          >
          <tag-button
            :isDiv="true"
            :isSmall="true"
            :isInverted="typetester.invertColors"
            >{{ getReadableFontWeight(typetester.style) }}</tag-button
          > -->
        </div>
        <div
          class="close close-button"
          v-if="typetester.isUserCreated"
          :class="showCloseButton ? 'show-close-button' : ''"
        >
          <!-- <span class="close-button" @click="deleteCustomTypetest">
          delete
        </span> -->
          <close-button
            @click.native="deleteCustomTypetest"
            :isInverted="typetester.invertColors"
            :isCross="true"
          ></close-button>
        </div>
      </div>
      <div class="bottom">
        <div class="timestamp">
          {{ getTimestampFormatted() }}
          <!-- {{ typetester.timestamp }} -->
          <!-- {{this.typetester.invertColors}} -->
        </div>
        <div class="toggle">
          <dark-mode-toggle
            @click.native="handleInvertColors2"
            :invert="typetester.invertColors"
          ></dark-mode-toggle>

          <!-- <input type="checkbox"  :checked="typetester.invertColors"> -->
        </div>
        <div class="spacer"></div>
      </div>
    </div>
    <div
      class="typetester-inner center-all"
      :style="getStyle"
      v-html="typetester.text"
    >
      <!-- <div class="typetester-inner center-all" contenteditable="true" @input="onInput" @focus="isFocused = true" @focusout="isFocused = false"> -->
      <!-- {{typetester.text}} -->
    </div>
  </div>
</template>

<script>
const cloneDeep = require("lodash.clonedeep");
import { mapMutations, mapGetters } from "vuex";

import { gsap, Flip } from "gsap/all";
if (process.client) {
  gsap.registerPlugin(Flip);
}

function flushQueue() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

import TypetesterMixin from "./TypetesterMixins.js";
export default {
  mixins: [TypetesterMixin],
  props: {
    typetesterData: {
      type: Object,
      // default: () => ({
      //   invertColors: false,
      //   isUserCreated: false,
      //   text: 'Kimera',
      //   timestamp: '15:35',
      //   style: {
      //     fontFamily: 'Waldenburg',
      //     fontSize: '350px',
      //     textAlign: 'center',
      //     letterSpacing: '0em',
      //     lineHeight: '100%',
      //     // fontFamily: 'inherit',
      //     fontWeight: 375,
      //   }
      // })
    },
  },
  data() {
    return {
      isPreview: true,
      localInvertColors: false,
      dom: {
        innerText: null,
        timestamp: null,
        currenFontType: null,
      },
      typetester: {},
      defaults: {
        // width: 8,
        invertColors: false,
        isUserCreated: false,
        text: "Kimera",
        timestamp: "15:35",
        style: {
          fontFamily: "Waldenburg",
          fontSize: "350px",
          textAlign: "center",
          letterSpacing: "0em",
          lineHeight: "100%",
          fontStretch: "normal",
          fontStyle: "normal",
          fontFeatureSettings: "normal",
          // fontFamily: 'inherit',
          fontWeight: 375,
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      getFontDataByName: "fontData/getFontDataByName",
      isMobile: "isMobile",
    }),
    // typetester() {
    //   let b = this.typetesterData
    //   let c = this.defaults
    //   let a = {}
    //   // Object.assign(a, this.defaults, b)
    //   return Object.assign({}, this.defaults, this.typetesterData)
    //
    // }
  },
  methods: {
    ...mapMutations({
      removeCustomTypetest: "typetester/removeCustomTypetest",
    }),
    getTimestampFormatted() {
      if (this.typetester.timestamp == "") {
        return "12:35";
      } else {
        return this.$helpers.formatTimeWithUTCOffset(this.typetester.timestamp);
      }
    },
    async handleTypetester(e) {
      if (!e.target.classList.contains("kimera-typetester")) return;
      function disableScroll() {
        // Get the current page scroll position
        let scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        let scrollLeft =
          window.pageXOffset || document.documentElement.scrollLeft;

        // if any scroll is attempted, set this to the previous value
        window.onscroll = function () {
          window.scrollTo(scrollLeft, scrollTop);
        };
      }

      function enableScroll() {
        window.onscroll = function () {};
      }

      if (e.target.classList.contains("dark-mode-toggle")) return;
      console.log(e.target);
      if (e.target.parentNode.classList.contains("close-button")) return;
      this.setCurrentTypetesterOptions(cloneDeep(this.typetester));
      // console.log(this.typetester);
      const target = this.$el;
      disableScroll();
      const cloned = target.cloneNode(true);
      cloned.classList.add("clone");
      target.parentNode.insertBefore(cloned, target);
      cloned.style.position = "absolute";
      cloned.style.top = target.offsetTop + "px";
      cloned.style.left = target.offsetLeft + "px";
      cloned.style.width = target.getBoundingClientRect().width + "px";
      cloned.style.zIndex = 1;
      this.setIsTypetesterOpen(true);
      await flushQueue();
      const typetesterDom = document.querySelector(
        ".kimera-typetester-background-wrapper"
      );

      gsap.fromTo(
        typetesterDom,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
        }
      );

      const state = Flip.getState(cloned);

      cloned.style.width = this.isMobile
        ? "calc(100% - (var(--kimera-side-padding) * 3))"
        : "calc(100% - (var(--kimera-side-padding) * 2))";
      cloned.style.minWidth = this.isMobile
        ? "calc(100% - (var(--kimera-side-padding) * 3))"
        : "calc(100% - (var(--kimera-side-padding) * 2))";
      cloned.style.height = this.isMobile
        ? "calc(100svh - 4rem - (var(--kimera-side-padding) * 2))"
        : "calc(100vh - (var(--kimera-side-padding) * 2))";
      cloned.style.margin = "var(--kimera-side-padding)";

      cloned.style.left = 0;
      cloned.style.top = 0;
      cloned.style.pointerEvents = "none";

      cloned.style.zIndex = 100;
      cloned.style.background = "#eaeaea";
      cloned.style.position = "fixed";

      if (this.isMobile) {
        const inner = cloned.querySelector(".typetester-inner");
        // inner.style.alignSelf = "flex-start";
        // inner.style.height = "100%";
        // inner.style.transition = "transform 0.5s linear";
        // inner.style.transform = "translateY(-10%)";
        gsap.to(inner, {
          duration: 0.9,
          y: "-12.5%",
          ease: "power3.inOut",
        });
      }
      // cloned.dataset.flipId = "a"

      this.$nextTick(() => {
        Flip.from(state, {
          // targets: [cloned, test],
          duration: 0.9,
          fade: true,
          // nested: true,
          absolute: true,
          toggleClass: "flipping",
          ease: "power3.inOut",
          onStart() {},
          onComplete() {
            enableScroll();
            typetesterDom.childNodes[0].style.opacity = 1;
            gsap.to(cloned, {
              opacity: 0,
              duration: 0.3,
              onComplete() {
                cloned.remove();
              },
            });
          },
        });
      });

      // cloned.classList.add('fixed-reset')
    },
    deleteCustomTypetest() {
      // return;
      this.removeCustomTypetest(this.typetester);
    },
    handleInvertColors2() {
      // console.log("asd");
      this.typetester.invertColors = !this.typetester.invertColors;
      // Object.assign({}, this.defaults, this.typetesterData)
      // this.localInvertColors = !this.localInvertColors
      // this.$set(this.typetester, )
    },
    // onInput(e) {
    //   console.log(e.target.innerText, e);
    // },
    // onFocus(e) {
    //   console.log("focus", e);
    // },

    mouseEntered() {
      if (this.isMobile) return;

      gsap.fromTo(
        [this.dom.timestamp, this.dom.currenFontType],
        {
          x: "-50%",
          scale: 0.1,
        },
        {
          scale: 1,
          x: "0%",
          duration: 0.5,
          ease: "elastic.out(0.45, 0.3)",
        }
      );
      gsap.fromTo(
        this.dom.innerText,
        {
          y: "-1rem",
        },
        {
          y: "0",
          duration: 0.5,
          ease: "elastic.out(0.45, 0.3)",
        }
      );
      if (!this.typetester.isUserCreated && this.typetester.isPreview) return;

      this.$el.addEventListener("mousemove", this.handleMouseMove);
    },
    mouseLeaved() {
      if (this.isMobile) return;
      gsap.fromTo(
        [this.dom.timestamp, this.dom.currenFontType],
        {
          x: "0%",
          scale: 1,
        },
        {
          scale: 0.1,
          x: "-50%",
          duration: 0.5,
          ease: "elastic.out(0.45, 0.3)",
        }
      );
      gsap.fromTo(
        this.dom.innerText,
        {
          y: "0",
        },
        {
          y: "-1rem",
          duration: 0.5,
          ease: "elastic.out(0.45, 0.3)",
        }
      );
      if (!this.typetester.isUserCreated && this.typetester.isPreview) return;
      this.$el.removeEventListener("mousemove", this.handleMouseMove);
    },
  },
  created() {
    this.typetester = Object.assign({}, this.defaults, this.typetesterData);
  },
  mounted() {
    if (!process.client) return;

    this.$nextTick(() => {
      const fontData = this.getFontDataByName(this.getStyle.fontFamily);
      // console.log("fontDatafrom created", fontData, this.$store);
      // console.log("fontDatafrom created", fontData);

      const fontFamily = fontData.fontFamilies.find(
        (font) =>
          font.weight == this.getStyle.fontWeight &&
          font.fontStyle == this.getStyle.fontStyle &&
          font.fontStretch == this.getStyle.fontStretch
      );
      // console.log("here ", fontFamily, fontData, this.getStyle.fontWeight);
      // return
      this.loadFont(fontFamily, fontData.name, fontData.fontDir);

      this.dom.innerText = this.$el.querySelector(".typetester-inner");
      this.dom.timestamp = this.$el.querySelector(".timestamp");
      this.dom.currenFontType = this.$el.querySelector(".current-fonttype");
    });
    // const fitter = new this.$helpers.fitText(this.$refs.typetesterInner);
    // fitter.fit();

    // function fitTextToContainer(container) {
    //   let offset = 0;
    //   const containerWidth = container.parentElement.offsetWidth - offset;
    //   console.log(container.parentElement.scrollWidth - offset);
    //   let fontSize = parseInt(getComputedStyle(container).fontSize);
    //   let minFontSize = 16;
    //   let maxFontSize = 400;

    //   const calc = function (min, max) {
    //     fontSize = Math.floor((min + max) / 2);
    //     container.style.fontSize = fontSize + "px";
    //     if (container.parentElement.scrollWidth - offset > containerWidth) {
    //       if (min === fontSize) {
    //         return fontSize;
    //       }
    //       return calc(min, fontSize - 1);
    //     } else {
    //       if (max === fontSize) {
    //         return fontSize;
    //       }
    //       return calc(fontSize + 1, max);
    //     }
    //   };

    //   return calc(minFontSize, maxFontSize);
    // }
    // // console.log(fitTextToContainer(this.dom.innerText));
    // this.$nextTick(() => {});
  },
};
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
  @include until($tablet) {
    .typetester-overlay {
      opacity: 1;
    }
    background: var(--kimera-white);
  }
  @include from($tablet) {
    &:hover {
      // .current-fonttype {
      //     transform: translateX(0%) scale(1);
      // }
      .typetester-overlay {
        opacity: 1;
      }
    }
  }
}
</style>
