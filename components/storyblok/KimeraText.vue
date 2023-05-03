<template lang="html">
  <div
    v-editable="blok"
    class="kimera-text"
    :style="`columns: ${blok.columns}`"
    v-html="richtext"
  ></div>
</template>

<script>
// import { renderRichText } from "@storyblok/nuxt-2";
import { useStoryblokApi } from "@storyblok/nuxt-2";
// const storyblokApi = useStoryblokApi();
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  computed: {
    richtext() {
      if (this.blok.content)
        return useStoryblokApi().richTextResolver.render(this.blok);
      return useStoryblokApi().richTextResolver.render(this.blok.text);
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.kimera-text {
  @include until($tablet) {
    padding: 0 calc(var(--kimera-grid-gap));
    columns: 1 !important;
    h4:not(:first-child) {
      padding-top: 1rem;
    }
  }
}
</style>
