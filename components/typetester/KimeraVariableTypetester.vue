<template>
  <div
    class="kimera-variable-typetester kimera-typetester"
    :class="invertColors ? 'is-inverted' : ''"
  >
    <div class="typetester-overlay">
      <div class="top">
        <div class="heading" :class="invertColors ? 'is-inverted' : ''">
          <h3 id="variable" class="kimera-text-filter-tags">variable</h3>
        </div>
        <div class="font-sliders kimera-text-filter">
          <!-- <kimera-slider :key="blok.sliders[0].target" :isInverted="false" :slider-data="getSliderData(blok.sliders[0])" :target="blok.sliders[0].target" :name="blok.sliders[0].name" :unit="''" @handleSliders="handleSliders"></kimera-slider> -->
          <kimera-slider
            @click.native.once="stopAnim"
            :key="slider.target"
            v-for="slider in sliders"
            :isInverted="false"
            :slider-data="slider"
            :target="slider.target"
            :name="slider.name"
            :unit="''"
            @handleSliders="handleSliders"
            @input.native="test"
          ></kimera-slider>
        </div>
      </div>
      <div class="bottom">
        <div class="timestamp">
          <!-- <span>{{typetester.timestamp}}</span> -->
        </div>
        <div class="toggle">
          <dark-mode-toggle
            @click.native="handleInvertColors"
            :invert="invertColors"
          ></dark-mode-toggle>
          <!-- <input type="checkbox" @input="handleInvertColors" name="" :checked="typetester.invertColors"> -->
        </div>
        <div class="spacer"></div>
      </div>
    </div>

    <div class="typetester-outer">
      <div class="typetester-inner center-all variable-typetester-inner">
        <content-editable
          @click="stopAnim"
          ref="editableContent"
          multiline
          spellcheck="false"
          class="editable-text anim"
          :style="getStyle"
          @input="onInput"
          v-on:edit="onEdit"
          contenteditable="true"
          v-html="blok.text"
        >
        </content-editable>
      </div>
      <!-- {{getStyle}} -->
    </div>
  </div>
</template>

<script>
// import BigText from 'big-text.js';
// import fitty from "fitty";
import fitty from "../../static/js/fitty";

export default {
  data() {
    return {
      variableData: {},
      sliders: {},
      hasChanged: false,
      originalFontSize: this.blok.fontSize + "px",
      newFontSize: this.blok.fontSize + "px",
      invertColors: true,
      animInterval: null,
      fitter: null,
      stoppedAnim: false,
    };
  },
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getStyle() {
      const keys = Object.keys(this.variableData);
      let string = "";
      keys.forEach((key) => {
        string += `"${key}" ${this.variableData[key]},`;
      });
      return {
        fontVariationSettings: `${string.slice(0, -1)}`,
        fontFamily: this.blok.fontData.selectedFontFamily + " Variable",
        fontSize: this.hasChanged ? this.newFontSize : this.originalFontSize,
        lineHeight: 0.9,
        fontFeatureSettings: this.$helpers.getOpenTypeFeatures(
          this.blok.fontData
        ),
      };

      // `font-variation-settings: ${string.slice(0, -1)}`
    },
  },
  methods: {
    handleInvertColors() {
      this.invertColors = !this.invertColors;
    },
    onEdit(e) {
      console.log("edit", e);
    },
    stopAnim() {
      if (!this.stoppedAnim) {
        window.clearInterval(this.animInterval);
        this.$refs.editableContent.classList.remove("anim");
        this.stoppedAnim = true;
      }
    },
    onInput(e) {
      this.hasChanged = true;
      // console.log("input", e);
      // console.log(e.target.innerHTML.length);
      // this.newFontSize = this.$helpers.clampNumber(1 / e.target.innerHTML.length * 1000, 150, 350) + 'px'
      // BigText(this.$refs.editableContent);
      // this.newFontSize =
      //   this.$helpers.clampNumber(
      //     (1 / (e.target.innerHTML.trim().length + 1)) * 100,
      //     7,
      //     25
      //   ) + "vw";
      this.$nextTick(() => {
        // const fitter = new this.$helpers.fitText(this.$refs.editableContent);
        // fitter.recalc();
        // console.log(fitter);
      });
      this.fitter.fit();
    },
    test(e) {
      this.sliders[e.target.name].value = e.target.value;
      // console.log(e, e.target.name);
    },
    getSliderData(slider) {
      return {
        min: slider.min,
        max: slider.max,
        value: slider.value,
      };
    },
    handleSliders(e) {
      this.stopAnim();
      const target = e.target.name;
      const value = e.target.value;
      this.variableData[target] = value;
      fitty.fitAll();
      // console.log(e.target.value);
      // console.log(e.target.name);
      // console.log(this.variableData);

      // const keys = Object.keys(this.variableData)
      // let string = ""
      // keys.forEach(key => {
      //   // console.log(`${key} -> ${birds[key]}`)
      //   string += `"${key}" ${this.variableData[key]},`
      // })
      // console.log(string);
      // this.test = `font-variation-settings: ${string.slice(0, -1)}`
    },
  },
  mounted() {
    // console.log(this.fitter);
    for (var i = 0; i < this.blok.sliders.length; i++) {
      // this.variableData[this.blok.sliders[i].target] = this.blok.sliders[i].value
      this.$set(
        this.variableData,
        this.blok.sliders[i].target,
        this.blok.sliders[i].value
      );
      this.$set(
        this.sliders,
        this.blok.sliders[i].target,
        this.blok.sliders[i]
      );
    }
    let fontData = this.blok.fontData.fontData;
    let variableFont = fontData.filter(
      (el) => el.name == this.blok.fontData.selectedFontFamily
    );

    if (variableFont[0] && variableFont[0].variable) {
      let variableFontPath = variableFont[0].variable;

      this.$helpers.loadVariableFont(
        this.blok.fontData.selectedFontFamily,
        variableFontPath
      );
      console.log("has variable font", variableFontPath);
    } else {
      console.error(variableFont, " has no Variable Font assigned");
    }

    const randomizeText = () => {
      let randomWeight = this.$helpers.getRandomNumber(100, 900);
      let randomWidth = this.$helpers.getRandomNumber(50, 200);

      this.sliders.wdth.value = randomWidth;
      this.sliders.wght.value = randomWeight;
      this.variableData.wdth = randomWidth;
      this.variableData.wght = randomWeight;
      fitty.fitAll();
    };

    this.animInterval = setInterval(randomizeText, 2000);
    setTimeout(() => {
      const editableContent = this.$refs.editableContent;
      let max = window.getComputedStyle(
        this.$refs.editableContent.parentNode
      ).fontSize;
      console.log(parseFloat(max));
      this.fitter = fitty(editableContent, {
        maxSize: parseFloat(max),
      });
      this.fitter.fit();
    }, 0);
  },
};
</script>

