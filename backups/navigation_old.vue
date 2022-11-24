<template >
<div class="nav-wrapper fixed fixed-reset">
  <!-- <nav> -->
  <!-- <transition-group tag="nav" @before-enter="onBeforeEnter" @enter="onEnter" @after-enter="onAfterEnter" @enter-cancelled="onEnterCancelled" @before-leave="onBeforeLeave" @leave="onLeave" @after-leave="onAfterLeave"
    @leave-cancelled="onLeaveCancelled"> -->
  <transition-group tag="nav" :css="false" @before-leave="beforeLeave" @enter="onEnter" @before-enter="onBeforeEnter" @leave="onLeave" @after-leave="afterLeave">
    <tag-button v-for="(tag,i) in visibleTags" :key="tag.name + tag.active" v-if="tag.show" ref="tags" @click.native="handleTagClick(tag, i)" class="tag" :data-index="i" :data-sub-index="!tag.isMainTag  ? i - activeTagsComputed.length : null"
      :class="[!tag.isMainTag && !tag.active && !tag.isTitle ? 'subtag' : '', tag.active ? 'active' : '']" :style="`order: ${tag.active && tag.subTags ? 0 : i}`">
      {{tag.name}}{{tag.active ? ' x' : ''}}
    </tag-button>
  </transition-group>
  <!-- </nav> -->

</div>
</template>

<script>
import {
  gsap
} from "gsap";
import {
  SpringEasing,
  SpringOutFrame
} from "spring-easing";

// circle button width = height = 2.65em

const tags = [{
    name: 'Kimera',
    isTitle: true,
    show: false
  }, {
    name: 'Services',
    isMainTag: true,
    subTags: ['Branding', 'Editorial', 'Digital'],
    show: true,
  },
  {
    name: 'Typefaces',
    isMainTag: true,
    subTags: ['Sans-serif', 'Serif', 'Monospace'],
    show: true,
  },
  {
    name: 'Objects',
    isMainTag: true,

    show: true,
  },
  {
    name: 'Garmets',
    isMainTag: true,
    show: true,
  },

  ///SUB TAGS
  {
    name: 'Branding',
    subTags: ['asd', 'qwe', 'ert'],
  },
  {
    name: 'asd',
  },
  {
    name: 'qwe',
  },
  {
    name: 'ert',
  },
  {
    name: 'Book',
  },
  {
    name: 'Magazine',
  },
  {
    name: 'Catalogue',
  },
  {
    name: 'Sans-serif',
  },
  {
    name: 'Serif',
  },
  {
    name: 'Monospace',
  },
  {
    name: 'Editorial',
    subTags: ['Book', 'Magazine', 'Catalogue'],
  },
  {
    name: 'Digital',
    subTags: ['Website', 'App'],
  },
  {
    name: 'Website'
  },
  {
    name: 'App'
  }
]

for (var i = 0; i < tags.length; i++) {
  tags[i].active = false
  if (!tags[i].show) tags[i].show = false
}
tags.sort((a, b) => Number('subTags' in b) - Number('subTags' in a));
// console.log(trueFirst);
//  1. Was passiert wenn "Objects" zuerst angeklickt wird? (animation / links & rechts)
//  2. Was passiert wenn "Services > Branding (0 subtags) > Editorial (3 Subtags)" angeklickt wird?
//  3. Services hat kleinteilige (2 Ebenen) filter (Editorial, 3 subTags), typography/garmets vermutlich nur eine Ebene.
//    > Einheitliche Tiefe entscheiden!
//
//

