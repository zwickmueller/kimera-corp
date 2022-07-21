<template>
<div class="kimera-landing">
  <div ref="stickyElement" class="landing-title fixed-reset">
    <div :style="`height: ${stickyHeight}px`">

      <p :class="[stickyHeight < 150 ? 'fade-title' : '',mockupData[0].color == 'white' ? 'text-kimera-white':'' ]" class="kimera-text-kacheln">
        {{mockupData[0].title}}
      </p>
    </div>
  </div>
  <img :src="mockupData[0].image" alt="">
</div>
</template>

<script>
const mockupData = [{
  title: "Souvenir Official Brand Makeover",
  image: require('@/assets/img/Bild1.png'),
  color: 'white'
}]
export default {
  data() {
    return {
      mockupData,
      stickyHeight: 0
    }
  },
  // computed: {
  //   stickyHeight() {
  //     if (!process.client || !window) return
  //     return window.scrollY
  //   }
  // },
  methods: {
    handleScroll() {
      this.stickyHeight = this.$refs.stickyElement.getBoundingClientRect().height - window.scrollY
    },
  },
  created() {},
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {

    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll()
  }
}
</script>

<style lang="scss" scoped>
.kimera-landing {
    img {
        width: 100%;
        object-fit: cover;
    }
    .landing-title {
        padding-left: var(--kimera-side-padding);

        position: absolute;
        height: 100%;
        display: flex;
        align-items: center;
        div {
            position: sticky;
            display: flex;
            align-items: center;
            top: 50%;
            // transform: translateY(-50%);
            p {
                transition: opacity 0.37s ease;
                opacity: 1;
                &.fade-title {
                    opacity: 0;
                }
            }
        }
    }
    position: relative;
    display: flex;
    max-height: 90vh;
}
</style>
