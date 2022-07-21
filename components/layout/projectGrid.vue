<template>
<div class="kimera-project-grid">

  <single-grid :projects="mockupData"></single-grid>
</div>
</template>

<script>
const mockupData = [{
    title: "Waldenburg Typeface",
    tags: ['typefaces', 'in-house', 'sans serif'],
    media: [{
      src: require('@/assets/img/Waldenburg.png'),
    }]
  },
  {
    title: "Waldenburg Poster",
    tags: ['products', 'poster'],
    width: 2,
    media: [{
      src: require('@/assets/img/Waldenburg_plakat.png'),
    }]
  },
  {
    title: "Souvenir Brand Makeover",
    tags: ['services', 'branding'],
    media: [{
      src: require('@/assets/img/souvenir.png'),
    }]
  },
  {
    title: "Transmoderna Identity",
    tags: ['services', 'branding'],
    width: 2,
    media: [{
      src: require('@/assets/img/transmoderna.png'),
    }]
  },
  {
    title: "Test Project",
    width: 6,
    tags: ['services', 'editorial', 'catalogue'],
    media: [{
      src: require('@/assets/img/test.png'),
    }]
  },

]
export default {
  data() {
    return {
      mockupData
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
