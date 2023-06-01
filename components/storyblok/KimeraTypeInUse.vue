<template>
  <a
    :href="blok.link"
    target="_blank"
    ref="link"
    v-editable="blok"
    class="grid-item project-preview grid-width-2 type-in-use"
  >
    <!-- event="disabled" -->
    <div class="grid-item-tags">
      <div class="hide-on-desktop mobile-project-name kimera-text-mobile">
        {{
          blok ? blok.name : "~storyblok bug, changes are visible after save~"
        }}
      </div>
    </div>
    <div
      class="grid-item-inner center-all relative kimera-text-kacheln services"
      :title="
        blok ? blok.name : '~storyblok bug, changes are visible after save~'
      "
    >
      <div
        class="grid-item-overlay overlay-foreground h-w-100p fixed-reset absolute"
      ></div>
      <kimera-image class="cover" :blok="blok" v-if="!blok.src2"></kimera-image>
      <component
        v-else
        v-for="_blok in blok.src2"
        :key="_blok._uid"
        :blok="_blok"
        :is="_blok.component"
      />
      <div
        class="grid-item-overlay overlay-background h-w-100p fixed-reset absolute"
      ></div>
    </div>
    <div class="hide-on-desktop">{{ blok.name }}</div>
  </a>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  methods: {},

  computed: {},
  mounted() {
    // console.log(this.project);
  },
};
</script>

<style lang="scss">
.grid-item.type-in-use {
  @include from($tablet) {
    // height: 10rem;
    // min-height: 10rem;
    aspect-ratio: 1;
    min-height: unset;
    height: 100%;
  }
  .video-container {
    z-index: 1;
  }
}
// .project {
//   .grid-item-tags {
//     display: none;
//   }
// }

// .grid-item {
//   min-height: 30em;
//   height: 33vh;
//   position: relative;
//   @include until($tablet) {
//     min-height: unset;
//     height: auto;
//     padding-top: 1rem;
//     // aspect-ratio: 1;
//   }
//   .kimera-image {
//     z-index: 1;
//   }
// }
// .grid-item-tags {
//   padding: 2px 0;
//   @include until($tablet) {
//     .tags {
//       color: var(--kimera-grey);
//     }
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-end;
//   }
// }
// .grid-item-overlay.overlay-background {
//   z-index: 0;
//   background: transparent;
// }
// .grid-item-overlay.overlay-foreground {
//   mix-blend-mode: lighten;
//   z-index: 2;
//   background: transparent;
// }

// .grid-item-overlay {
//   transition: background 0.35s cubic-bezier(0.055, 0.315, 0.355, 1.02);
//   border-radius: var(--kimera-border-radius);
//   overflow: hidden;
// }
// .grid-item-inner {
//   overflow: hidden;
//   border-radius: var(--kimera-border-radius);
//   background: var(--kimera-white);
//   height: 100%;
//   @include until($tablet) {
//     height: auto;
//   }
//   &:not(.is-transitioning):before {
//     content: attr(title);
//     // width: 100%;
//     height: 100%;
//     top: 0;
//     left: 0;
//     position: absolute;
//     z-index: 3;
//     display: flex;
//     align-items: center;
//     pointer-events: none;
//     transform: translateX(-100%);
//     transition: transform 0.37s cubic-bezier(0, 1.65, 0.475, 1.005);
//     @include until($tablet) {
//       content: "";
//       // transform: translateX(0%);
//       // align-items: flex-end;
//       // padding: 1rem;
//       // width: 100%;
//       // background: linear-gradient(0deg, var(--kimera-grey), transparent 4rem);
//     }
//   }
//   &:not(.is-transitioning):hover {
//     &:before {
//       transform: translateX(0%);
//     }
//     .grid-item-overlay {
//       background: #c4c4c4;
//     }
//     .grid-item-overlay.overlay-background {
//       background: #f7f7f7;
//     }

//     .grid-item-overlay {
//     }
//     .kimera-image img {
//       filter: grayscale(100%) contrast(0.6) brightness(1.4);
//       mix-blend-mode: multiply;
//       opacity: 0.2;
//       // filter: grayscale(100%) contrast(0.6) brightness(1.6);
//       // mix-blend-mode: multiply;
//       // opacity: 0.4;
//     }
//   }
//   &:not(.is-transitioning):hover {
//     .grid-item-overlay.overlay-background {
//       background: #fff;
//     }
//   }
//   .kimera-image img {
//     border-radius: var(--kimera-border-radius);
//     overflow: hidden;
//     transition: all 0.3s cubic-bezier(0.055, 0.315, 0.355, 1.02);
//     z-index: 1;
//     opacity: 1;
//   }
//   picture {
//     height: 100%;
//     width: 100%;
//   }
//   &.products {
//     img {
//       width: 100%;
//       height: 100%;
//       object-fit: contain;
//       padding: 4em;
//       // @include until($tablet) {
//       //   padding: 0;
//       // }
//     }
//   }

//   &.services img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
//   &.typefaces img {
//     width: 100%;
//     height: 100%;
//     object-fit: contain;
//     padding: 6em;
//     @include until($tablet) {
//       // padding: 0;
//     }
//   }
// }
</style>
