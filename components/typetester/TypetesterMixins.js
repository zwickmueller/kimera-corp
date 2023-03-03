const throttle = require('lodash.throttle');

import { mapMutations, mapGetters } from 'vuex'

const TypetesterMixin = {
  data() {
    return {
      showCloseButton: false,
      isPreview: true,
      // typetester: {
      //
      // }
    }
  },
  computed: {
    ...mapGetters({
      getCustomTypetestByTimestamp: 'typetester/getCustomTypetestByTimestamp',
      getFontWeightAsReadable: 'fontData/getFontWeightAsReadable'
    }),
    getStyle() {
      return {
        ...this.typetester.style
      }
    },
    isTypetesterOpen() {
      return this.$store.state.typetester.isTypetesterOpen
    },


    getClasses() {
      return [
        // `grid-width-${this.typetester.width}`,
        {
          'is-inverted': this.typetester.invertColors
        },
        { 'is-preview': this.isPreview },
        { 'is-user-created': this.typetester.isUserCreated },
      ]
    }
  },
  methods: {
    ...mapMutations({
      setIsTypetesterOpen: 'typetester/setIsTypetesterOpen',
      setCurrentTypetesterOptions: 'typetester/setCurrentTypetesterOptions',
      updateCustomTypetestValue: 'typetester/updateCustomTypetestValue',
    }),
    getReadableFontWeight(style) {
      return this.getFontWeightAsReadable(style)
    },
    handleInvertColors(e) {
      // console.log("a");
      if (this.typetester.isUserCreated && this.isPreview) {
        // let a = this.getCustomTypetestByTimestamp(this.$route.fullPath, this.typetester.timestamp)
        // console.log(a);
        // console.log(this.$route.fullPath, this.typetester.timestamp, "invertColors", true);
        // a.invertColors = true
        this.updateCustomTypetestValue({
          path: this.$route.fullPath,
          timestamp: this.typetester.timestamp,
          key: "invertColors",
          value: !this.typetester.invertColors
        })
        return
      }
      // const a = !this.typetester.invertColors
      // this.typetester = Object.assign({}, this.typetester, { invertColors: a })
      // Object.assign({}, this.typetesterData, { invertColors: a })
      //
      this.typetester.invertColors = !this.typetester.invertColors
      // this.typetesterData.invertColors = !this.typetesterData.invertColors
      //
      //
      // console.log(this.typetesterData);
      // console.log(this.$el);
      // this.$el.classList.toggle('is-inverted')
    },
    async loadFont(fontData, name, fontDir) {
      const {
        weight,
        path,
        fontStretch,
        fontStyle
      } = fontData
      // console.log(fontDir);
      const fontToLoad = new FontFace(name, `url(${fontDir + path + '.woff'})`, {
        weight: String(weight),
        stretch: String(fontStretch),
        style: String(fontStyle),
        display: 'block'
      });

      // for (var fontFace of document.fonts.values()) {
      //   if (fontFace.family.toLowerCase() == name.toLowerCase() && fontFace.weight == weight && fontFace.style == fontStyle && fontFace.stretch == fontStretch && fontFace.loaded) {
      //     console.log(`FONT ${name} with weight ${weight} was already loaded`);
      //     return
      //   }
      // }
      for (var fontFace of Array.from(document.fonts)) {
  if (fontFace.family.toLowerCase() == name.toLowerCase() && fontFace.weight == weight && fontFace.style == fontStyle && fontFace.stretch == fontStretch && fontFace.loaded) {
    // console.log(`FONT ${name} with weight ${weight} was already loaded`);
    return
  }
}
      let el = this.$el.querySelector('.typetester-inner')
      el.style.opacity = 0
      // console.log(el);
      await fontToLoad.load()
        .then(function(loadedFont) {
          el.style.opacity = 1
          document.fonts.add(loadedFont);
          // document.body.style.fontFamily = '"Junction Regular", Arial';
        })
        .catch(function(error) {
          el.style.opacity = 1
          // error occurred
        });
    },

    handleMouseMove: throttle(function(e) {
      var rect = e.target.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width;
      var y = (e.clientY - rect.top) / rect.height;
      this.showCloseButton = (e.target.classList.contains("close-button") || (x > 0.8 && y < 0.4))
    }, 100)
  }
}

// document.fonts.ready.then(function() {
//   console.log('There are', document.fonts.size, 'FontFaces loaded.\n');
//
//   // document.fonts has a Set-like interface. Here, we're iterating over its values.
//   for (var fontFace of document.fonts.values()) {
//     console.log('FontFace:');
//     for (var property in fontFace) {
//       console.log('  ' + property + ': ' + fontFace[property]);
//     }
//     console.log('\n');
//   }
// });

export default TypetesterMixin