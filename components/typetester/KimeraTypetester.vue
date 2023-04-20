<template>
  <div class="kimera-typetester-background-wrapper" @click.stop="clickOutside">
    <div class="kimera-typetester" :class="getClasses">
      <!--  @mouseenter="mouseEntered" @mouseleave="mouseLeaved" -->
      <div class="typetester-overlay">
        <div class="top">
          <div class="current-fonttype">
            <div
              @mouseenter="animateFontSelection()"
              @mouseleave="animateFontSelection(false)"
              class="button-wrapper"
              style="order: 0"
            >
              <div
                class="button-wrapper-inner current-font"
                :class="typetester.invertColors ? 'is-inverted' : ''"
                data-flip-id="current-font"
              >
                <tag-button
                  :isSmall="isMobile"
                  :isInverted="typetester.invertColors"
                  >{{ getCurrentFontData.nameReadable }}</tag-button
                >
                <!-- // typetester.style.fontFamily -->
              </div>
              <div
                class="button-wrapper-inner font-selection"
                :class="typetester.invertColors ? 'is-inverted' : ''"
                data-flip-id="current-font"
              >
                <tag-button
                  v-for="font in getFontData"
                  :isInverted="typetester.invertColors"
                  :key="font.name"
                  :isSmall="isMobile"
                  @click.native="setFontFamily(font)"
                  :style="
                    typetester.style.fontFamily.toLowerCase() ==
                    font.name.toLowerCase()
                      ? 'order: 0'
                      : 'order: 1'
                  "
                >
                  {{ font.nameReadable }}</tag-button
                >
              </div>
            </div>
            <!--  -->
            <div
              class="button-wrapper"
              @mouseenter="animateWeightSelection()"
              @mouseleave="animateWeightSelection(false)"
              style="order: 1"
            >
              <div
                class="button-wrapper-inner current-weight"
                :class="typetester.invertColors ? 'is-inverted' : ''"
                data-flip-id="current-weight"
                :key="'abc2'"
              >
                <tag-button
                  :isSmall="isMobile"
                  :isInverted="typetester.invertColors"
                  >{{ currentWeightReadable }}</tag-button
                >
              </div>
              <div
                class="button-wrapper-inner weight-selection"
                :class="typetester.invertColors ? 'is-inverted' : ''"
                data-flip-id="current-weight"
                :key="'abc'"
              >
                <tag-button
                  @click.native="setFontData(data)"
                  v-for="data in getCurrentFontData.fontFamilies"
                  :isInverted="typetester.invertColors"
                  :key="data.weightReadable"
                  :isSmall="isMobile"
                  :class="
                    currentWeightReadable == data.weightReadable ? 'active' : ''
                  "
                >
                  {{ data.weightReadable }}</tag-button
                >
              </div>
              <div
                class="gradient-indicator"
                :class="typetester.invertColors ? 'is-inverted' : ''"
              ></div>
            </div>
          </div>
          <!-- <div v-if="!isMobile" class="font-sliders kimera-text-filter">
            <kimera-slider
              :isInverted="typetester.invertColors"
              :slider-data="typetester.sliders.fontSize"
              :target="'fontSize'"
              :name="'Size'"
              :unit="'px'"
              @handleSliders="handleSliders"
            ></kimera-slider>

            <kimera-slider
              :isInverted="typetester.invertColors"
              :slider-data="typetester.sliders.letterSpacing"
              :target="'letterSpacing'"
              :name="'Spacing'"
              :unit="'em'"
              @handleSliders="handleSliders"
            ></kimera-slider>

            <kimera-slider
              :isInverted="typetester.invertColors"
              :slider-data="typetester.sliders.lineHeight"
              :target="'lineHeight'"
              :name="'Leading'"
              :unit="'%'"
              @handleSliders="handleSliders"
            ></kimera-slider>
          </div> -->
          <kimera-typetester-sliders
            v-if="!isMobile"
            @handleSliders="handleSliders"
            :typetester="typetester"
          ></kimera-typetester-sliders>
          <div class="close close-button show-close-button">
            <!-- <div class="close close-button" :class="showCloseButton ? 'show-close-button' : ''"> -->
            <!-- <span class="close-button" @click="close"> close </span> -->
            <!-- <tag-button
              isSecondary
              @click.native="close"
              class=""
              :isDiv="false"
              :isInverted="typetester.invertColors"
            >
              _</tag-button
            > -->
            <close-button
              @click.native="close"
              :isInverted="typetester.invertColors"
            ></close-button>
          </div>
        </div>
        <div class="middle" v-if="!isMobile">
          <!-- <button
            v-if="showSubmit"
            class="submit-button button-reset"
            @click="submit"
          >
            submit
          </button> -->
          <div class="anim-submit-button">
            <div class="inner">
              <tag-button
                isSecondary
                v-if="showSubmit"
                @click.native="submit"
                class=""
                :class="[showSubmit ? 'submit-button' : '']"
                :isDiv="false"
                :isInverted="typetester.invertColors"
              >
                {{ typetester.isUserCreated ? "update" : "submit" }}
              </tag-button>
            </div>
          </div>
        </div>
        <div class="bottom" v-if="!isMobile">
          <div class="timestamp">
            <span>{{ typetester.timestamp }}</span>
          </div>
          <div class="toggle">
            <dark-mode-toggle
              @click.native="handleInvertColors"
              :invert="typetester.invertColors"
            ></dark-mode-toggle>
            <!-- <input type="checkbox" @input="handleInvertColors" name="" :checked="typetester.invertColors"> -->
          </div>
          <div class="spacer open-type-features">
            <tag-button
              @click.native="addOpenTypeFeatures(feature)"
              isSecondary
              :isActive="isActiveOpenTypeFeature(feature)"
              v-for="feature in getFilteredOpenTypeFeatures"
              :isInverted="typetester.invertColors"
              :key="feature.label"
            >
              <!-- v-for="feature in getCurrentFontData.openTypeFeatures" -->
              {{ feature.label }}</tag-button
            >
          </div>
        </div>
      </div>
      <div class="mobile-ui" v-if="isMobile">
        <kimera-typetester-sliders
          @handleSliders="handleSliders"
          :typetester="typetester"
        ></kimera-typetester-sliders>
        <!-- :class="[showSubmit ? 'submit-button' : '']" -->
        <tag-button
          isSecondary
          @click.native="submit"
          class="submit-mobile"
          :isDiv="false"
          :isBig="true"
          :isInverted="typetester.invertColors"
        >
          {{ typetester.isUserCreated ? "update" : "submit" }}
        </tag-button>
      </div>
      <div class="typetester-inner center-all">
        <content-editable
          multiline
          spellcheck="false"
          class="editable-text editable-text-initial-fontsize"
          :style="getStyle"
          contenteditable="true"
          @input="onInput"
          v-on:edit="onEdit"
          v-html="typetester.text"
        >
        </content-editable>
      </div>
    </div>
  </div>
