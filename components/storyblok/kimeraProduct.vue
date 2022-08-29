<template>
<div v-editable="blok" class="kimera-product">
  <div ref="scroll" class="product-images">

    <component v-for="blok in blok.body" :key="blok._uid" :blok="blok" :is="blok.component" />
  </div>
  <div ref="sticky" class="product-description-wrapper">
    <div class="product-title">
      <h3>{{blok.productTitle}}</h3>
    </div>
    <div class="product-description">

      <component v-for="blok in blok.productBody" :key="blok._uid" :blok="blok" :is="blok.component" />
    </div>

  </div>

</div>
</template>

<script>
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export default {
  props: {
    blok: {
      type: Object,
      required: true
    }

  },
  methods: {
    handleScroll() {
      let stickyDom = this.$refs.sticky
      let scrollDom = this.$refs.scroll
      let topContainerDomHeight = document.querySelector(".project div")
        .getBoundingClientRect()
        .height
      let diff = window.scrollY - scrollDom.getBoundingClientRect()
        .height

      stickyDom.style.height = window.innerHeight - diff + 'px'
      stickyDom.style.maxHeight = clamp(window.scrollY + (window.innerHeight - topContainerDomHeight), 0, window.innerHeight) + 'px'
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    let a = document.querySelector(".product-description")
      .getBoundingClientRect()
      .height
    let b = document.querySelector(".product-title")
      .getBoundingClientRect()
      .height
    this.$refs.sticky.style.minHeight = a + b + 'px'
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll()
  }
}
</script>

<style lang="scss">
.kimera-product {
    display: grid;
    height: 100%;
    display: grid;
    grid-gap: var(--kimera-grid-gap);
    // row-gap: 14px;
    /* padding-left: var(--kimera-side-padding); */
    /* padding-right: var(--kimera-side-padding); */
    grid-template-columns: repeat(8, 1fr);
    position: relative;
    .product-images {
        grid-area: 1 / 1 / 1 / 7;
    }
    .product-description-wrapper {
        grid-column-start: 7;
        grid-column-end: 9;
        // grid-area: 1 / 1 / 1 / 2;
        position: sticky;
        top: 0;
        // height: 100%;
        max-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: var(--kimera-grid-gap);
        padding-right: var(--kimera-grid-gap);
    }
    .product-title {
        padding-bottom: 2rem;
    }
}
</style>
