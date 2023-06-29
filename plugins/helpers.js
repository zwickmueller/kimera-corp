import Vue from "vue";

export default ({ app, store }, inject) => {
  inject(
    "helpers",
    new Vue({
      methods: {
        transformImage(image, option) {
          if (!image) return "";
          if (!option) return "";
          var imageService = "//a.storyblok.com";
          var path = image.replace("https:", "");
          return image + "/m/" + option;
        },
        getRandomNumber(min, max) {
          return Math.random() * (max - min) + min;
        },
        getRandomIntInRange(min, max, include = false) {
          if (include)
            return Math.floor(
              Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min
            );
          else
            return Math.floor(
              Math.random() * (Math.floor(max) - Math.ceil(min)) + min
            );
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
          return ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
        },
        getRandomColor(alpha = 1) {
          let o = Math.round;
          let r = Math.random;
          let s = 255;
          return (
            "rgba(" +
            o(r() * s) +
            "," +
            o(r() * s) +
            "," +
            o(r() * s) +
            "," +
            alpha +
            ")"
          );
        },
        getDomDimensions(element) {
          const { width, height, left, top } = element.getBoundingClientRect();

          return {
            width: width,
            height: height,
            left: left,
            top: top,
          };
        },
        getDomCenter(element) {
          // console.log(element);
          const dimensions = getDomDimensions(element);
          const centerY = dimensions.height - dimensions.top / 2;
          const centerX = dimensions.width - dimensions.left / 2;

          return {
            x: centerX,
            y: centerY,
          };
        },
        getEmValue() {
          return parseFloat(
            getComputedStyle(document.querySelector("html")).fontSize
          );
        },
        normalizeString(string) {
          return string.toLowerCase().trim().replace(" ", "-");
        },
        normalizePath(path) {
          if (path !== "/" && path.endsWith("/")) {
            const newPath = path.slice(0, -1);
            return newPath;
          } else {
            return path;
          }
        },
        removeClassByPrefix(node, prefix) {
          var regx = new RegExp("\\b" + prefix + "[^ ]*[ ]?\\b", "g");
          node.className = node.className.replace(regx, "");
          return node;
        },
        isMobile(breakpoint = 769) {
          if (navigator.userAgent.match(/Mobi/)) {
            return true;
          }
          if ("screen" in window && window.screen.width < breakpoint) {
            return true;
          }
          var connection =
            navigator.connection ||
            navigator.mozConnection ||
            navigator.webkitConnection;
          if (connection && connection.type === "cellular") {
            return true;
          }
          if (window.innerWidth <= breakpoint) {
            return true;
          }
          return false;
        },
        formatTimeWithUTCOffset(_date) {
          let date = new Date(_date);
          if (_date == "") return "11:35";
          // console.log(date,_date)
          if (date == "Invalid Date") return _date;
          let hours = date.getUTCHours().toString().padStart(2, "0");
          let minutes = date.getUTCMinutes().toString().padStart(2, "0");
          let seconds = date.getUTCSeconds().toString().padStart(2, "0");
          let offset = date.getTimezoneOffset() / 60;
          let sign = offset < 0 ? "+" : "-";
          offset = Math.abs(offset);
          return `${hours}:${minutes}:${seconds} UTC${sign}${offset}`;
        },
        chunkArray(array, chunkSize) {
          const chunks = [];
          let currentChunk = [];

          for (let i = 0; i < array.length; i++) {
            currentChunk.push(array[i]);

            if (currentChunk.length === chunkSize || i === array.length - 1) {
              chunks.push(currentChunk);
              currentChunk = [];
            }
          }

          return chunks;
        },
        getOpenTypeFeatures(object) {
          let openTypeFeatures = object.selectedOpenTypeFeatures;
          // console.log(openTypeFeatures, object);
          if (openTypeFeatures && openTypeFeatures.length > 0) {
            let values = openTypeFeatures
              .filter((el) => el && el.value !== undefined && el.value !== null)
              .map((el) => el.value);
            // let values = openTypeFeatures.map(el => el.value)
            openTypeFeatures = "'" + values.join("', '") + "'";
            // console.log(b);
          } else {
            openTypeFeatures = "normal";
          }
          return openTypeFeatures;
        },
        async loadVariableFont(name, path) {
          const fontToLoad = new FontFace(
            name + " Variable",
            `url('${path}.woff2')`,
            {
              display: "block",
            }
          );
          await fontToLoad
            .load()
            .then(function (loadedFont) {
              document.fonts.add(loadedFont);
              console.log(name, path, " Was loaded");
              // document.body.style.fontFamily = '"Junction Regular", Arial';
            })
            .catch(function (error) {
              console.error(error);
              // error occurred
            });
        },
        fitText(el) {
          this.element = el;
          this.parent = el.parentElement;
          this.clientHeight = -1;
          this.clientWidth = -1;

          this.fit = function (shouldRecalc) {
            this.parent.style.fontSize = "100px";
            if (shouldRecalc || this.clientWidth < 0) {
              this.recalc();
            }

            this.parent.style.fontSize =
              Math.max(
                10,
                Math.min(
                  this.clientHeight,
                  Math.floor(
                    (this.clientWidth / this.element.clientWidth) * 100
                  )
                )
              ) + "px";
          };

          //cache parent width, height
          this.recalc = function () {
            this.clientWidth = this.parent.clientWidth;
            this.clientHeight = this.parent.clientHeight;
          };
        },
        async loadFont(fontData, name) {
          // TO DO: This loadFont Function is slightly different than the one in the typtester. It has no access to FontDir, so the fontDir is generated by the name.
          // This means the folder structure needs to be exactly named, otherwise this wont load fonts correctly.

          const { weight, path, fontStretch, fontStyle, fontDir } = fontData;
          // console.log(name + '/' + path);
          const fontToLoad = new FontFace(
            name,
            `url(/fonts/${name + "/WEB/WOFF/" + path + ".woff"})`,
            // `url(/fonts/${name + "/" + path + ".woff"})`,
            {
              weight: String(weight),
              stretch: String(fontStretch),
              style: String(fontStyle),
              display: "block",
            }
          );

          console.log(`url(/fonts/${name + "/WEB/WOFF/" + path + ".woff"})`);
          // for (var fontFace of document.fonts.values()) {
          //   if (fontFace.family.toLowerCase() == name.toLowerCase() && fontFace.weight == weight && fontFace.style == fontStyle && fontFace.stretch == fontStretch && fontFace.loaded) {
          //     console.log(`FONT ${name} with weight ${weight} was already loaded`);
          //     return
          //   }
          // }
          for (var fontFace of Array.from(document.fonts)) {
            if (
              fontFace.family.toLowerCase() == name.toLowerCase() &&
              fontFace.weight == weight &&
              fontFace.style == fontStyle &&
              fontFace.stretch == fontStretch &&
              fontFace.loaded
            ) {
              // console.log(`FONT ${name} with weight ${weight} was already loaded`);
              return;
            }
          }

          await fontToLoad
            // await fontToLoad
            .load()
            .then(function (loadedFont) {
              document.fonts.add(loadedFont);
              // console.log(loadedFont);
              // document.body.style.fontFamily = '"Junction Regular", Arial';
              // return loadedFont.metrics;
            })
            .catch(function (error) {
              console.error(error);
              console.error("Failed to load font: " + name);
              console.error(weight, path, fontStretch, fontStyle);
              // error occurred
            });
        },
      },
    })
  );
};
