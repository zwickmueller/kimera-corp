<template>
<div class="kimera-variable-typetester kimera-typetester" :class="invertColors ? 'is-inverted' :''">
  <div class="typetester-overlay">
    <div class="top">
      <div class="font-sliders kimera-text-filter">
        <!-- <kimera-slider :key="blok.sliders[0].target" :isInverted="false" :slider-data="getSliderData(blok.sliders[0])" :target="blok.sliders[0].target" :name="blok.sliders[0].name" :unit="''" @handleSliders="handleSliders"></kimera-slider> -->
        <kimera-slider :key="slider.target" v-for="slider in sliders" :isInverted="false" :slider-data="slider" :target="slider.target" :name="slider.name" :unit="''" @handleSliders="handleSliders" @input.native="test"></kimera-slider>



      </div>
    </div>
    <div class="bottom">
      <div class="timestamp">
        <!-- <span>{{typetester.timestamp}}</span> -->
      </div>
      <div class="toggle">
        <dark-mode-toggle @click.native="handleInvertColors" :invert="invertColors"></dark-mode-toggle>
        <!-- <input type="checkbox" @input="handleInvertColors" name="" :checked="typetester.invertColors"> -->
      </div>
      <div class="spacer">

      </div>
    </div>
  </div>

  <div class="typetester-inner center-all">
    <content-editable @click="stopAnim" ref="editableContent" multiline spellcheck="false" class="editable-text anim" :style="getStyle" @input="onInput" v-on:edit="onEdit" contenteditable="true" v-html="blok.text">

    </content-editable>
    <!-- {{getStyle}} -->
  </div>
</div>
</template>

<script>
// import BigText from 'big-text.js';

export default {
  data() {
    return {
      variableData: {},
      sliders: {},
      hasChanged: false,
      originalFontSize: this.blok.fontSize + 'px',
      newFontSize: this.blok.fontSize + 'px',
      invertColors: false,
      animInterval: null
    }
  },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  computed: {
    getStyle() {
      const keys = Object.keys(this.variableData)
      let string = ""
      keys.forEach(key => {
        string += `"${key}" ${this.variableData[key]},`
      })
      return {
        fontVariationSettings: `${string.slice(0, -1)}`,
        fontFamily: this.blok.fontData.selectedFontFamily + ' Variable',
        fontSize: this.hasChanged ? this.newFontSize : this.originalFontSize,
        lineHeight: 0.9,
        fontFeatureSettings: this.$helpers.getOpenTypeFeatures(this.blok.fontData)
      }

      // `font-variation-settings: ${string.slice(0, -1)}`
    }
  },
  methods: {
    handleInvertColors() {
      this.invertColors = !this.invertColors
    },
    onEdit(e) {
      console.log("edit", e);
    },
    stopAnim() {
      window.clearInterval(this.animInterval)
      this.$refs.editableContent.classList.remove('anim')
    },
    onInput(e) {
      this.hasChanged = true
      // console.log("input", e);
      // console.log(e.target.innerHTML.length);
      // this.newFontSize = this.$helpers.clampNumber(1 / e.target.innerHTML.length * 1000, 150, 350) + 'px'
      // BigText(this.$refs.editableContent);
      this.newFontSize = this.$helpers.clampNumber(1 / (e.target.innerHTML.trim()
        .length + 1) * 100, 7, 25) + "vw"

    },
    test(e) {
      this.sliders[e.target.name].value = e.target.value
      // console.log(e, e.target.name);
    },
    getSliderData(slider) {
      return {
        min: slider.min,
        max: slider.max,
        value: slider.value
      }
    },
    handleSliders(e) {
      const target = e.target.name
      const value = e.target.value
      this.variableData[target] = value
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
    }
  },
  mounted() {
    for (var i = 0; i < this.blok.sliders.length; i++) {
      // this.variableData[this.blok.sliders[i].target] = this.blok.sliders[i].value
      this.$set(this.variableData, this.blok.sliders[i].target, this.blok.sliders[i].value)
      this.$set(this.sliders, this.blok.sliders[i].target, this.blok.sliders[i])
    }
    let fontData = this.blok.fontData.fontData
    let variableFont = fontData.filter(el => el.name == this.blok.fontData.selectedFontFamily)

    if (variableFont[0] && variableFont[0].variable) {
      let variableFontPath = variableFont[0].variable

      this.$helpers.loadVariableFont(this.blok.fontData.selectedFontFamily, variableFontPath)
      console.log("has variable font", variableFontPath);
    } else {
      console.error(variableFont, " has no Variable Font assigned")
    }

    const randomizeText = () => {
      let randomWeight = this.$helpers.getRandomNumber(100, 900);
      let randomWidth = this.$helpers.getRandomNumber(50, 200);
      // myText.style.fontVariationSettings = "\"wght\" " + randomWeight + ", \"wdth\" " + randomWidth;
      // console.log(this.sliders);
      this.sliders.wdth.value = randomWidth
      this.sliders.wght.value = randomWeight
      this.variableData.wdth = randomWidth
      this.variableData.wght = randomWeight
    }

    this.animInterval = setInterval(randomizeText, 2000);
  }
}
</script>

<style lang="scss" >
.kimera-variable-typetester {
    overflow: auto !important;
    .anim {
        transition: font-variation-settings 2s ease;
    }
    margin: 0 var(--kimera-side-padding);
    height: 75vh;
    max-height: 75vh;
    max-width: 100vw;
    .font-sliders {
        display: flex;
    }
    .typetester-overlay .top {
        justify-content: flex-end;
    }
    .typetester-inner {
        overflow: hidden;
        max-width: 100vw;
        min-height: inherit;
        max-height: 75vh;
        content-editable {
            display: inline;
            // min-height: inherit;
            // max-height: 75vh;
            // width: 100%;
            // max-width: 100vw;
            width: 100vw;
            text-align: center;
            //
            // height: 100%;
        }
    }
}
</style>
