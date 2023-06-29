<template>
  <div class="layout-wrapper">
    <kimera-intro-sequence></kimera-intro-sequence>
    <kimera-navigation></kimera-navigation>
    <div class="page-overlay h-w-100 fixed fixed-reset"></div>

    <Nuxt class="layout-inner" />
    <!-- <Nuxt class="layout-inner" keep-alive :keep-alive-props="{ include: ['index'] }" /> -->
    <kimera-footer :key="this.$route.name"></kimera-footer>
  </div>
</template>

<script>
import throttle from "lodash/throttle";

export default {
  // fetchKey: "kimera-font-data",
  async fetch() {
    // let fontData = await this.$axios.$get("/api/tags.json");
    // let fontData = await this.$axios.$get(
    //   "https://zwickmueller.github.io/kimera-corp-json-store/fontData.json"
    // );
    // this.$store.commit("fontData/initiateFontData", fontData);
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.$store.commit("setWindowWidth", window.innerWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize: throttle(function () {
      this.$store.commit("setWindowWidth", window.innerWidth);
    }, 200),
  },
};
</script>

<style lang="scss">
.page-overlay {
  background: var(--white);
  z-index: 3;
  opacity: 0;
  pointer-events: none;
}
.nav-height-adjustment {
  padding-top: var(--nav-height);
}

.layout-inner {
  padding: var(--main-padding);
}
</style>
