<template>
<div v-editable="story" class="page">
  <landing-page-gallery :elements="story.content.slideShow"></landing-page-gallery>
  <!-- <project-grid></project-grid> -->
  <div class="kimera-flex-grid">
    <!-- <single-grid> -->
    <!-- <transition-group name="list" tag="div" class="kimera-flex-grid" @before-leave="beforeLeave"> -->
    <component ref="projects" v-for="blok in projects" :key="blok._uid" :blok="blok" :is="blok.component" v-show="blok.show" :class="currentActiveTags.length > 0 ? 'is-currently-filtering' : ''" />
    <!-- </transition-group> -->
    <!-- </single-grid> -->
  </div>
</div>
</template>

<script>
// import cloneDeep from 'lodash.cloneDeep'
import {
  gsap,
  Flip
} from "gsap/all";
if (process.client) {
  gsap.registerPlugin(Flip);
}

const shuffledArr = array => array.sort(() => 0.5 - Math.random());


export default {
  data() {
    return {
      currentActiveTags: [],
      states: null,
      group: null,
      orderPositions: [
        [3, 3, 2],
        [2, 2, 4],
        [4, 4],
        [5, 3],
        [2, 6],
        [8]
      ]
      // clonedProjects: []
    }
  },
  props: {
    story: {
      type: Object,
      required: true
    }

  },
  methods: {
    // beforeLeave(el) {
    //   const {
    //     marginLeft,
    //     marginTop,
    //     width,
    //     height
    //   } = window.getComputedStyle(el)
    //   el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`
    //   el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`
    //   el.style.width = width
    //   el.style.height = height
    // },
    compareTagArrays(arr1, arr2) {
      return arr1.every(item => arr2.includes(item))
    },
    removeClassByPrefix(node, prefix) {
      var regx = new RegExp('\\b' + prefix + '[^ ]*[ ]?\\b', 'g');
      node.className = node.className.replace(regx, '');
      return node;
    },
    animateFilter() {

      var projects = document.querySelectorAll('.grid-item');
      var startHeight = gsap.getProperty(".kimera-flex-grid", "height");
      var state = Flip.getState(projects);
      // this.$root.lastState = state
      // let batch = Flip.batch("id");


      this.$nextTick(() => {
        if (this.currentActiveTags.length == 0) {
          projects.forEach(el => {
            this.removeClassByPrefix(el, 'project-width-')
            el.classList.add(el.dataset.originalWidth)
          })

        } else {
          console.log(this.visibleProjects.length, projects.length);
          let visibleProjectsLength = this.visibleProjects.length
          let positions = this.orderPositions[5]
          if (visibleProjectsLength >= 3) positions = this.orderPositions[this.$helpers.getRandomIntInRange(0, 1, true)]
          if (visibleProjectsLength == 2) positions = this.orderPositions[this.$helpers.getRandomIntInRange(2, 4, true)]
          // if(visibleProjectsLength <= 1) positions = this.orderPositions[5]
          positions = shuffledArr(positions)
          projects.forEach((el, i) => {
            console.log(i);
            this.removeClassByPrefix(el, 'project-width-')
            el.classList.add("project-width-" + positions[i % visibleProjectsLength])
            // el.classList.add("project-width-" + this.$helpers.getRandomIntInRange(2, 8, true))

          })
        };
        var endHeight = gsap.getProperty(".kimera-flex-grid", "height");

        var flip = Flip.from(state, {
          duration: 0.375 * 2,
          ease: "power3.inOut",
          stagger: 0.075,
          absolute: true,
          // props: "flexBasis,width",
          nested: true,
          // prune: true,
          // absoluteOnLeave: true,
          onEnter: elements => gsap.fromTo(elements, {
            opacity: 0,
            scale: 0.8,
          }, {
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: .375,
          }),
          onLeave: elements => gsap.fromTo(elements, {
            opacity: 1,
            scale: 1
          }, {
            opacity: 0,
            scale: 0.8,
            stagger: 0.1,

            duration: .375
          })
        })
        flip.fromTo(".kimera-flex-grid", {
          height: startHeight
        }, {
          height: endHeight,
          clearProps: "height",
          duration: flip.duration()
        }, 0);
      })

    },
    changeFilter(payload) {
      this.currentActiveTags = payload.map(el => el.name)
      this.projects.forEach(project => project.show = this.compareTagArrays(this.currentActiveTags, project.project.content.tags))
      this.animateFilter()
      // const state = Flip.getState(this.group);
      // // this.$nextTick(() => {
      // // this.group = document.querySelectorAll(".item");
      //
      //
      //
      // console.log(state);
      //
      // // toggle the flex direction
      //
      // this.group.forEach(el => el.classList.toggle("test"));
      // Flip.from(state, {
      //   absolute: true, // uses position: absolute during the flip to work around flexbox challenges
      //   duration: 0.5,
      //   stagger: 0.1,
      //   ease: "power1.inOut",
      //   props: "flexBasis"
      //   // you can use any other tweening properties here too, like onComplete, onUpdate, delay, etc.
      // });

      // })

      // if (this.currentActiveTags.length != 0)
      //   this.$nextTick(() => {
      //
      //     this.$refs.projects.forEach(project => {
      //       let states = Flip.getState(project.$el);
      //       console.log(project);
      //       project.$el.classList.add("test")
      //
      //       Flip.from(states, {
      //         absolute: true
      //       });
      //     })
      //   })
    }
  },
  computed: {
    // sortedProjects() {
    //   this.projects.forEach(project => project.show = this.compareTagArrays(this.currentActiveTags, project.project.content.tags))
    //   // if (this.currentActiveTags.length == 0) this.projects.forEach(project => project.width = project.originalWidth)
    //   // else
    //   return this.projects.filter(el => el.show)
    //   // return this.currentActiveTags.length > 0 ? this.clonedProjects.filter(project => this.compareTagArrays(this.currentActiveTags, project.project.content.tags)) : this.projects
    // },
    visibleProjects() {
      return this.projects.filter(el => el.show)
    },
    projects() {
      return this.story.content.projectPreviews
    }
    // computedProjects() {
    //   return this.currentActiveTags.length == 0 ? this.story.content.projectPreviews :
    // },
  },
  created() {
    this.projects.forEach(el => el.show = true)
    this.projects.forEach(el => el.originalWidth = el.width)
    // this.clonedProjects = cloneDeep(this.story.content.projectPreviews)
  },
  mounted() {
    // this.group = document.querySelector(".kimera-flex-grid");
    this.group = document.querySelectorAll(".item")
    // this.states = Flip.getState('.project-preview');
    // this.clonedProjects.forEach(el => el.width = 8)
    this.$root.$on('activeTags', this.changeFilter)
  }
}
</script>

<style lang="scss">
// .list-enter-active {
//     transition: 1s ease;
// }
//
// .list-leave-active {
//     transition: 1s ease;
//     position: absolute;
// }
//
// .list-enter,
// .list-leave-to {
//     opacity: 0;
//     background-color: red;
//     transform: translateY(10px);
// }
//
// .list-move {
//     transition: 2s ease;
// }

@for $i from 1 through 8 {
    .project-width-#{$i} {
        flex-basis: calc(100%/8*#{$i} - 8px);
        width: 100%;
    }
}
.kimera-flex-grid {
    height: 100%;
    column-gap: 8px;
    row-gap: 16px;
    padding-left: var(--kimera-side-padding);
    padding-right: calc(var(--kimera-side-padding) - 8px);
    // grid-template-columns: repeat(8, 1fr);
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    // min-height: 65em;
    align-content: flex-start;
}
// .is-currently-filtering {
//     transition: all 1s ease;
// }
.test.item {
    flex-basis: 100%;
    background: red;
}
</style>
