<template>
<div class="">
  <!-- <kimera-slideshow></kimera-slideshow> -->
  <!-- <page v-if="story.content.component" :key="story.content._uid" :blok="story.content" /> -->
  <!-- <component v-for="blok in story.content.body" :key="blok._uid" :blok="blok" :is="blok.component" />
 -->
  <div class="" style="height: 10vh">

  </div>
  <kimera-typetester-preview></kimera-typetester-preview>

  <!-- <transition name="fade"> -->
  <client-only>
    <kimera-typetester v-if="isTypetesterOpen"></kimera-typetester>
  </client-only>
  <!-- </transition> -->
  <div class="">

    <kimera-typetester-preview v-for="typetest in customTypetests" :typetester="typetest" :key="String(typetest.timestamp)"></kimera-typetester-preview>
  </div>
  <!-- <button type="button" name="button" @click="test">test </button> -->
  <!-- <div class="" contenteditable="true">

    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div> -->

</div>
</template>

<script>
import {
  useStoryblokBridge,
  useStoryblokApi
} from "@storyblok/nuxt";
import {
  mapGetters
} from 'vuex'

export default {
  data() {
    return {
      story: '',
      openTypetester: false
    }
  },

  asyncData: async ({
    app
  }) => {
    const storyblokApi = useStoryblokApi();
    const {
      data
    } = await storyblokApi.get("cdn/stories/home", {
      version: "draft",
    })
    // OR: const { data } = await app.$storyapi.get("cdn/stories/vue", { version: "draft" });

    return {
      story: data.story
    }
  },
  methods: {
    test() {

    }
  },
  computed: {
    ...mapGetters({
      getCustomTypetestsByPath: 'typetester/getCustomTypetestsByPath',
      // ...
    }),
    isTypetesterOpen() {
      return this.$store.state.typetester.isTypetesterOpen
    },
    typetests() {
      return this.$store.state.typetester.customTypetests
    },
    customTypetests() {
      return this.getCustomTypetestsByPath(this.$route.fullPath)
    },
  },
  mounted() {
    // console.log(this.$store.getters["typetester/getCustomTypetestsByPath"]('home'));
    console.log(useStoryblokApi());
    useStoryblokBridge(this.story.id, (newStory) => (this.story = newStory));
  }
};
</script>

<style lang="scss">

</style>
