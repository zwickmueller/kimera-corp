<template>
<div class="">
  <!-- <landing-page-gallery></landing-page-gallery>
  <project-grid></project-grid>
 -->
  <!-- PROJECT -->
  <component v-if="story.content.component" :key="story.content._uid" :blok="story.content" :is="story.content.component" />

</div>
</template>

<script>
import {
  useStoryblokBridge,
  useStoryblokApi
} from "@storyblok/nuxt";
import projectTransition from '../../scripts/projectTransition'

export default {
  data() {
    return {
      story: ''
    }
  },
  transition: projectTransition,
  scrollToTop: false,

  asyncData: async ({
    app,
    route
  }) => {
    // const storyblokApi = useStoryblokApi();
    // console.log(route.path);
    // const {
    //   data
    // } = await storyblokApi.get("cdn/stories/projects/test", {
    //   version: "draft",
    // })
    const {
      data
    } = await app.$storyapi.get("cdn/stories" + route.path, {
      version: "draft",
      resolve_relations: "kimera-project-preview.project",

    });

    return {
      story: data.story
    }
  },
  mounted() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    useStoryblokBridge(this.story.id, (newStory) => (this.story = newStory));
  }
};
</script>

<style lang="scss">

</style>
