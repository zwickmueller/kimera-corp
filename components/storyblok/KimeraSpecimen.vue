<template>
<div class="kimera-specimen">
  <kimera-image :blok="blok"></kimera-image>
  <!-- {{blok}} -->
  <a class="specimen-inner" :href="blok.pdf.filename" target="_blank">
    <tag-button>Download</tag-button>
  </a>
</div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    },
  },
}
</script>

<style lang="scss" scoped>
.kimera-specimen {
    max-width: 30rem;
    margin: 0 auto;
    position: relative;
    cursor: pointer;
    &:hover {
        .specimen-inner {

            opacity: 1;
        }
    }
    .specimen-inner {
        opacity: 0;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(#eaeaea, .5);
        transition: opacity 0.3s ease;
    }
    // border-radius: var(--kimera-border-radius);
    // overflow: hidden;
}
</style>
