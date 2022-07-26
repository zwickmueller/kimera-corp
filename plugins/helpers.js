import Vue from 'vue'

export default ({ app, store }, inject) => {
  inject("helpers", new Vue({
    methods: {
      transformImage(image, option) {
        if (!image) return "";
        if (!option) return "";
        var imageService = '//a.storyblok.com'
        var path = image.replace('https:', '')
        return image + '/m/' + option
      },
      getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
      },
      getRandomIntInRange(min, max, include = false) {
        if (include) return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min)
        else return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + min)
      },
      clampNumber(value, lower, upper) {
        return Math.min(upper, Math.max(lower, value));
      },
      getDistance(xA, yA, xB, yB) {
        let xDiff = xA - xB;
        let yDiff = yA - yB;
        return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
      },
      mapRange(value, x1, y1, x2, y2) {
        return (value - x1) * (y2 - x2) / (y1 - x1) + x2
      },
      getRandomColor(alpha = 1) {
        let o = Math.round
        let r = Math.random
        let s = 255
        return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + alpha + ')';
      },
      getDomDimensions(element) {
        const {
          width,
          height,
          left,
          top
        } = element.getBoundingClientRect()

        return {
          width: width,
          height: height,
          left: left,
          top: top
        }
      },
      getDomCenter(element) {
        // console.log(element);
        const dimensions = getDomDimensions(element)
        const centerY = dimensions.height - dimensions.top / 2
        const centerX = dimensions.width - dimensions.left / 2

        return {
          x: centerX,
          y: centerY
        }
      },
      getEmValue() {
        return parseFloat(getComputedStyle(document.querySelector('html')).fontSize)
      },
      normalizeString(string) {
        return string.toLowerCase().trim().replace(' ', '-')
      },
      removeClassByPrefix(node, prefix) {
        var regx = new RegExp('\\b' + prefix + '[^ ]*[ ]?\\b', 'g');
        node.className = node.className.replace(regx, '');
        return node;
      },
      isMobile(breakpoint = 769) {
        if (navigator.userAgent.match(/Mobi/)) {
          return true;
        }
        if ('screen' in window && window.screen.width < breakpoint) {
          return true;
        }
        var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection && connection.type === 'cellular') {
          return true;
        }
        if (window.innerWidth <= breakpoint) {
          return true
        }
        return false;
      },
      getOpenTypeFeatures(object) {
        let openTypeFeatures = object.selectedOpenTypeFeatures
        // console.log(openTypeFeatures);
        if (openTypeFeatures && openTypeFeatures.length > 0) {
          let values = openTypeFeatures.map(el => el.value)
          openTypeFeatures = "'" + values.join("', '") + "'"
          // console.log(b);
        } else {
          openTypeFeatures = 'normal'
        }
        return openTypeFeatures
      },
      async loadVariableFont(name, path) {
        const fontToLoad = new FontFace(name + ' Variable', `url('${path}.woff2')`, {
          display: 'block'
        });
        await fontToLoad.load()
          .then(function(loadedFont) {
            document.fonts.add(loadedFont);
            console.log(name, path, " Was loaded");
            // document.body.style.fontFamily = '"Junction Regular", Arial';
          })
          .catch(function(error) {
            console.error(error);
            // error occurred
          });
      },
      async loadFont(fontData, name) {
        const {
          weight,
          path,
          fontStretch,
          fontStyle,
          fontDir
        } = fontData
        // console.log(name + '/' + path);
        const fontToLoad = new FontFace(name, `url(/fonts/${name + '/' + path + '.woff'})`, {
          weight: String(weight),
          stretch: String(fontStretch),
          style: String(fontStyle),
          display: 'block'
        });

        for (var fontFace of document.fonts.values()) {
          if (fontFace.family.toLowerCase() == name.toLowerCase() && fontFace.weight == weight && fontFace.style == fontStyle && fontFace.stretch == fontStretch && fontFace.loaded) {
            console.log(`FONT ${name} with weight ${weight} was already loaded`);
            return
          }
        }

        await fontToLoad.load()
          .then(function(loadedFont) {
            document.fonts.add(loadedFont);
            // document.body.style.fontFamily = '"Junction Regular", Arial';
          })
          .catch(function(error) {
            console.error(error);
            // error occurred
          });
      },
    },

  }))
};