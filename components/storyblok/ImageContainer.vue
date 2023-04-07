<template>
  <div
    v-editable="blok"
    class="image-container"
    :style="style"
    :class="blok.objectFit ? blok.objectFit : ''"
  >
    <component
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
      :is="blok.component"
      :height="style.height"
    />
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  computed: {
    style() {
      return {
        height: this.blok.height ? this.blok.height : "100vh",
        background: this.blok.background ? this.blok.background : "",
        padding: this.blok.padding ? "4em" : "",
        maxHeight: this.blok.height == "auto" ? "none" : "",
      };
    },
  },
};
</script>

<style lang="scss">
.project .image-container:not(:first-child) {
  @include until($tablet) {
    flex-direction: column;
    height: 100% !important;
    max-height: initial !important;
  }
}
.project .image-container:first-child {
  @include until($tablet) {
    flex-direction: column;
    height: 60vh !important;
    max-height: initial !important;
  }
}
.image-container {
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
