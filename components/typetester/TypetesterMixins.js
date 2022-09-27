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
        `grid-width-${this.width}`,
        {
          'is-inverted': this.typetester.invertColors
        },
        { 'is-preview': this.isPreview }
      ]
    }
  },
  methods: {
    ...mapMutations({
      setIsTypetesterOpen: 'typetester/setIsTypetesterOpen',
      setCurrentTypetesterOptions: 'typetester/setCurrentTypetesterOptions',
      updateCustomTypetestValue: 'typetester/updateCustomTypetestValue',
    }),
    getReadableFontWeight(name, weight) {
      return this.getFontWeightAsReadable(name, weight)
    },
    handleInvertColors(e) {
      console.log("a");
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
      this.typetester.invertColors = !this.typetester.invertColors
    },
    async loadFont(fontData, name, fontDir) {
      const {
        weight,
        path
      } = fontData
      //'url(fonts/junction-regular.woff)'
      const fontToLoad = new FontFace(name, `url(${fontDir + path + '.woff'})`, {
        weight: String(weight),
        display: 'block'
      });

      console.log(fontToLoad);
      for (var fontFace of document.fonts.values()) {
        if (fontFace.family.toLowerCase() == name.toLowerCase() && fontFace.weight == weight && fontFace.loaded) {
          console.log(`FONT ${name} with weight ${weight} was already loaded`);
          return
        }
      }
      let el = this.$el.querySelector('.typetester-inner')
      el.style.opacity = 0
      console.log(el);
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
      this.showCloseButton = (e.toElement.classList.contains("close-button") || (x > 0.8 && y < 0.4))
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