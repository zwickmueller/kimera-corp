<template>
<div class="kimera-glyph-wrapper" :class="invertColors ? 'invert-colors' : ''">
  <div class="glyph-map-container">
    <div class="glyph-map">
      <div class="glyph-map-inner">
        <!-- <div class="relative"> -->
        <!-- <div class="" v-for="(name, technicalName) in glyphmapData">
          {{data}} {{i}}
        </div> -->
        <!-- <h3 class="kimera-text-filter-tags">glyph map</h3> -->
        <div class="glyph-indicator" :style="getGlyphmapData(technicalName).style" v-for="(name, technicalName) in glyphmapData">
          <h3 class="kimera-text-filter-tags">{{name}}</h3>
          <h3 class="kimera-text-filter-tags">{{getGlyphmapData(technicalName).valueReadable}}</h3>
        </div>
        <!-- <div class="glyph-indicator" :style="getGlyphmapData('capHeight').style">
          <h3 class="kimera-text-filter-tags">cap height</h3>
          <h3 class="kimera-text-filter-tags">{{getGlyphmapData('capHeight').valueReadable}}</h3>
        </div>
        <div class="glyph-indicator" :style="getGlyphmapData('xHeight').style">
          <h3 class="kimera-text-filter-tags">x-height</h3>
          <h3 class="kimera-text-filter-tags">{{getGlyphmapData('xHeight').valueReadable}}</h3>
        </div>
        <div class="glyph-indicator" style="top: calc(67.8vh - 1.5em)">
          <h3 class="kimera-text-filter-tags">Baseline</h3>
          <h3 class="kimera-text-filter-tags">900</h3>
        </div>
        <div class="glyph-indicator" style="top: calc(80.3vh - 1.5em)">
          <h3 class="kimera-text-filter-tags">Descender</h3>
          <h3 class="kimera-text-filter-tags">900</h3>
        </div> -->
        <div class="color-toggle">
          <dark-mode-toggle @click.native="handleInvertColors" :invert="invertColors"></dark-mode-toggle>
        </div>
        <!-- </div> -->
      </div>
      <!-- <transition name="fade" mode="out-in"> -->
      <span :style="style" :key="currentGlyph">{{currentGlyph}}</span>
      <!-- </transition> -->
    </div>
  </div>
  <div class="kimera-glyph-set-wrapper">

    <component :invertedColors="invertColors" :key="blok._uid" :style="style" v-for="blok in blok.body" :blok="blok" :is="blok.component" />
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      currentGlyph: 'A',
      selectedFontData: null,
      invertColors: false,
      glyphmapData: {
        'xHeight': 'x-height',
        'ascender': 'ascender',
        'baseline': 'baseline',
        'descender': 'descender',
        'capHeight': 'cap height'
      }
    }
  },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  computed: {
    // renderKey() {
    //   if (!this.blok) return ''
    //   if (!this.blok.font) return ''
    //   return this.blok.font.selectedFontData
    // },

    glyphListAsArray() {
      return this.blok.glyphList.split(" ")
    },
    style() {
      if (!this.selectedFontData) return
      // this.selectedFontData = JSON.parse(this.blok.font.selectedFontData)
      return {
        fontFamily: this.blok.font.selectedFontFamily,
        fontWeight: this.selectedFontData.weight,
        fontStretch: this.selectedFontData.fontStretch,
        fontStyle: this.selectedFontData.fontStyle,

      }
    }
  },
  methods: {
    getGlyphmapData(name) {
      const value = this.blok[name]
      const valueReadable = this.blok[name + 'Readable']
      return {
        style: value ? `top: calc(${value}vh - 0.75em)` : 'top: 0',
        valueReadable: valueReadable ? valueReadable : '900'
      }
    },
    handleInvertColors() {
      this.invertColors = !this.invertColors
    }
  },
  mounted() {
    this.selectedFontData = JSON.parse(this.blok.font.selectedFontData)
    this.$helpers.loadFont(this.selectedFontData, this.blok.font.selectedFontFamily)
    this.$root.$on('setCurrrentGlyph', payload => this.currentGlyph = payload)
  }
}
</script>

<style lang="scss" scoped>
.kimera-glyph-wrapper {
    display: flex;
    grid-gap: calc(var(--kimera-grid-gap) / 2);
    padding: var(--kimera-side-padding);
    .kimera-glyph-set + .kimera-glyph-set {
        padding-top: calc(var(--kimera-grid-gap));

    }
}
.kimera-glyph-set-wrapper {
    // flex: 1;
    // max-width: calc(50% - (var(--kimera-grid-gap) / 2));
    // width: 100%;
    width: 50%;
    flex-grow: 1;
    background: var(--kimera-white);
    padding: var(--kimera-grid-row-gap);
    border-radius: calc(var(--kimera-border-radius) / 2);
}
.invert-colors {
    .glyph-map-container .glyph-map {
        transition: all 0.1s ease;
        color: var(--kimera-white);
        background: var(--black);
        .glyph-map-inner .glyph-indicator {
            border-top: 1px solid var(--kimera-white);
        }
    }
    .kimera-glyph-set-wrapper {
        transition: all 0.1s ease;
        background: var(--black);
        // h3 {
        color: var(--kimera-white);
        // }
    }
}
.glyph-map-container {
    .color-toggle {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 1em;
    }
    // width: calc(100vw - 1024px - 25vw - 1.5em);
    // height: calc(100% - 4em);
    // position: absolute;
    // top: 2.4em;
    // right: 1em;
    // display: flex;
    // margin: 0;
    // width: 100%;
    flex-grow: 1;
    width: 50%;
    // padding-left: 1.5em;
    order: 1;
    // flex: 1;
    .glyph-map {
        width: 100%;
        height: calc(100vh - (var(--kimera-grid-gap) / 1));
        // height: calc(100vh - 2em);
        display: flex;
        // top: 1em;
        top: calc(var(--kimera-grid-gap) / 2);
        justify-content: center;
        align-items: center;
        background: var(--kimera-white);
        position: sticky;
        border-radius: calc(var(--kimera-border-radius) / 2);
        .glyph-map-inner {
            position: absolute;
            height: 100%;
            top: 0.5em;
            left: 0.5em;
            width: calc(100% - 1em);
            .glyph-indicator {
                border-top: 1px solid black;
                display: flex;
                justify-content: space-between;
                position: absolute;
                width: 100%;
                h3 {
                    padding-top: var(--kimera-small-gap);
                }
            }
        }
        span {
            // transform: scale(20);
            font-size: 20rem;
            // font-size: 20rem;
            font-size: 50vh;
        }
        @supports not (aspect-ratio: 1 / 1) {

            &::before {
                float: left;
                padding-top: 100%;
                content: "";
            }

            &::after {
                display: block;
                content: "";
                clear: both;
            }
        }
    }
}
</style>
