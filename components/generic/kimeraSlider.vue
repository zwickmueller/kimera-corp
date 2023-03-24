<template>
  <div class="kimera-slider" :class="isInverted ? 'is-inverted' : ''">
    <label :for="name">
      {{ name }}
      {{ Number(sliderData.value).toFixed(target == "letterSpacing" ? 2 : 0)
      }}{{ unit }}</label
    >
    <!-- <input class="styled-slider" type="range" :name="target" :min="sliderData.min" :max="sliderData.max" :data-unit="unit" @input="handleSliders" :v-model="sliderData.value" step="any"> -->
    <input
      class="styled-slider"
      type="range"
      :name="target"
      :min="sliderData.min"
      :max="sliderData.max"
      :data-unit="unit"
      @input="handleSliders"
      @change="handleSliders"
      :value="sliderData.value"
      step="any"
    />
  </div>
</template>

<script>
export default {
  props: {
    sliderData: {
      type: Object,
    },
    name: {
      type: String,
    },
    target: {
      type: String,
    },
    unit: {
      type: String,
    },
    isInverted: {
      type: Boolean,
      default: false,
    },
  },
  // emits: ['update:handleSliders']
  methods: {
    handleSliders(event) {
      // console.log("EVENT FROM COMPONENT", event);
      this.$emit("input", event);
      this.$emit("handleSliders", event);
    },
  },
};
</script>

<style lang="scss" scoped>
label {
  min-width: 10em;
}
.kimera-slider {
  display: flex;
  align-items: center;
}
input {
  pointer-events: all;
}
// $typetester-invert-transition

/*generated with Input range slider CSS style generator (version 20211225)
https://toughengineer.github.io/demo/slider-styler*/
input[type="range"].styled-slider {
  height: 2.2em;
  -webkit-appearance: none;
  background: transparent;
}

/*progress support*/
input[type="range"].styled-slider.slider-progress {
  --range: calc(var(--max) - var(--min));
  --ratio: calc((var(--value) - var(--min)) / var(--range));
  --sx: calc(0.5 * 1.5em + var(--ratio) * (100% - 1.5em));
}

input[type="range"].styled-slider:focus {
  outline: none;
}

/*webkit*/
input[type="range"].styled-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 1em;
  height: 1em;
  border-radius: 2em;
  border: none;
  box-shadow: none;
  margin-top: calc(max((1.5em - 0.1875em - 0.1875em) * 0.5, 0px) - 1em * 0.5);
  background: var(--kimera-white);
  transition: background $typetester-invert-duration ease;
}
.is-inverted input[type="range"].styled-slider::-moz-range-thumb {
  background: var(--black);
}
.is-inverted input[type="range"].styled-slider::-ms-thumb {
  background: var(--black);
}
.is-inverted input[type="range"].styled-slider::-webkit-slider-thumb {
  background: var(--black);
}
.is-inverted input[type="range"].styled-slider::-moz-range-track {
  border: 0.1875em solid var(--kimera-white);
  background: var(--kimera-white);
}
.is-inverted input[type="range"].styled-slider::-ms-track {
  border: 0.1875em solid var(--kimera-white);
  background: var(--kimera-white);
}
.is-inverted input[type="range"].styled-slider::-webkit-slider-runnable-track {
  border: 0.1875em solid var(--kimera-white);
  background: var(--kimera-white);
}

input[type="range"].styled-slider::-webkit-slider-runnable-track {
  height: 1.5em;
  border-radius: 1em;
  background: var(--black);
  box-shadow: none;
  border: 0.1875em solid var(--black);
  transition: background $typetester-invert-duration ease,
    border $typetester-invert-duration ease;
}

input[type="range"].styled-slider.slider-progress::-webkit-slider-runnable-track {
  background: linear-gradient(#000000, #000000) 0 / var(--sx) 100% no-repeat,
    #000000;
}

/*mozilla*/
input[type="range"].styled-slider::-moz-range-thumb {
  width: 1em;
  height: 1em;
  border-radius: 2em;
  background: var(--kimera-white);
  transition: background $typetester-invert-duration ease;
  border: none;
  box-shadow: none;
}

input[type="range"].styled-slider::-moz-range-track {
  height: max(calc(1.5em - 0.1875em - 0.1875em), 0px);
  // border: 0.1875em solid #000000;
  border-radius: 1em;
  // background: #000000;
  box-shadow: none;
  border: 0.1875em solid var(--black);
  transition: background $typetester-invert-duration ease,
    border $typetester-invert-duration ease;
}

input[type="range"].styled-slider.slider-progress::-moz-range-track {
  background: linear-gradient(#000000, #000000) 0 / var(--sx) 100% no-repeat,
    #000000;
}

/*ms*/
input[type="range"].styled-slider::-ms-fill-upper {
  background: transparent;
  border-color: transparent;
}

input[type="range"].styled-slider::-ms-fill-lower {
  background: transparent;
  border-color: transparent;
}

input[type="range"].styled-slider::-ms-thumb {
  width: 1em;
  height: 1em;
  border-radius: 2em;
  background: var(--kimera-white);
  transition: background $typetester-invert-duration ease;
  border: none;
  box-shadow: none;
  margin-top: 0;
  box-sizing: border-box;
}

input[type="range"].styled-slider::-ms-track {
  height: 1.5em;
  border-radius: 1em;
  // background: #000000;
  // border: 0.1875em solid #000000;
  box-shadow: none;
  box-sizing: border-box;
  border: 0.1875em solid var(--black);
  transition: background $typetester-invert-duration ease,
    border $typetester-invert-duration ease;
}

input[type="range"].styled-slider.slider-progress::-ms-fill-lower {
  height: max(calc(1.5em - 0.1875em - 0.1875em), 0px);
  border-radius: 1em 0 0 1em;
  margin: -0.1875em 0 -0.1875em -0.1875em;
  background: #000000;
  border: 0.1875em solid #000000;
  border-right-width: 0;
}
</style>
