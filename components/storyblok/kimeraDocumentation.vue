<template>
  <div class="kimera-documentation-slider">
    <!-- <flicking
      ref="flicking"
      :options="options"
      :viewportTag="'div'"
      :cameraTag="'div'"
    >
      <div class="docu-slide" v-for="_blok in blok.body"> -->
    <!-- <client-only> -->
    <flickity ref="flickity" :options="flickityOptions">
      <component
        class="flickity-slide"
        v-for="_blok in blok.body"
        :key="_blok._uid"
        :blok="_blok"
        :is="_blok.component"
      />
    </flickity>
    <!-- </client-only> -->

    <!-- </div> -->
    <!-- </flicking> -->
  </div>
</template>

<script>
// import Flickity from "vue-flickity";
import imagesLoaded from "imagesloaded";

export default {
  // components: {
  //   Flickity,
  // },
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        // groupCells: 2,
        cellAlign: "left",

        pageDots: false,
        on: {
          ready: () => {
            imagesLoaded(this.$refs.flickity, this.loadComplete);
          },
        },
        // wrapAround: "fill",
        // setGallerySize: false,
        // any options from Flickity can be used
      },
    };
  },
  methods: {
    loadComplete() {
      if (this.$refs.flickity) {
        this.$refs.flickity.reloadCells();
      }
    },
  },
  mounted() {
    // console.log(this.$refs.flickity);
    // this.$refs.flickity.resize();
  },
};
</script>
<style lang="scss">
.kimera-documentation-slider {
  //   .flicking-camera {
  //     gap: calc(var(--kimera-grid-gap) / 2);
  //   }
  //   .flicking-camera > div {
  //     height: fit-content;
  //     font-size: 0;
  //   }
  //   .docu-slide {
  //     height: 50vh;
  //     // max-height: 50vw;
  //     display: flex;
  //     * {
  //       pointer-events: none;
  //       // pointer-events: none;
  //       user-select: none;
  //     }
  //   }
  .flickity-viewport {
    // height: 100%;
    // min-height: 40vh;
    img {
      //   height: %;
      width: calc(100% - 2rem);
      max-height: max(65vh, 30rem);
      border-radius: var(--kimera-border-radius);
      @include until($tablet) {
        margin-right: calc(var(--kimera-grid-gap));
        width: calc(100%) !important;
      }
    }
  }
  .flickity-slide:first-child {
    // padding-left: var(--kimera-side-padding);
  }
  .flickity-slide:last-child {
    // padding-right: var(--kimera-side-padding);
  }
  .flickity-slide {
    display: flex;
    padding-right: calc(var(--kimera-grid-gap) / 2);
    flex-direction: row;
    @include until($tablet) {
      padding-right: 0;
      max-width: calc(100% - 1rem);
    }
    // div {
    // }
    // height: 100%;
  }
}
</style>
