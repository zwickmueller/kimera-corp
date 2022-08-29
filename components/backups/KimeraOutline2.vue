<template >
<aside v-if="shouldRender" ref="header" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
  <!-- <aside v-if="shouldRender" ref="header" @mouseenter="mouseEnter" @mouseleave="mouseLeave"> -->
  <!-- <nuxt-link :to="{ hash: i == 0 ? '#' : headline}" exact tag="div" v-for="(headline, i) in headlines" :key="headline">{{headline}}</nuxt-link> -->

  <!-- <transition @enter="onEnter_" @leave="onLeave_" :css="false"> -->
  <div class="kimera-text-filter kimera-outline" :class="mouseEntered ? 'mouse-entered': ''">
    <button @click="handleNavigation(null)" class="kimera-outline-button kimera-button button-reset active-headline" :class="mouseEntered ? 'mouse-entered': ''" :style="{order: 0}">
      <transition @enter="onEnter" @leave="onLeave" :css="false">
        <span :key="currentActiveHeadline">
          {{currentActiveHeadline}}
        </span>
      </transition>

    </button>
    <!-- </div> -->
    <!-- <transition-group name="slide-up"> -->
    <!-- <div class="kimera-text-filter kimera-outline" v-if="mouseEntered" :key="1" data-index="1"> -->
    <!-- <div class="kimera-text-filter kimera-outline" v-show="mouseEntered" :key="1" data-index="1"> -->
    <button @click="handleNavigation(headline.domId)" class="kimera-outline-button kimera-button button-reset" v-for="(headline, i) in headlines" :key="headline.text" :data-order-index="i" v-if="i !== 0 && mouseEntered" :style="`order: ${i +1}`">

      <!-- <transition @enter="onEnter" @leave="onLeave" :css="false">
        <span :key="mouseEntered">
          {{headline.text}}
        </span>
      </transition> -->
      <span>
        {{headline.text}}
      </span>
    </button>
    <!-- </transition-group> -->
  </div>

  <!-- </transition> -->
</aside>
<!-- </transition> -->
</template>

<script>
import {
  gsap,
  Flip
} from "gsap/all";
if (process.client) {
  gsap.registerPlugin(Flip);
}

