<template>
  <div class="text" v-editable="blok" v-html="richtext"></div>
</template>

<script>
import { useStoryblokApi } from "@storyblok/nuxt-2";

export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  computed: {
    richtext() {
      const api = useStoryblokApi();
      return this.blok.text ? api.richTextResolver.render(this.blok.text) : "";
    },
  },
};
</script>

<style lang="scss">
.text p {
  padding-bottom: 0.5rem;
}
</style>
