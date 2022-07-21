<template>
<div class="">
  <landing-page-gallery></landing-page-gallery>
  <project-grid></project-grid>
  <!-- <div class="" style="height: 200vh;">

  </div> -->
</div>
</template>

<script>
import {
  useStoryblokBridge,
  useStoryblokApi
} from "@storyblok/nuxt";

export default {
  data() {
    return {
      story: ''
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
  mounted() {
    useStoryblokBridge(this.story.id, (newStory) => (this.story = newStory));
  }
};
</script>

<style lang="scss">

</style>