<style lang="scss">
.kimera-variable-typetester {
  overflow: auto !important;
  background: var(--kimera-white);
  margin: 0; // var(--kimera-side-padding);
  // margin: -1.65em 0 0; // var(--kimera-side-padding);
  height: 75vh;
  max-height: 75vh;
  max-width: 100vw;
  // z-index: -1;
  border-radius: 0;
  @include until($tablet) {
    margin-top: calc(-1 * var(--kimera-grid-gap));
    margin-bottom: calc(-1 * var(--kimera-grid-gap));
  }
  .anim {
    transition: font-variation-settings 1.5s cubic-bezier(0.87, 0, 0.13, 1);
  }
  .heading {
    position: absolute;
    align-self: center;
    width: 100%;
    display: flex;
    transition: $typetester-invert-transition;
    z-index: 1;

    margin-right: calc(#{var(-–kimera-side-padding)} * -1 - 0.25em);
    // margin-right: calc(var(--kimera-side-padding) * -1 - 0.25em);
    justify-content: center;
    &.is-inverted {
      color: var(--kimera-white);
    }
  }
  .font-sliders {
    display: flex;
    margin-top: calc(var(--kimera-grid-gap) / 2);
    gap: 2rem;
    padding-right: var(--kimera-side-padding);
    @include until($tablet) {
      flex-direction: column;
      width: 100%;
      align-items: center;
      gap: 1rem;
      padding-top: 2rem;
      bottom: 1rem;
      position: absolute;
      .kimera-slider {
        width: calc(100% - var(--kimera-side-padding) * 2);
      }
    }
  }
  .typetester-overlay {
    padding-top: 0;
    .top {
      position: relative;
      justify-content: flex-end;
      @include until($tablet) {
        display: block;
        position: relative;
        height: 100%;
      }
      // padding-right: var(--kimera-side-padding);
    }
  }
  .typetester-outer {
    padding: 5rem;
    height: 100%;
    @include until($tablet) {
      padding: 2rem;
    }
  }
  .typetester-overlay .bottom {
    @include until($tablet) {
      display: none;
    }
  }
  .typetester-inner {
    overflow: hidden;
    max-width: 100vw;
    min-height: inherit;
    max-height: 75vh;
    // padding: 3rem;
    padding: 0rem;
    content-editable {
      // display: inline;
      // min-height: inherit;
      // max-height: 75vh;
      // width: 100%;
      // max-width: 100vw;
      // width: 100vw;
      // width: 100%;
      display: inline-block;
      white-space: nowrap;
      text-align: center;
      //
      // height: 100%;
    }
  }
}
</style>