export default {
  data() {
    return {
      activeTags: [],
      subTags: [],
      tags,
      activeTagsIncreased: false,
      navAnimDuration: 0.55,
      navAnimDurationIn: 0.3,
      navAnimHoldDuration: .15
    }
  },
  methods: {
    beforeLeave(el) {
      // const {
      //   marginLeft,
      //   marginTop,
      //   width,
      //   height
      // } = window.getComputedStyle(el)
      // el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`
      // el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`
      // el.style.width = width
      // el.style.height = height
    },
    // // called before the element is inserted into the DOM.
    // // use this to set the "enter-from" state of the element
    onBeforeEnter(el) {
      // console.log("onBeforeEnter ", el);
    },
    //
    // // called one frame after the element is inserted.
    // // use this to start the animation.
    onEnter(el, done) {
      // call the done callback to indicate transition end
      // optional if used in combination with CSS
      let subIndex = Number(el.dataset.subIndex)
      let delayModifier = 0.2
      if (Number.isNaN(subIndex)) subIndex = -1
      subIndex = Math.max(0, subIndex + 1)
      // console.log("onEnter ", el.dataset.subIndex, el.dataset.index, Math.max(0, el.dataset.subIndex), el.innerText, this.navAnimDuration * (subIndex + 1) * delayModifier + 1);
      let delay = this.navAnimDuration * (subIndex + 1) * delayModifier + 1
      // console.log(el.getBoundingClientRect().width + 'px');
      let width = el.getBoundingClientRect().width + 'px'
      this.$nextTick(() => {
        // let gridGap = 0.5 * 2;
        // let a = gsap.utils.unitize(() => (Number(el.dataset.index) - this.activeTagsComputed.length + 1) * (-2.65 - gridGap), "em")
        // // console.log(a());
        // let b = [...document.querySelectorAll(`nav .tag:not([data-index='${el.dataset.index}'])`)]
        // let c = b.map(a => a.getBoundingClientRect().width).reduce((a, b) => a + b);
        // console.log(b);
        // console.log(c);

        gsap.set(el, {
          x: 0,

          opacity: 0,
          // maxWidth: "2.65em",
          width: el.getBoundingClientRect().height + "px",
          position: "absolute",
          color: el.classList.contains('subtag') ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)'
        })
        const tl = gsap.timeline()
        tl.set(el, {
          opacity: 1,
          position: 'relative',
          // maxWidth: "2.65em",
          delay: this.navAnimDurationIn + this.navAnimHoldDuration,
          width: el.getBoundingClientRect().height + "px"
        })
        tl.fromTo(el, {
          width: el.getBoundingClientRect().height + "px"
        }, {

          onStart: function() {

          },
          x: 0,
          // color: el.classList.contains('subtag') ? 'black' : 'white',
          color: el.classList.contains('subtag') ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)',
          // color: "inherit",
          // maxWidth: "100%",
          width: width,
          // display: "block",
          duration: this.navAnimDuration,

          // delay: this.navAnimDuration,
          // delay: delay - this.navAnimDuration,
          onComplete: done,
          ease: "elastic.out(1.2, 0.75)"
        })
      })
      // console.log(delay - this.navAnimDuration);
      // done()
    },
    //
    // // called when the enter transition has finished.
    // onAfterEnter(el) {
    //   console.log("onAfterEnter ", el);
    // },
    // onEnterCancelled(el) {
    //   console.log("onEnterCancelled ", el)
    // },
    //
    // // called before the leave hook.
    // // Most of the time, you shoud just use the leave hook.
    beforeLeave(el) {
      el.style.width = el.getBoundingClientRect().width + 'px'
      // console.log("onBeforeLeave ", el)
      if (el.classList.contains('active')) el.dataset.wasActive = true
    },
    //
    // // called when the leave transition starts.
    // // use this to start the leaving animation.
    onLeave(el, done) {
      // console.log("onLeave ", el)
      // let width = el.getBoundingClientRect().width + 'px'
      let gridGap = 0.5 * 2;
      const tl = gsap.timeline()
      // console.log(el.parentNode.style.gridGap);
      // console.log();
      this.$nextTick(() => {
        const style = getComputedStyle(el)
        const padding = parseFloat(style.fontSize)
        const letterSpacing = parseFloat(style.letterSpacing)
        const x = (-el.getBoundingClientRect().height - (padding - letterSpacing)) * (Number(el.dataset.index) - this.activeTagsComputed.length + Number(this.activeTagsIncreased))
        let [translateX, duration] = SpringEasing(['0px', x + 'px'], {
          easing: "spring(1, 711, 40, 0)",
          // You can change the size of Array for the SpringEasing function to generate
          numPoints: 200,
          // The number of decimal places to round, final values in the generated Array
          // This option doesn't exist on {@link GenerateSpringFrames}
          decimal: 5
        });
        duration = Math.round(duration);
        let wrappedX = gsap.utils.wrap(translateX);
        console.log(x, duration / 1000);
        // const x = gsap.utils.unitize(() => (Number(el.dataset.index) - this.activeTagsComputed.length + Number(this.activeTagsIncreased)) * (-el.getBoundingClientRect().height - (parseFloat(getComputedStyle(el.parentNode).gridRowGap))), "px")
        // gsap.set(el, {
        //   width: 'auto'
        // })
        // debugger
        // console.log(x(), el.getBoundingClientRect().height + "px");
        this.navAnimDurationIn = duration / 1000
        tl.to(el, {
          // opacity: 0,
          duration: this.navAnimDurationIn,
          ease: "none",
          x: translateX.length,
          modifiers: {
            x: (_x) => wrappedX(parseFloat(_x)) + "px",
            //rotation: (x) => wrappedRotate(parseFloat(x)) + "deg"
          },
          // duration: this.navAnimDurationIn, //this.navAnimDuration ,
          // x: (-el.getBoundingClientRect().height - (padding - letterSpacing)) * (Number(el.dataset.index) - this.activeTagsComputed.length + Number(this.activeTagsIncreased)),
          // x: (-el.getBoundingClientRect().height - (7.15 - 0.572)) * el.dataset.index,
          // x: parseInt(x()) + 'px',
          // x: gsap.utils.unitize(() => (Number(el.dataset.index) - this.activeTagsComputed.length + Number(this.activeTagsIncreased)) * (-2.65 - gridGap), "em"),
          color: el.classList.contains('subtag') ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)',
          background: 'black',
          width: el.getBoundingClientRect().height + "px",
          // width: this.convertRemToPixels(2.65),
          // ease: "linear",
          ease: "power2.in",

        })
        tl.set(el, {
          onComplete: done,
          delay: this.navAnimHoldDuration
        })
      })
      // done()
    },
    //
    // // called when the leave transition has finished and the
    // // element has been removed from the DOM.
    afterLeave(el) {
      el.dataset.wasActive = false
      // console.log("onAfterLeave ", el)
    },
    //
    // // only available with v-show transitions
    // onLeaveCancelled(el) {
    //   console.log("onLeaveCancelled ", el)
    // },
    convertRemToPixels(rem) {
      return rem * parseFloat(getComputedStyle(document.querySelector('html')).fontSize);
    },
    handleTagClick(tag, i) {
      if (tag.isTitle) {
        this.$router.push('/')
        return
      }
      tag.active = !tag.active
      // const tl = gsap.timeline()
      // tl.to(document.querySelectorAll("nav .tag:not(.active)"), {
      //   width: "2.65em",
      //   color: 'transparent',
      //   // borderRadius: "100%",
      //   x: function(index, target, targets) {
      //     let gridGap = 0.45 * 2;
      //     let a = gsap.utils.unitize(() => index * (-2.65 - gridGap), "em")
      //     console.log(a());
      //     return a()
      //   },
      //   duration: 5,
      //   stagger: 0.1,
      //   onStart: function() {
      //
      //   },
      //   onComplete: () => {
      // return
      const lastAddedTag = this.activeTagsComputed[this.activeTagsComputed.length - 1]
      const allMainTags = this.tags.filter(el => el.isMainTag)
      if (tag.isMainTag) {
        for (var i = 0; i < allMainTags.length; i++) {
          if (tag.name != allMainTags[i].name) {
            allMainTags[i].show = false
            allMainTags[i].active = false
          }
        }
      }
      if (tag.isMainTag && !tag.active) {
        for (var u = 0; u < allMainTags.length; u++) {
          allMainTags[u].show = true
          allMainTags[u].active = false

        }
      }

      if (tag.subTags) {
        for (var i = 0; i < this.tags.length; i++) {
          const _tag = this.tags[i]
          let _subTag
          const subTag = tag.subTags.find(el => {
            let check = el === _tag.name
            _subTag = check ? _tag : false
            return check ? _tag : false
          })
          if (!_tag.active && !_tag.isMainTag) _tag.show = false
          if (_subTag) _subTag.show = tag.active
          if (_subTag && !tag.active) _subTag.active = false
        }
        if (lastAddedTag && lastAddedTag.subTags) {
          for (var i = 0; i < lastAddedTag.subTags.length; i++) {
            let subTag = this.tags.find(el => el.name == lastAddedTag.subTags[i])
            subTag.show = true
          }

        }

      } else {
        const test = this.tags.filter(tag => !tag.isMainTag && tag.show && !tag.subTags)
        test.forEach(el => {
          if (!el.active) {
            el.active = false
            el.show = false
          }
        })
      }
      let lastActiveTagWithSubTags = [...this.activeTagsComputed].reverse().find(el => el.subTags)
      if (lastActiveTagWithSubTags && !tag.active) {
        // console.log("ASDASDASD");

        for (var i = 0; i < lastActiveTagWithSubTags.subTags.length; i++) {
          let subTag = this.tags.find(el => el.name == lastActiveTagWithSubTags.subTags[i])
          if (subTag) {
            subTag.active = false
            subTag.show = true
          }
        }
      }
      // console.log(this.visibleTags.filter(el => el.isMainTag).length);
      // console.log("new click");
      const visibleMainTags = this.visibleTags.filter(el => el.isMainTag)
      if (visibleMainTags.length >= 4) {
        this.tags.forEach(el => el.show = el.isMainTag)
        this.tags.forEach(el => el.active = false)
      }
      // console.log(this.tags.filter(el => el.active));
      this.$root.$emit('activeTags', this.activeTagsComputed)
      // this.$root.$emit('activeTags', this.tags.filter(el => el.active))
      // this.$nextTick(() => {
      //
      //
      //   gsap.fromTo(document.querySelectorAll("nav .tag"), {
      //     width: "2.65em",
      //     color: 'transparent',
      //     // borderRadius: "100%",
      //   }, {
      //
      //     width: 'auto',
      //     color: 'white',
      //     // borderRadius: '1.2em',
      //     stagger: 0.05,
      //     x: 0
      //
      //
      //   })
      // })

      // }
      // })

    },
  },
  computed: {
    visibleTags() {
      return this.tags.filter(tag => tag.show)
    },
    activeTagsComputed() {
      return this.tags.filter(tag => tag.active)
    },
    // subTagsComputed() {
    //   return this.subTags.filter(tag => !tag.active)
    // },
    // getTags() {
    //   return this.activeTagsComputed.length == 0 ? this.tags.filter(tag => tag.isMainTag) : [...this.activeTagsComputed, ...this.subTagsComputed]
    // }
  },
  watch: {
    '$route': {
      immediate: true,
      handler: function(old, _new) {

        if (old.name == 'index') {
          // console.log("to index");
          this.tags.forEach(el => el.show = el.isMainTag)
        } else if (old.name !== 'index') {

          this.tags.forEach(el => el.show = el.isTitle)
          this.tags.forEach(el => el.active = false)
          // console.log("from index");
        }
      },
    },
    'activeTagsComputed': function(a, b) {
      this.activeTagsIncreased = a.length - b.length > 0 ? true : false
    }
  },
  mounted() {}

}
</script>

<style lang="scss" scoped>
.list-enter-active {
    transition: 1s ease;
}

.list-leave-active {
    transition: opacity 1s ease;
    position: absolute;
}

.list-enter,
.list-leave-to {
    opacity: 0;
    // background-color: red;
    // transform: translateY(10px);
}

.list-move {
    transition: 1s ease;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}
// .tag {
//     transition: all 1s;
//
// }
// /* .list-complete-leave-active below version 2.1.8 */
// .list-complete-enter,
// .list-complete-leave-to {
//     // width: 0;
//     opacity: 0;
//     // transform: translateY(30px);
// }
// .list-complete-leave-active {
//     position: absolute;
// }
// .flip-list-move {
//     transition: all 1s;
// }
.nav-wrapper {
    padding: 0.5rem 0.5rem 0.5rem 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
}
nav {
    padding-left: var(--kimera-side-padding);
    list-style: none;
    margin: 0;
    // padding: 0;
    display: flex;
    grid-gap: 0.5rem;
}
</style>