</template>

<script>
import TypetesterMixin from "./TypetesterMixins.js";
const cloneDeep = require("lodash.clonedeep");
const isEqual = require("lodash.isequal");

import { mapMutations, mapGetters } from "vuex";

import { gsap, ScrollToPlugin, Flip } from "gsap/all";
if (process.client) {
  gsap.registerPlugin(ScrollToPlugin, Flip);
}

function flushQueue() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

export default {
  mixins: [TypetesterMixin],
  data() {
    return {
      isPreview: false,
      showSubmit: false,
      oldText: "",
      isSubmitting: false,
      typetester: {
        invertColors: false,
        isUserCreated: false,
        text: "Kimera",
        timestamp: "13:35",
        openTypeFeatures: {
          selectedOpenTypeFeatures: [],
        },
        style: {
          fontFeatureSettings: "normal",
          fontFamily: "Waldenburg",
          fontSize: "350px",
          letterSpacing: "0em",
          lineHeight: "100%",
          textAlign: "center",
          fontWeight: 375,
          fontStretch: "normal",
          fontStyle: "normal",
        },
        sliders: {
          fontSize: {
            value: 8,
            min: 8,
            max: 450,
          },
          lineHeight: {
            value: 100,
            min: 60,
            max: 110,
          },
          letterSpacing: {
            value: 0,
            min: -0.15,
            max: 0.1,
          },
        },
      },
      typetesterDefault: {},
    };
  },
  computed: {
    ...mapGetters({
      getFontDataByName: "fontData/getFontDataByName",
      getFontData: "fontData/getFontData",
      isMobile: "isMobile",
    }),

    currentTypetesterOptions() {
      return this.$store.state.typetester.currentTypetesterOptions;
    },
    getFilteredOpenTypeFeatures() {
      if (!this.getCurrentFontData.openTypeFeaturesFiltered) return [];
      return this.getCurrentFontData.openTypeFeatures.filter((feature) =>
        this.getCurrentFontData.openTypeFeaturesFiltered.includes(feature.value)
      );
      // return this.getCurrentFontData.openTypeFeatures.filter(el => el.label)
    },
    getCurrentFontData() {
      return this.getFontDataByName(this.typetester.style.fontFamily);
    },
    currentWeightReadable() {
      return this.getFontWeightAsReadable(this.typetester.style);
    },
  },

  methods: {
    stripHtmlTags(str) {
      return str.replace(/<[^>]*>/g, "");
    },
    clickOutside(e) {
      if (e.target.classList.contains("kimera-typetester-background-wrapper"))
        this.setIsTypetesterOpen(false);
    },
    ...mapMutations({
      addCustomTypetest: "typetester/addCustomTypetest",
      updateCustomTypetest: "typetester/updateCustomTypetest",
      removeCustomTypetest: "typetester/removeCustomTypetest",
    }),
    setFontFamily(fontData) {
      this.loadFont(fontData.fontFamilies[0], fontData.name, fontData.fontDir);
      this.typetester.style.fontFamily = fontData.name;
      this.updateCurrentTypetest(fontData.fontFamilies[0]);
      this.animateFontSelection();
    },
    updateCurrentTypetest(fontData) {
      this.typetester.style.fontWeight = fontData.weight;
      this.typetester.style.fontStyle = fontData.fontStyle;
      this.typetester.style.fontStretch = fontData.fontStretch;
    },
    isActiveOpenTypeFeature(feature) {
      return this.typetester.style.fontFeatureSettings.includes(feature.value);
    },
    addOpenTypeFeatures(feature) {
      var index =
        this.typetester.openTypeFeatures.selectedOpenTypeFeatures.findIndex(
          (x) => x.value == feature.value
        );
      if (index == -1) {
        this.typetester.openTypeFeatures.selectedOpenTypeFeatures.push(feature);
      } else {
        this.typetester.openTypeFeatures.selectedOpenTypeFeatures.splice(
          index,
          1
        );
      }
      this.typetester.style.fontFeatureSettings =
        this.$helpers.getOpenTypeFeatures(this.typetester.openTypeFeatures);
    },
    async setFontData(fontData) {
      await this.loadFont(
        fontData,
        this.getCurrentFontData.name,
        this.getCurrentFontData.fontDir
      );
      this.updateCurrentTypetest(fontData);

      this.animateWeightSelection(true, true);
    },

    async submit() {
      this.isSubmitting = true;
      // ROUTECHANGE HERE
      this.typetester.path = this.$helpers.normalizePath(this.$route.fullPath);
      // this.typetester.path = this.$route.fullPath;
      // console.log(
      //   this.stripHtmlTags(this.typetester.text),
      //   this.typetester.text
      // );
      this.animateFontSelection(false);
      this.animateWeightSelection(false);
      if (this.typetester.isUserCreated) {
        if (this.stripHtmlTags(this.typetester.text).trim() == "") {
          // this.typetester.text = "Kimera";
          console.log(this.typetester);
          this.removeCustomTypetest(this.typetester);
          this.setIsTypetesterOpen(false);
          return;
        } else {
        }
        this.updateCustomTypetest(this.typetester);
        this.setIsTypetesterOpen(false);
        return;
      } else {
        this.typetester.timestamp = String(new Date());
        this.typetester.isUserCreated = true;
        this.addCustomTypetest({
          options: this.typetester,
        });
      }

      const target = this.$el;

      const cloned = target.cloneNode(true);
      cloned.classList.add("clone");
      cloned.classList.add("pointer-events-none-force");
      target.parentNode.insertBefore(cloned, target);

      this.setIsTypetesterOpen(false);

      await flushQueue();

      this.$nextTick(() => {
        const previewDom = document.querySelector(
          `[data-timestamp="${this.typetester.timestamp}"]`
        );
        let height = window.getComputedStyle(previewDom).height;
        console.log(height);
        const tl = gsap.timeline();
        // console.log(
        //   window.innerHeight / 2 - parseFloat(height) / 2,
        //   height,
        //   "!aqwsdasdasd"
        // );
        // if (this.isMobile) {
        //   let mobileHeight = `calc(${window.getComputedStyle(previewDom).height} + 2rem)`;
        // }
        gsap.to(window, {
          duration: 2,
          scrollTo: {
            y: previewDom,
            offsetY: window.innerHeight / 2 - parseFloat(height) / 2,
          },
          ease: "power4.inOut",
        });
        tl.add(
          gsap.to(cloned, {
            background: "rgba(0,0,0,0)",
            duration: 0.5,
          })
        );
        tl.add(
          gsap.to(cloned, {
            height: height,
            duration: 1.5,
            y: window.innerHeight / 2 - parseFloat(height) / 2,
          })
        );
        tl.add(
          gsap.to(cloned.querySelector(".typetester-overlay"), {
            opacity: 0,
            delay: -1,
          })
        );
        const mobileUi = cloned.querySelector(".mobile-ui");
        if (mobileUi) {
          tl.add(
            gsap.to(mobileUi, {
              opacity: 0,
              delay: -2,
            })
          );
          tl.add(
            gsap.to(cloned.querySelector(".kimera-typetester"), {
              height: "100%",
              delay: -1.5,
            })
          );
          const inner = cloned.querySelector(".typetester-inner");
          // inner.style.alignSelf = "flex-start";
          // inner.style.height = "100%";
          // inner.style.transition = "transform 0.5s linear";
          // inner.style.transform = "translateY(-10%)";
          gsap.to(inner, {
            duration: 0.9,
            y: "12.5%",
            ease: "power3.inOut",
          });
        }
        tl.add(
          gsap.to(cloned, {
            opacity: 0,
            duration: 0.1,
            onComplete() {
              cloned.remove();
            },
          })
        );
      });
    },
    closeKeyup(e) {
      if (e.key === "Escape") this.close();
    },
    close() {
      gsap.fromTo(
        this.$el,
        {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            // this.setIsTypetesterOpen(false);
            this.unload();
          },
        }
      );
    },
    handleSliders(e) {
      const style = e.target.name;
      this.typetester.sliders[style].value = e.target.value;
      this.typetester.style[style] =
        this.typetester.sliders[style].value +
        (e.target.dataset.unit ? e.target.dataset.unit : "");
    },
    onInput(e) {
      console.log(this.stripHtmlTags(e.target.innerText));
      if (e.target.innerText !== this.oldText) this.showSubmit = true;
      if (this.typetester.isUserCreated) return;
      if (this.stripHtmlTags(e.target.innerText).trim() == "")
        this.showSubmit = false;
    },

    onEdit(e) {
      this.typetester.text = e.target.innerHTML;
    },
    animateFontSelection(enter = true) {
      const currenFontDom = this.$el.querySelector(".current-font");
      const fontSelectionDom = this.$el.querySelector(".font-selection");
      const state = Flip.getState(".current-font, .font-selection");
      if (enter) {
        currenFontDom.classList.add("active");
        fontSelectionDom.classList.add("active");
      } else {
        currenFontDom.classList.remove("active");
        fontSelectionDom.classList.remove("active");
      }
      this.$nextTick(() => {
        // console.log(Flip.isFlipping(".current-font, .font-selection"));

        Flip.from(state, {
          duration: 0.375,
          toggleClass: "flipping",
          ease: "power3.out",
        });
      });
    },
    animateWeightSelection(enter = true, override = false) {
      const currenWeightDom = this.$el.querySelector(".current-weight");
      const weightSelectionDom = this.$el.querySelector(".weight-selection");
      const state = Flip.getState(".current-weight, .weight-selection");
      if (enter) {
        currenWeightDom.classList.add("active");
        weightSelectionDom.classList.add("active");
      } else {
        currenWeightDom.classList.remove("active");
        weightSelectionDom.classList.remove("active");
      }
      this.$nextTick(() => {
        Flip.from(state, {
          duration: override ? 0 : 0.375,
          toggleClass: "flipping",
          ease: "power3.out",
        });
      });
    },
    unload() {
      this.setIsTypetesterOpen(false);
    },
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.closeKeyup);
    this.unload();
  },
  created() {
    window.addEventListener("beforeunload", this.unload);

    this.typetesterDefault = this.typetester;
    this.typetester = cloneDeep(
      Object.assign({}, this.typetester, this.currentTypetesterOptions)
    );
    this.typetester.sliders.fontSize.value = parseFloat(
      this.typetester.style.fontSize
    );
    this.typetester.sliders.letterSpacing.value = parseFloat(
      this.typetester.style.letterSpacing
    );
    this.typetester.sliders.lineHeight.value = parseFloat(
      this.typetester.style.lineHeight
    );
    this.oldText = this.typetester.text;
    this.typetester.style.fontFeatureSettings =
      this.$helpers.getOpenTypeFeatures(this.typetester.openTypeFeatures);
  },
  // beforeMount() {
  // },

  mounted() {
    document.addEventListener("keyup", this.closeKeyup);

    if (this.typetester.isUserCreated) {
      this.showSubmit = true;
      return;
    }
    // this.$nextTick(() => {
    setTimeout(() => {
      let fontSizeElement = this.$el.querySelector(
        ".editable-text-initial-fontsize"
      );

      console.log(getComputedStyle(fontSizeElement).fontSize);
      // this.typetester.style.fontSize = getComputedStyle(fontSizeElement).fontSize;
      this.$set(
        this.typetester.style,
        "fontSize",
        getComputedStyle(fontSizeElement).fontSize
      );
      this.$set(
        this.typetester.sliders.fontSize,
        "value",
        parseInt(getComputedStyle(fontSizeElement).fontSize)
      );
      // });
      fontSizeElement.classList.remove("editable-text-initial-fontsize");

      const oldTypetester = cloneDeep(this.typetester);
      const unwatch = this.$watch(
        "typetester",
        (typetester) => {
          console.log(
            isEqual(oldTypetester, typetester),
            oldTypetester,
            typetester,
            "oldTypetester"
          );
          if (!isEqual(oldTypetester, typetester)) {
            this.showSubmit = true;
            unwatch();
          }
        },
        {
          deep: true,
        }
      );
    }, 10);

    // this.setIsTypetesterOpen(false)
    // this.animateWeightSelection()
    // document.addEventListener("click", this.animateFontSelection)
    // console.log(this.getFontDataByName("waldenburg"));
    // const element = this.$el.querySelector('content-editable');
    // element.addEventListener('edit', (e) => {
    //   console.log(e.target.innerHTML); // the new value
    //   console.log(e.target.previousInnerHTML); // old value
    // });
  },
};
</script>

