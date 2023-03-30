<template>
  <div class="kimera-slider" :class="isInverted ? 'is-inverted' : ''">
    <label :for="name">
      <span class="label-name">{{ name }} </span>
      <span class="label-unit"
        >{{ Number(sliderData.value).toFixed(target == "letterSpacing" ? 2 : 0)
        }}{{ unit }}</span
      ></label
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
  // min-width: 10em;
  display: flex;
  width: 100%;
  span.label-name {
    text-align: left;
    width: 100%;
    flex: 1;
    // flex-direction: row;
  }
  span.label-unit {
    text-align: right;
    width: 100%;
    padding-left: 0.5rem;
    flex: 1;
    // min-width: 3rem;
    // display: flex;
    // padding: 0.1rem;
    // flex-direction: row;
  }
  @include until($tablet) {
    padding-top: var(--kimera-small-gap);
  }
}
.kimera-slider {
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  min-width: 16rem;
}
input {
  pointer-events: all;
}
// $typetester-invert-transition

/*generated with Input range slider CSS style generator (version 20211225)
https://toughengineer.github.io/demo/slider-styler*/
input[type="range"].styled-slider {
  // height: 2.2em;
  height: 1rem;
  margin-bottom: 0.2rem;
  -webkit-appearance: none;
  width: 100%;

  background: transparent;

  @include until($tablet) {
    height: 1rem;
  }
}

/*progress support*/
input[type="range"].styled-slider.slider-progress {
  --range: calc(var(--max) - var(--min));
  --ratio: calc((var(--value) - var(--min)) / var(--range));
  --sx: calc(0.5 * 1.5rem + var(--ratio) * (100% - 1.5rem));
}

input[type="range"].styled-slider:focus {
  outline: none;
}

/*webkit*/
input[type="range"].styled-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 2rem;
  border: none;
  box-shadow: none;
  // margin-top: calc(
  //   max((1.5rem - 0.1875rem - 0.1875rem) * 0.5, 0px) - 1rem * 0.5
  // );
  margin-top: calc(calc(max(0.425rem, 0px) - 0.5rem));
  cursor: drag;
  z-index: 1;
  pointer-events: all;
  // margin-top: 0;
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
  border: 0.1875rem solid var(--kimera-white);
  background: var(--kimera-white);
}
.is-inverted input[type="range"].styled-slider::-ms-track {
  border: 0.1875rem solid var(--kimera-white);
  background: var(--kimera-white);
}
.is-inverted input[type="range"].styled-slider::-webkit-slider-runnable-track {
  border: 0.1875rem solid var(--kimera-white);
  background: var(--kimera-white);
}

input[type="range"].styled-slider::-webkit-slider-runnable-track {
  cursor: pointer;

  height: 0.9rem;
  border-radius: 1rem;
  background: var(--black);
  box-shadow: none;
  border: 0.1875rem solid var(--black);
  transition: background $typetester-invert-duration ease,
    border $typetester-invert-duration ease;
}

input[type="range"].styled-slider.slider-progress::-webkit-slider-runnable-track {
  background: linear-gradient(#000000, #000000) 0 / var(--sx) 100% no-repeat,
    #000000;
}

/*mozilla*/
input[type="range"].styled-slider::-moz-range-thumb {
  width: 1rem;
  height: 1rem;
  border-radius: 2rem;
  background: var(--kimera-white);
  transition: background $typetester-invert-duration ease;
  border: none;
  box-shadow: none;
}

input[type="range"].styled-slider::-moz-range-track {
  height: max(calc(1.5rem - 0.1875rem - 0.1875rem), 0px);
  // border: 0.1875em solid #000000;
  border-radius: 1rem;
  background: #000000;
  box-shadow: none;
  border: 0.1875rem solid var(--black);
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
  width: 1rem;
  height: 1rem;
  border-radius: 2rem;
  background: var(--kimera-white);
  transition: background $typetester-invert-duration ease;
  border: none;
  box-shadow: none;
  margin-top: 0;
  box-sizing: border-box;
}

input[type="range"].styled-slider::-ms-track {
  height: 1.5rem;
  border-radius: 1rem;
  // background: #000000;
  // border: 0.1875em solid #000000;
  box-shadow: none;
  box-sizing: border-box;
  border: 0.1875rem solid var(--black);
  transition: background $typetester-invert-duration ease,
    border $typetester-invert-duration ease;
}

input[type="range"].styled-slider.slider-progress::-ms-fill-lower {
  height: max(calc(1.5rem - 0.1875rem - 0.1875rem), 0px);
  border-radius: 1rem 0 0 1rem;
  margin: -0.1875rem 0 -0.1875rem -0.1875rem;
  background: #000000;
  border: 0.1875rem solid #000000;
  border-right-width: 0;
}
</style>
