<template>
<div v-editable="blok" class="services-container" :style="{height: blok.height ? blok.height : '', background: blok.background ? blok.background : '', padding: blok.padding? '4em' : ''}" :class="blok.objectFit ? blok.objectFit : ''">

  <component v-for="blok in blok.body" :key="blok._uid" :blok="blok" :is="blok.component" />
</div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }

  }
}
</script>

<style lang="scss">
.services-container {
    max-height: 100vh;
    width: 100%;
    height: 100vh;
    display: flex;
    overflow: hidden;
    min-height: 20em;
    .kimera-image,
    picture {
        height: 100%;
        width: 100%;
    }
    img,
    img.image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    &.contain {
        img,
        img.image {
            object-fit: contain;
        }
    }
    &.cover {
        img,
        img.image {
            object-fit: cover;
        }
    }
}
</style>
