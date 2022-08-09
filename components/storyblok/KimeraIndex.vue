<template>
<div v-editable="story" class="page">
  <landing-page-gallery :elements="story.content.slideShow"></landing-page-gallery>
  <!-- <project-grid></project-grid> -->
  <!-- <div class="kimera-grid"> -->
  <!-- <single-grid> -->
  <transition-group name="fade" tag="div" class="kimera-grid">
    <component ref="projects" v-for="blok in sortedProjects" :key="blok._uid" :blok="blok" :is="blok.component" v-if="blok.show" :class="currentActiveTags.length > 0 ? 'is-currently-filtering' : ''" />
  </transition-group>
  <!-- </single-grid> -->
  <!-- </div> -->
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

export default {
  data() {
    return {
      currentActiveTags: [],
      states: null
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

    compareTagArrays(arr1, arr2) {
      return arr1.every(item => arr2.includes(item))
    },
    changeFilter(payload) {
      this.currentActiveTags = payload.map(el => el.name)
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
    sortedProjects() {
      this.projects.forEach(project => project.show = this.compareTagArrays(this.currentActiveTags, project.project.content.tags))
      // if (this.currentActiveTags.length == 0) this.projects.forEach(project => project.width = project.originalWidth)
      // else
      return this.projects
      // return this.currentActiveTags.length > 0 ? this.clonedProjects.filter(project => this.compareTagArrays(this.currentActiveTags, project.project.content.tags)) : this.projects
    },
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
    // this.states = Flip.getState('.project-preview');
    // this.clonedProjects.forEach(el => el.width = 8)
    this.$root.$on('activeTags', this.changeFilter)
  }
}
</script>

<style lang="scss">
.is-currently-filtering {
    transition: all 1s ease;
}
.test {
    grid-column: span 2 / auto !important;
}
</style>
