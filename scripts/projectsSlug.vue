<template>
  <main class="kimera-project">
    <!-- <landing-page-gallery></landing-page-gallery>
  <project-grid></project-grid>
 -->
    <!-- PROJECT -->
    <kimera-typetester
      v-if="$route.fullPath.includes('typefaces') && isTypetesterOpen"
    ></kimera-typetester>
    <component
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
      :is="story.content.component"
    />
  </main>
</template>

<script>
import { useStoryblokBridge, useStoryblokApi } from "@storyblok/nuxt-2";
import projectTransition from "./projectTransition";

export default {
  data() {
    return {
      story: "",
    };
  },
  transition: projectTransition,
  scrollToTop: false,

  // asyncData: async ({
  //   app,
  //   route
  // }) => {
  //   // const storyblokApi = useStoryblokApi();
  //   // console.log(route.path);
  //   // const {
  //   //   data
  //   // } = await storyblokApi.get("cdn/stories/projects/test", {
  //   //   version: "draft",
  //   // })
  //   const {
  //     data
  //   } = await app.$storyapi.get("cdn/stories" + route.path, {
  //     version: "draft",
  //     resolve_relations: "kimera-project-preview.project",

  //   });

  //   return {
  //     story: data.story
  //   }
  // },
  // fetchKey: "kimera-font-data",
  // async fetch() {
  //   let fontData = await this.$axios.$get(
  //     "https://zwickmueller.github.io/kimera-corp-json-store/fontData.json"
  //   );

  //   this.$store.commit("fontData/initiateFontData", fontData);
  // },
  asyncData: async (context) => {
    const { app, route, store, $axios } = context;
    const version =
      context.query._storyblok ||
      context.isDev ||
      process.env.APP_ENV === "development"
        ? "draft"
        : "published";

    const { data } = await app.$storyapi.get("cdn/stories" + route.path, {
      version: version,
      resolve_relations: "kimera-project-preview.project",
      // resolve_relations: "kimera-project-preview.project",
      // version: "draft",
    });
    // console.log(data);
    // console.log("asdsad");
    if (process.env.NODE_ENV === "development") {
      // let fontData = await $axios.$get("/api/fontData.json");
      // let fontData = await $axios.$get(
      //   "https://zwickmueller.github.io/kimera-corp-json-store/fontData.json"
      // );
      // console.log(fontData);
      // store.commit("fontData/initiateFontData", fontData);
      // let tags = await $axios.$get("/api/tags.json");
      // let tags = await $axios.$get(
      //   "https://zwickmueller.github.io/kimera-corp-json-store/tags.json"
      // );
      // store.commit("setTags", tags);
    }
    return {
      story: data.story,
    };
  },

  computed: {
    isTypetesterOpen() {
      return this.$store.state.typetester.isTypetesterOpen;
    },
  },
  mounted() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
    useStoryblokBridge(this.story.id, (newStory) => (this.story = newStory));
  },
};
</script>

<style lang="scss"></style>
