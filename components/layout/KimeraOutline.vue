<template>
  <aside
    v-if="shouldRender"
    ref="header"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
  >
    <div
      class="kimera-text-filter kimera-outline"
      :class="mouseEntered ? 'mouse-entered' : ''"
    >
      <button
        @click="handleNavigation(null)"
        class="kimera-outline-button kimera-button button-reset active-headline"
        :class="mouseEntered ? 'mouse-entered' : ''"
        :style="{ order: 0 }"
      >
        <transition @enter="onEnter" @leave="onLeave" :css="false">
          <span :key="currentActiveHeadline">
            {{ currentActiveHeadline }}
          </span>
        </transition>
      </button>
      <button
        @click="handleNavigation(headline.domId)"
        class="kimera-outline-button kimera-button button-reset"
        v-for="(headline, i) in headlines"
        :key="headline.text"
        :data-order-index="i"
        v-if="i !== 0 && mouseEntered"
        :style="`order: ${i + 1}`"
      >
        <span>
          {{ headline.text }}
        </span>
      </button>
    </div>
  </aside>
</template>

<script>
import { gsap, Flip } from "gsap/all";
if (process.client) {
  gsap.registerPlugin(Flip);
}

export default {
  data() {
    return {
      headlines: "",
      currentActiveHeadline: this.getTitle,
      lastActiveHeadline: this.getTitle,
      observer: null,
      sections: null,
      scrollDirection: "down",
      mouseEntered: false,
      offsetHeight: 0,
    };
  },
  computed: {
    shouldRender() {
      return this.shouldObserve && !this.isPageTransitioning;
      // return this.$route.name !== 'index' && this.$route.name !== "products-all" && this.$route.name !== "info" && !this.isPageTransitioning
    },
    shouldObserve() {
      return (
        this.$route.name == "services-all" ||
        this.$route.name == "typefaces-all"
      );
      // return this.$route.name !== 'index' && this.$route.name !== "products-all" && this.$route.name !== "info"
    },
    isPageTransitioning() {
      return this.$store.state.isPageTransitioning;
    },
    getTitle() {
      if (!this.shouldRender) return "";
      let path = this.$route.params.pathMatch.split("-").join(" ");
      path = this.$helpers.normalizePath(path);
      return this.shouldRender ? path : "";
    },
  },
  methods: {
    mouseEnter(e) {
      const buttons = e.target.querySelectorAll(
        ".kimera-outline button:not(.active-headline)"
      );
      const activeHeadline = e.target.querySelector(".active-headline");
      const outline = e.target.childNodes;
      let height = window.getComputedStyle(activeHeadline).height;

      const state = Flip.getState(outline);
      this.mouseEntered = true;
      let that = this;
      this.$nextTick(() => {
        Flip.from(state, {
          onStart: function () {
            setTimeout(() => {
              that.lastActiveHeadline = that.currentActiveHeadline;
              that.currentActiveHeadline = that.getTitle;
            }, 0);
          },
          duration: 0.25,
          absolute: true,
          absoluteOnLeave: true,
          ease: "power2.out",
        });
      });
    },
    mouseLeave(e) {
      let that = this;
      const outline = e.target.childNodes;
      const state = Flip.getState(outline);
      this.mouseEntered = false;
      this.$nextTick(() => {
        Flip.from(state, {
          onComplete: function () {
            setTimeout(() => {
              if (window.scrollY > window.innerHeight / 2)
                that.currentActiveHeadline = that.lastActiveHeadline;
            }, 0);
          },
          duration: 0.25,
          absolute: true,
          absoluteOnLeave: true,
          ease: "power2.out",
        });
      });
    },
    onLeave_(el, done) {},
    onEnter_(el, done) {},
    onEnter(el, done) {
      if (this.mouseEntered) {
        done();
        return;
      }
      gsap.fromTo(
        el,
        {
          y: this.scrollDirection === "down" ? -20 : 20,
        },
        {
          onStart: function () {
            gsap.set(el.parentElement, {
              width: this.mouseEntered
                ? "100%"
                : el.clientWidth +
                  parseFloat(
                    window.getComputedStyle(el.parentElement).paddingLeft
                  ) *
                    2 +
                  "px",
            });
          },
          y: 0,
          ease: "elastic.out(1, 0.80)",
          duration: 0.5,
          onComplete: done,
        }
      );
    },
    onLeave(el, done) {
      if (this.mouseEntered) {
        done();
        return;
      }
      gsap.fromTo(
        el,
        {
          y: 0,
        },
        {
          onStart: function () {
            gsap.set(el.parentElement, {
              width:
                el.clientWidth +
                parseFloat(
                  window.getComputedStyle(el.parentElement).paddingLeft
                ) *
                  2 +
                "px",
            });
          },
          position: "absolute",
          y: this.scrollDirection === "down" ? 20 : -20,
          duration: 0.5,
          ease: "elastic.out(1, 0.80)",
          onComplete: done,
        }
      );
    },
    getOffsetTop(element) {
      return element
        ? element.offsetTop + this.getOffsetTop(element.offsetParent)
        : 0;
    },
    handleNavigation(domId) {
      // const header = this.$refs.header
      // let payload = {
      //   target: header
      // }
      let el = document.getElementById(domId);
      // console.log(el)
      // this.mouseLeave(payload)
      window.scrollTo({
        left: 0,
        top: this.getOffsetTop(el),
        behavior: "smooth",
      });
      // this.mouseEntered = false
    },

    getNewHeadlines() {
      let tempHeadlines = [
        {
          domId: null,
          text: this.getTitle,
        },
      ];
      let headlines = document.querySelectorAll("h3[id]");
      for (var i = 0; i < headlines.length; i++) {
        let text = headlines[i].innerText;
        tempHeadlines.push({
          domId: this.$helpers.normalizeString(text),
          text: text,
        });
      }
      this.headlines = tempHeadlines;
    },
    setUpObservation() {
      if (!this.shouldObserve) return;

      const header = this.$refs.header;
      const _sections = document.querySelector(".project").childNodes;
      this.sections = [..._sections];
      const scrollRoot = document.querySelector("html");
      let prevYPosition = 0;
      this.scrollDirection = "up";

      const options = {
        root: null,
        rootMargin: `${this.offsetHeight * -0.175}px 0px ${
          (window.innerHeight - this.offsetHeight) * -1
        }px 0px`,
        threshold: 0,
      };

      const getTargetSection = (entry) => {
        const index = this.sections.findIndex(
          (section) => section == entry.target
        );
        if (index >= this.sections.length - 1) {
          return entry.target;
        } else {
          return this.sections[index + 1];
        }
      };

      const shouldUpdate = (entry) => {
        // return true
        if (this.scrollDirection === "down" && !entry.isIntersecting) {
          return true;
        }

        if (this.scrollDirection === "up" && entry.isIntersecting) {
          return true;
        }
        return false;
      };

      const onIntersect = (entries, observer) => {
        entries.forEach((entry) => {
          if (scrollRoot.scrollTop > prevYPosition) {
            this.scrollDirection = "down";
          } else {
            this.scrollDirection = "up";
          }

          prevYPosition = scrollRoot.scrollTop;

          const target =
            this.scrollDirection === "down"
              ? getTargetSection(entry)
              : entry.target;

          if (shouldUpdate(entry)) {
            this.sections.forEach((section) => {
              section.classList.remove("observed");
            });
            target.classList.add("observed");
            if (!this.mouseEntered) {
              this.currentActiveHeadline = target.querySelector("h3")
                ? target.querySelector("h3").innerText
                : this.getTitle;
            } else {
              this.lastActiveHeadline = target.querySelector("h3")
                ? target.querySelector("h3").innerText
                : this.getTitle;
            }
          }
        });
      };
      this.observer = new IntersectionObserver(onIntersect, options);
      this.sections.forEach((section) => {
        this.observer.observe(section);
      });
    },
  },
  beforeDestroy() {
    if (this.observer) {
      this.sections.forEach((section) => {
        this.observer.unobserve(section);
      });
      this.observer.disconnect();
      this.observer = null;
    }
  },
  mounted() {
    this.currentActiveHeadline = this.getTitle;
    this.offsetHeight = this.shouldRender ? this.$refs.header.offsetHeight : 0;
    setTimeout(() => {
      this.getNewHeadlines();
      this.setUpObservation();
    }, 650);
  },
};
</script>
<style>
.observed h3[id] {
  /* background: red */
  opacity: 0;
}
</style>
<style lang="scss" scoped>
aside .kimera-outline {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  overflow: hidden;
  position: relative;
  background: var(--black);
  border-radius: var(--kimera-button-border-radius);

  button.kimera-outline-button {
    text-transform: uppercase;
    text-align: center;
    justify-content: center;
    // border-radius: 8px !important;
    position: relative;
    align-items: unset !important;
    transition: width 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    &:hover {
      background: var(--kimera-white);
      color: var(--black);
    }
  }
}
// .slide-up-enter-active,
// .slide-up-leave-active {
//     transition: all 0.25s ease-out;
// }
//
// .slide-up-enter-from {
//     opacity: 0;
//     transform: translateX(30px) !important;
// }
//
// .slide-up-leave-to {
//     opacity: 0;
//     transform: translateX(-30px)!important;
// }
aside {
  // transition: all 0.3s linear;
  width: auto;
  padding: 0 1em 1em;
  // transform: translateY(-2px);
  // margin-top: -2px;
  transform: translateY(0px);
  @include until($tablet) {
    // transform: translateY(2px);
  }
  button:not(.active-headline) {
  }

  button.kimera-outline-button {
    transition: none;
  }
  .kimera-outline {
    // border-radius: 10px;
    // transform: translateY(-2px);
  }
  .kimera-outline.mouse-entered {
    border: 2px solid var(--black);
    border-radius: 13px !important;
  }
  .mouse-entered.active-headline {
    width: 100% !important;
    // display: none;
    // opacity: 0;
  }
  button:not(.active-headline) {
    display: inherit;
    width: 100%;
    // opacity: 1;
  }
}
</style>
