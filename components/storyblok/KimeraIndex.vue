<template>
  <div v-editable="story" class="page">
    <landing-page-gallery
      :elements="story.content.slideShow"
    ></landing-page-gallery>
    <!-- <project-grid></project-grid> -->
    <div class="kimera-flex-grid index-grid">
      <!-- <single-grid> -->
      <!-- <transition-group name="list" tag="div" class="kimera-flex-grid" @before-leave="beforeLeave"> -->
      <component
        ref="projects"
        v-for="blok in projects"
        :key="blok._uid"
        :blok="blok"
        :is="blok.component"
        v-show="blok.show"
        :class="currentActiveTags.length > 0 ? 'is-currently-filtering' : ''"
      />
      <!-- </transition-group> -->
      <!-- </single-grid> -->
    </div>
  </div>
</template>

<script>
// import cloneDeep from 'lodash.cloneDeep'
import { gsap, Flip } from "gsap/all";
import { mapGetters } from "vuex";

if (process.client) {
  gsap.registerPlugin(Flip);
}
function flushQueue() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}
const shuffledArr = (array) => array.sort(() => 0.5 - Math.random());

export default {
  data() {
    return {
      currentActiveTags: [],
      states: null,
      group: null,
      batch: null,
      orderPositions: [[3, 3, 2], [2, 2, 4], [4, 4], [5, 3], [2, 6], [8]],
      // clonedProjects: []
    };
  },
  props: {
    story: {
      type: Object,
      required: true,
    },
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
      return arr1.every((item) => arr2.includes(item));
    },
    removeClassByPrefix(node, prefix) {
      var regx = new RegExp("\\b" + prefix + "[^ ]*[ ]?\\b", "g");
      node.className = node.className.replace(regx, "");
      return node;
    },
    animateFilter() {
      var projects = document.querySelectorAll(".grid-item");
      var grid = document.querySelectorAll(".kimera-flex-grid");
      var _state = Flip.getState(grid);
      var startHeight = gsap.getProperty(".kimera-flex-grid", "height");
      console.log(startHeight);
      var endHeight;
      let landingHeight =
        document.querySelectorAll(".kimera-landing")[0].getBoundingClientRect()
          .height - 200;
      // var state = Flip.getState(projects);
      // this.$root.lastState = state
      const footer = document.querySelector("footer");
      // const container = document.querySelector('.container');
      const that = this;
      let action = this.batch.add({
        getState(self) {
          return Flip.getState(".grid-item");
        },
        animate(self) {
          console.log("startHeight ", startHeight);
          Flip.from(self.state, {
            duration: 0.375 * 2,
            ease: "power3.inOut",
            stagger: 0.075,
            absolute: true,
            nested: true,
            onStart: () => {
              // console.log("asdasdasdasdasd");

              gsap.set(footer, { opacity: 0 });
              // that.$nextTick(() => {
              // var test = gsap.getProperty(grid[0], "height");
              // gsap.to(grid[0], { height: test, duration: 1 });
              // console.log("test ", test);
              // });
            },
            onUpdate: () => {
              // that.$nextTick(() => {
              //   console.log(window.getComputedStyle(grid[0]).height);
              // });
              // grid[0].style.height = `${grid[0].scrollHeight}px`;
              // gsap.set(grid[0], { height: grid[0].scrollHeight });
            },
            onComplete: () => {
              gsap.fromTo(
                footer,
                { opacity: 0 },
                { opacity: 1, duration: 0.2 }
              );

              // that.$nextTick(() => {
              // gsap.to(grid[0], { height: "auto", duration: 1 });
              // });
              // gsap.to(grid[0], { height: startHeight });
              // that.$nextTick(() => {
              //   var test = gsap.getProperty(grid[0], "height");
              //   gsap.to(grid[0], {
              //     height: test,
              //     duration: 1,
              //     // clearProps: "height",
              //   });
              //   console.log("test ", test);
              // });
            },
            onEnter: (elements) =>
              gsap.fromTo(
                elements,
                {
                  opacity: 0,
                  scale: 0.8,
                },
                {
                  opacity: 1,
                  scale: 1,
                  stagger: 0.1,
                  duration: 0.375,
                }
              ),
            onLeave: (elements) =>
              gsap.fromTo(
                elements,
                {
                  opacity: 1,
                  scale: 1,
                },
                {
                  opacity: 0,
                  scale: 0.8,
                  stagger: 0.1,
                  duration: 0.375,
                }
              ),
          });
        },
        once: true, // removes the action from its batch when animate() is called
      });
      this.batch.getState();
      this.$nextTick(() => {
        if (this.currentActiveTags.length == 0) {
          projects.forEach((el) => {
            this.removeClassByPrefix(el, "project-width-");
            el.dataset.newWidth = null;
            el.classList.add(el.dataset.originalWidth);
          });
        } else {
          // console.log(this.visibleProjects.length, projects.length);
          let visibleProjectsLength = this.visibleProjects.length;
          let positions = this.orderPositions[5];
          console.log(projects);
          if (visibleProjectsLength >= 3)
            positions =
              this.orderPositions[
                this.$helpers.getRandomIntInRange(0, 1, true)
              ];
          if (visibleProjectsLength == 2)
            positions =
              this.orderPositions[
                this.$helpers.getRandomIntInRange(2, 4, true)
              ];
          // if(visibleProjectsLength <= 1) positions = this.orderPositions[5]
          positions = shuffledArr(positions);
          console.log("positions ", positions, visibleProjectsLength);
          projects.forEach((el, i) => {
            // console.log(i);
            this.removeClassByPrefix(el, "project-width-");
            let className =
              "project-width-" + positions[i % visibleProjectsLength];
            if (
              el
                .querySelector(".grid-item-tags")
                .innerHTML.toLowerCase()
                .includes("typefaces")
            ) {
              className = "project-width-8";
              // console.log(className);
            }

            el.classList.add(className);
            el.dataset.newWidth = className;
            // el.classList.add("project-width-" + this.$helpers.getRandomIntInRange(2, 8, true))
          });
        }

        // console.log(this.batch);
        this.batch.run(true);

        // console.log(grid[0].scrollHeight);
        window.scrollTo({
          top: window.innerHeight * (this.isMobile ? 0.55 : 0.85),
          left: 0,
          behavior: "smooth",
        });
        // var endHeight = gsap.getProperty(".kimera-flex-grid", "height");
        // console.log(startHeight, endHeight);
        // var flip = Flip.from(state, {
        //   duration: 0.375 * 2,
        //   ease: "power3.inOut",
        //   stagger: 0.075,
        //   absolute: true,
        //   // props: "flexBasis,width",
        //   nested: true,
        //   // prune: true,
        //   // absoluteOnLeave: true,
        //   onEnter: elements => gsap.fromTo(elements, {
        //     opacity: 0,
        //     scale: 0.8,
        //   }, {
        //     opacity: 1,
        //     scale: 1,
        //     stagger: 0.1,
        //     duration: .375,
        //   }),
        //   onLeave: elements => gsap.fromTo(elements, {
        //     opacity: 1,
        //     scale: 1
        //   }, {
        //     opacity: 0,
        //     scale: 0.8,
        //     stagger: 0.1,
        //
        //     duration: .375
        //   })
        // })

        // console.log(_state);
        //
        // setTimeout(() => {
        //   Flip.fromTo(
        //     _state,
        //     {
        //       height: startHeight,
        //     },
        //     {
        //       height: endHeight,
        //       clearProps: "height",
        //       duration: 1,
        //     },
        //     0
        //   );
        // }, 100);
      });
      // this.$nextTick(() => {
      //   var endHeight = gsap.getProperty(".kimera-flex-grid", "height");
      //   console.log(startHeight, endHeight);
      // });
    },
    changeFilter(payload) {
      this.currentActiveTags = payload.map((el) => el.name);
      this.projects.forEach(
        (project) =>
          (project.show = this.compareTagArrays(
            this.currentActiveTags,
            project.project.content.tags
          ))
      );
      this.animateFilter();
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
    },
  },
  computed: {
    // sortedProjects() {
    //   this.projects.forEach(project => project.show = this.compareTagArrays(this.currentActiveTags, project.project.content.tags))
    //   // if (this.currentActiveTags.length == 0) this.projects.forEach(project => project.width = project.originalWidth)
    //   // else
    //   return this.projects.filter(el => el.show)
    //   // return this.currentActiveTags.length > 0 ? this.clonedProjects.filter(project => this.compareTagArrays(this.currentActiveTags, project.project.content.tags)) : this.projects
    // },
    ...mapGetters({
      isMobile: "isMobile",
    }),
    visibleProjects: {
      cache: false,
      get() {
        return this.projects.filter((el) => el.show);
      },
    },
    projects() {
      return this.story.content.projectPreviews;
    },
    // computedProjects() {
    //   return this.currentActiveTags.length == 0 ? this.story.content.projectPreviews :
    // },
  },
  created() {
    this.projects.forEach((el) => (el.show = true));
    this.projects.forEach((el) => (el.originalWidth = el.width));
    // this.clonedProjects = cloneDeep(this.story.content.projectPreviews)
  },
  beforeDestroy() {
    // console.log("DESTROYAED");
    // this.batch.kill()
  },
  mounted() {
    // console.log("BATCH ", Flip.batch("id"));
    this.batch = Flip.batch("id");

    // this.group = document.querySelector(".kimera-flex-grid");
    // this.group = document.querySelectorAll(".item")
    // this.states = Flip.getState('.project-preview');
    // this.clonedProjects.forEach(el => el.width = 8)
    this.$root.$on("activeTags", this.changeFilter);
    // this.animateFilter()
  },
};
</script>

<style lang="scss">
.index-grid {
  min-height: 105vh;
}
</style>
