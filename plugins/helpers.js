import Vue from 'vue'

export default ({ app, store }, inject) => {
  inject("helpers", new Vue({
    methods: {
      getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
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
      }
    },

  }))
};