export default {
  data() {
    return {
      headlines: '',
      currentActiveHeadline: this.getTitle,
      lastActiveHeadline: this.getTitle,
      observer: null,
      sections: null,
      scrollDirection: 'down',
      // currentIndex: 0,
      mouseEntered: false,
      offsetHeight: 0
    }
  },
  computed: {
    shouldRender() {
      return this.$route.name !== 'index' && this.$route.name !== "products-all" && !this.isPageTransitioning
    },
    shouldObserve() {
      return this.$route.name !== 'index' && this.$route.name !== "products-all"
    },
    isPageTransitioning() {
      return this.$store.state.isPageTransitioning
    },
    getTitle() {
      return this.shouldRender ? this.$route.params.pathMatch.split('-')
        .join(' ') : ''
    },

  },
  watch: {
    'isPageTransitioning': function(a, b) {
      // console.log("this.$root.isTransitioning");
      // if (!a) {
      //   this.currentActiveHeadline = this.getTitle
      //   this.getNewHeadlines()
      //   this.$nextTick(() => {
      //
      //     this.setUpObservation()
      //   })
      // }
      // console.log(a, b);
    }
  },
  methods: {
    mouseEnter(e) {

      // return
      console.log("enter", e.target);
      const buttons = e.target.querySelectorAll(".kimera-outline button:not(.active-headline)")
      const activeHeadline = e.target.querySelector(".active-headline")
      const outline = e.target.childNodes
      // activeHeadline.style.width = '100%'
      console.log(window.getComputedStyle(activeHeadline)
        .height);
      // const headlineStyle = window.getComputedStyle(activeHeadline)
      // const asideStyle = window.getComputedStyle(e.target)
      // const width = (parseFloat(headlineStyle.width) + (parseFloat(asideStyle.paddingLeft) * 2)) + 'px'
      // console.log(width);
      // // this.$refs.header.style.width = width
      // gsap.to(e.target, {
      //   width: width,
      //   duration: 1
      // })

      // e.target.style.height = window.getComputedStyle(activeHeadline)
      //   .height
      // e.target.style.overflow = "hidden"
      console.log(window.getComputedStyle(activeHeadline)
        .height);
      let height = window.getComputedStyle(activeHeadline)
        .height

      const state = Flip.getState(outline);
      this.mouseEntered = true
      let that = this
      this.$nextTick(() => {

        Flip.from(state, {
          onStart: function() {
            // activeHeadline.style.height = height
            // buttons.forEach(el => el.style.height = height)
            setTimeout(() => {

              that.lastActiveHeadline = that.currentActiveHeadline
              that.currentActiveHeadline = that.getTitle
            }, 0)
          },
          // nested: true,
          duration: 0.25,
          // prune: true,
          // simple: true,
          // scale: true,
          absolute: true,
          // props: ["padding"],
          absoluteOnLeave: true,
          ease: "power2.out"
        });
      })
      // const index = [...buttons].find(el => {
      //
      //     console.log(el.innerText, activeHeadline.innerText);
      //     return el.innerText == activeHeadline.innerText
      //   })
      //   .dataset.orderIndex
      // console.log(index);
      // console.log(buttons, activeHeadline);


      // let buttons = gsap.utils.toArray(".kimera-outline button:not(.active-headline)") //e.target.querySelectorAll('button:not(.active-headline)')
      // console.log("enter", buttons);
      // const state = Flip.getState(buttons);
      //
      // // Make DOM or styling changes (swap the squares in our case)
      // // swap(squares);
      // e.target.classList.add('active')
      // buttons.forEach(el => el.classList.add('active'))
      // this.$nextTick(() => {
      //
      //   // Animate from the initial state to the end state
      //   Flip.from(state, {
      //     nested: true,
      //     duration: 2,
      //     // scale: true,
      //     absolute: true,
      //
      //
      //     ease: "power1.inOut"
      //   });
      // })
    },
    mouseLeave(e) {
      // this.lastActiveHeadline = this.currentActiveHeadline
      // this.currentActiveHeadline = this.lastActiveHeadline
      // this.mouseEntered = false
      console.log("leave", e.target);

      let that = this
      const outline = e.target.childNodes
      // that.currentActiveHeadline = that.lastActiveHeadline
      const state = Flip.getState(outline);
      this.mouseEntered = false
      this.$nextTick(() => {
        // that.currentActiveHeadline = that.lastActiveHeadline

        Flip.from(state, {
          onComplete: function() {
            setTimeout(() => {

              if (window.scrollY > window.innerHeight / 2) that.currentActiveHeadline = that.lastActiveHeadline
            }, 0)
            // activeHeadline.style.height = height
            // buttons.forEach(el => el.style.height = height)
          },
          // nested: true,
          duration: 0.25,
          // prune: true,
          // props: ["padding"],
          // simple: true,
          // scale: true,
          absolute: true,

          absoluteOnLeave: true,
          ease: "power2.out"
        });
      })
    },
    onLeave_(el, done) {

    },
    onEnter_(el, done) {
      console.log("ASDASDIOASJDOAISDJAOID", el, el.dataset);
    },
    onEnter(el, done) {
      if (this.mouseEntered) {
        done()
        return
      }
      gsap.fromTo(el, {
        y: this.scrollDirection === "down" ? -20 : 20,
      }, {
        onStart: function() {
          console.log(el.parentElement);
          gsap.set(el.parentElement, {
            width: this.mouseEntered ? '100%' : el.clientWidth + (parseFloat(window.getComputedStyle(el.parentElement)
              .paddingLeft) * 2) + 'px'
          })
          // el.parentElement.style.width = this.mouseEntered ? '100%' : el.clientWidth + (parseFloat(window.getComputedStyle(el.parentElement)
          //   .paddingLeft) * 2) + 'px'
        },
        // width: el.clientWidth,
        y: 0,
        ease: "elastic.out(1, 0.80)",
        duration: .5,
        onComplete: done
      })
      console.log("enter ", el, el.clientWidth);

    },
    onLeave(el, done) {
      if (this.mouseEntered) {
        done()
        return
      }

      console.log("leave ", el, el.clientWidth);
      gsap.fromTo(el, {
        y: 0
      }, {
        onStart: function() {
          console.log(el.parentElement);
          // el.parentElement.style.width = el.clientWidth + 'px'
          gsap.set(el.parentElement, {
            width: el.clientWidth + (parseFloat(window.getComputedStyle(el.parentElement)
              .paddingLeft) * 2) + 'px'
          })
          // el.parentElement.style.width = el.clientWidth + (parseFloat(window.getComputedStyle(el.parentElement)
          //   .paddingLeft) * 2) + 'px'
        },
        position: "absolute",
        y: this.scrollDirection === "down" ? 20 : -20,
        duration: .5,
        ease: "elastic.out(1, 0.80)",
        onComplete: done
      })
      // call the done callback to indicate transition end
      // optional if used in combination with CSS
      // done()
    },
    getOffsetTop(element) {
      return element ? (element.offsetTop + this.getOffsetTop(element.offsetParent)) : 0;
    },
    handleNavigation(domId) {

      let el = document.getElementById(domId)

      window.scrollTo({
        left: 0,
        top: this.getOffsetTop(el),
        behavior: "smooth"
      })
      this.mouseEntered = false
    },

    getNewHeadlines() {
      let tempHeadlines = [{
          domId: null,
          text: this.getTitle
        }

      ]
      let headlines = document.querySelectorAll('h3')
      for (var i = 0; i < headlines.length; i++) {
        let text = headlines[i].innerText
        tempHeadlines.push({
          domId: this.$helpers.normalizeString(text),
          text: text
        })
      }
      console.log(tempHeadlines);
      // tempHeadlines.pop()
      this.headlines = tempHeadlines
    },
    setUpObservation() {
      if (!this.shouldObserve) return
      // const header = document.querySelector('.kimera-outline')
      // const header = document.querySelector('.kimera-outline')
      const header = this.$refs.header
      console.log(document.querySelector('.project'));
      const _sections = document.querySelector('.project')
        .childNodes
      this.sections = [..._sections]
      // const sections = [..._sections]
      // const sections = [...document.querySelectorAll('.project')]
      const scrollRoot = document.querySelector('html')
      // const headerLinks = [...document.querySelectorAll('[data-link]')]
      let prevYPosition = 0
      this.scrollDirection = 'up'

      const options = {
        root: null,
        // rootMargin: `${header.offsetHeight * -0.175}px 0px ${(window.innerHeight - header.offsetHeight ) * -1}px 0px`,
        rootMargin: `${this.offsetHeight * -0.175}px 0px ${(window.innerHeight -   this.offsetHeight ) * -1}px 0px`,
        // rootMargin: '0%',
        threshold: 0
      }
      const getTargetSection = (entry) => {
        const index = this.sections.findIndex((section) => section == entry.target)
        if (index >= this.sections.length - 1) {
          return entry.target
        } else {
          return this.sections[index + 1]
        }
      }



      const shouldUpdate = (entry) => {

        if (this.scrollDirection === 'down' && !entry.isIntersecting) {
          return true
        }

        if (this.scrollDirection === 'up' && entry.isIntersecting) {
          return true
        }

        return false
      }


      const onIntersect = (entries, observer) => {
        entries.forEach((entry) => {
          // console.log(entry);
          if (entry.intersectionRatio > 0) {}

          if (scrollRoot.scrollTop > prevYPosition) {
            this.scrollDirection = 'down'
          } else {
            this.scrollDirection = 'up'
          }

          prevYPosition = scrollRoot.scrollTop

          const target = this.scrollDirection === 'down' ? getTargetSection(entry) : entry.target
          // console.log(getTargetSection(entry));
          // console.log(target);

          if (shouldUpdate(entry)) {
            // updateColors(target)
            // updateMarker(target)
            this.sections.forEach((section) => {
              section.classList.remove("observed")
            })
            target.classList.add("observed")
            console.log(entry, target);
            if (!this.mouseEntered) {
              this.currentActiveHeadline = target.querySelector('h3') ? target.querySelector('h3')
                .innerText : this.getTitle
            } else {
              this.lastActiveHeadline = target.querySelector('h3') ? target.querySelector('h3')
                .innerText : this.getTitle
            }

          } else {
            // console.log("else");
          }
          // if (window.scrollY == 0) this.currentActiveHeadline = this.getTitle
        })
      }
      // if (this.observer) this.observer
      this.observer = new IntersectionObserver(onIntersect, options)
      // const observer = new IntersectionObserver(onIntersect, options)
      console.log(this.sections);
      this.sections.forEach((section) => {
        this.observer.observe(section)
      })

    }
  },
  beforeDestroy() {
    console.log("before destroy", this.observer);
    if (this.observer) {
      this.sections.forEach((section) => {
        this.observer.unobserve(section)
      })
      this.observer.disconnect()
      this.observer = null
      console.log("before destroy", this.observer);
    }

  },
  mounted() {
    // this.$nextTick(() => {
    this.currentActiveHeadline = this.getTitle
    this.offsetHeight = this.shouldRender ? this.$refs.header.offsetHeight : 0
    setTimeout(() => {
      this.getNewHeadlines()
      // this.$nextTick(() => {

      this.setUpObservation()

    }, 650)
    // })



  }
}
</script>
<style >
.observed h3 {
  /* background: red */
  opacity: 0
}
</style>
<style lang="scss" scoped>
aside .kimera-outline {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
    // display: block;
    // transition: all 1s linear;
    position: relative;
    background: var(--black);
    // div + div {
    //     // background: red;
    //     margin-top: 0.5em;
    // }
    border-radius: var(--kimera-button-border-radius);

    button.kimera-outline-button {
        text-transform: uppercase;
        text-align: center;
        justify-content: center;
        border-radius: 8px !important;
        position: relative;
        align-items: unset !important;
        transition: width 0.3s cubic-bezier(0.230, 1.000, 0.320, 1.000);
        // transition: width 0.2s cubic-bezier(0.020, 1.650, 0.665, 1.010);
        // transition: width 1s cubic-bezier(0.020, 1.650, 0.250, 0.955);
        // transition: width 1s cubic-bezier(0.000, 1.345, 0.560, 1.005);
        // &.active,
        &:hover {
            background: var(--kimera-white);
            color: var(--black);
        }
    }

}
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.25s ease-out;
    // position: absolute;
}

.slide-up-enter-from {
    opacity: 0;

    // position: absolute;
    transform: translateX(30px) !important;
}

.slide-up-leave-to {
    opacity: 0;
    transform: translateX(-30px)!important;
}
aside {
    transition: all 0.3s linear;
    width: auto;
    padding: 0 1em 1em;
    button:not(.active-headline) {
        // display: none;
    }
    & {
        button.kimera-outline-button {
            transition: none;
        }
        .kimera-outline {
            border: 2px solid var(--black);
            // border-radius: 10px;
            transform: translateY(-2px);
        }
        .kimera-outline.mouse-entered {
            border-radius: 10px;

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
}
button {
    // min-height: 1.55em !important;

    //  height: 23.31px !important;
}
</style>