<style lang="scss">
.kimera-typetester .button-wrapper button {
  justify-content: flex-start;
  align-items: baseline;
  overflow: unset;
  transition: none;
  border: 1px solid black;
}
.kimera-typetester .button-wrapper .is-inverted button {
  border-color: var(--kimera-white);
}

.kimera-typetester .button-wrapper button.active,
.kimera-typetester .button-wrapper button:hover {
  background: var(--kimera-white);
  color: var(--black);
}
.kimera-typetester .mobile-ui {
  .font-sliders {
    align-items: flex-start;
    flex-direction: column;
    row-gap: var(--kimera-grid-gap);
    .kimera-slider {
      width: 100%;
    }
  }
  .submit-mobile {
    text-transform: uppercase;
    margin-top: var(--kimera-grid-gap);
    width: 100%;
    justify-content: center;
  }
  // transition: opacity 0.25s ease-in;
  // &.is-submitting {
  //   opacity: 0;
  // }
}
//
</style>
//
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

.font-selection {
  overflow: hidden;
}
.button-wrapper:hover .gradient-indicator {
  border-radius: 0 0 0.75em 0.75em;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1em;
  width: 100%;
  background: linear-gradient(0deg, black, transparent);
  z-index: 100;
}
.button-wrapper:hover .is-inverted.gradient-indicator {
  background: linear-gradient(0deg, var(--kimera-white), transparent);
}
.weight-selection.active {
  padding-bottom: 1em;
  border: 1px solid black;
}
.button-wrapper {
  position: relative;
}

