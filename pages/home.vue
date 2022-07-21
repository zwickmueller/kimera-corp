<template>
<div class="">
  <test-component></test-component>
  <page v-if="story.content.component" :key="story.content._uid" :blok="story.content" />
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
    console.log(useStoryblokApi());
    useStoryblokBridge(this.story.id, (newStory) => (this.story = newStory));
  }
};
</script>

<style lang="scss">

</style>
