<template lang="html">
  <div v-editable="blok" class="kimera-text" :style="`columns: ${blok.columns}`" v-html="richtext" >

</div>
</template>

<script>
import {
  renderRichText
} from "@storyblok/nuxt";
import {
  useStoryblokBridge,
  useStoryblokApi
} from "@storyblok/nuxt";
// const storyblokApi = useStoryblokApi();
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  computed: {
    richtext() {
      return useStoryblokApi()
        .richTextResolver.render(this.blok.text)
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>

</style>