.weight-selection {
  pointer-events: all;
  z-index: 100;
  overflow-y: auto;
  max-height: 50vh;
  overscroll-behavior: contain;
  /* Firefox */

  scrollbar-width: thin;
  scrollbar-color: var(--black) transparent;

  /* Chrome, Edge and Safari */
  &::-webkit-scrollbar {
    width: 4px;
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 4px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-track:hover {
    background-color: transparent;
  }

  &::-webkit-scrollbar-track:active {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: var(--kimera-filter-color);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--kimera-filter-color);
  }

  &::-webkit-scrollbar-thumb:active {
    background-color: var(--kimera-filter-color);
  }
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
  opacity: 0;
  height: calc(100vh);
  width: 100%;
  z-index: 100;
  padding: $typetester-margin;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  @include until($tablet) {
    // padding: 0;
  }
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
  transition: $typetester-invert-transition;
  // display: flex;
  // flex-direction: column;
  height: fit-content;
  background: var(--black);
  // border-radius: 0.7rem;
  border-radius: var(--kimera-button-border-radius);
  transition: border-radius 1s linear;
  &.is-inverted {
    background: var(--kimera-white);
    color: var(--black);
  }
  &.active {
    border-radius: 0.825rem;
  }
}
.current-fonttype {
  flex-grow: 1;
  flex-basis: 0;
}
.font-sliders {
  column-gap: 2rem;
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
}

.close {
  flex-basis: 0;
}
.kimera-typetester {
  position: relative;
  // background: var(--kimera-white);
  // cursor: default;
  opacity: 0;
  height: 100%;
  width: 100%;
  .top .close-button,
  .top .font-slider,
  .top button,
  .top input {
    pointer-events: all;
  }
  .top div:not(.button-wrapper-inner) {
    pointer-events: none;
  }
  @include until($tablet) {
    // margin: 1rem;
    height: calc(100% - 4rem);
    height: calc(100svh - 4rem);
    width: calc(100% - var(--kimera-side-padding));
  }
}

.middle {
  align-self: flex-end;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  .submit-button {
    pointer-events: all;

    // transform: rotateY(0deg);
    animation: wiggle 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    &:hover {
      animation: wiggle 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards !important;
    }
  }
  .anim-submit-button {
    height: 5rem;
    width: 5rem;
    pointer-events: all;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .inner {
      transition: transform 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6);
      transform-origin: center right;
    }
    .inner {
      transform: scale(2);
    }
  }
}
</style>
<style lang="scss" scoped>
.kimera-typetester {
  background: var(--kimera-white);
  cursor: default;
}
</style>
