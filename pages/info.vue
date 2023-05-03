<template>
  <main id="info"></main>
</template>

<script>
import { useStoryblokBridge, useStoryblokApi } from "@storyblok/nuxt-2";

export default {
  name: "info",
  data() {
    return {
      story: "",
    };
  },
  asyncData: async (context) => {
    const { app, store } = context;
    const version =
      context.query._storyblok || context.isDev ? "draft" : "published";

    const { data } = await app.$storyapi.get("cdn/stories/info", {
      version: version,
      // resolve_relations: "kimera-project-preview.project",
      // version: "draft",
    });
    store.commit("setInfoContent", data.story);

    console.log(data);
    return {
      story: data.story,
    };
  },
  mounted() {
    useStoryblokBridge(this.story.id, (newStory) => {
      this.story = newStory;
      this.$store.commit("setInfoContent", newStory);
    });
    // const info = document.querySelector("#info");
    // const footer = document.querySelector("footer");
    // footer.appendChild(info);
  },
};
</script>

<style lang="css" scoped></style>
