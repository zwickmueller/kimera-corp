<template>
  <main class="">
    <kimera-index :story="story"></kimera-index>
  </main>
</template>

<script>
import { useStoryblokBridge, useStoryblokApi } from "@storyblok/nuxt-2";

import projectTransition from "../scripts/projectTransition";
export default {
  name: "index",
  scrollToTop: false,
  transition: projectTransition,
  data() {
    return {
      story: "",
    };
  },

  // asyncData: async ({ app }) => {
  //   const storyblokApi = useStoryblokApi();
  //   const { data } = await storyblokApi.get("cdn/stories/index", {
  //     resolve_relations: "kimera-project-preview.project",
  //     version: "draft",
  //   });
  // OR: const { data } = await app.$storyapi.get("cdn/stories/vue", { version: "draft" });
  asyncData: async (context) => {
    const { app } = context;
    const version =
      context.query._storyblok || context.isDev ? "draft" : "published";

    const { data } = await app.$storyapi.get("cdn/stories/index", {
      version: version,
      resolve_relations: "kimera-project-preview.project",
      // version: "draft",
    });
    return {
      story: data.story,
    };
  },
  mounted() {
    useStoryblokBridge(this.story.id, (newStory) => (this.story = newStory));
  },
};
</script>

<style lang="scss"></style>
