<template>
  <nuxt-link
    :to="{ path: '/' + blok.project.full_slug }"
    ref="link"
    v-editable="blok"
    event="disabled"
    class="grid-item project-preview"
    @click.native="handleClick"
    :data-original-width="`grid-width-${width}`"
    data-new-width="null"
  >
    <!-- event="disabled" -->
    <div class="grid-item-tags">
      <div class="hide-on-desktop mobile-project-name kimera-text-mobile">
        {{
          project
            ? project.name
            : "~storyblok bug, changes are visible after save~"
        }}
      </div>
      <div class="tags kimera-text-filter-tags">
        <span v-if="project" v-for="(tag, index) in tags"
          >{{ tag }}{{ index < project.tags.length - 1 ? ", " : "" }}
        </span>
        <span v-else> ~</span>
      </div>
    </div>
    <!-- :class="checkProjectType" -->
    <div
      class="grid-item-inner center-all relative kimera-text-kacheln"
      :class="checkClasses"
      :title="
        project
          ? project.name
          : '~storyblok bug, changes are visible after save~'
      "
      :target-height="checkTargetHeight"
    >
      <div
        class="grid-item-overlay overlay-foreground h-w-100p fixed-reset absolute"
      ></div>
      <kimera-image :blok="blok"></kimera-image>
      <!-- <image-container :blok="blok.src[0]"></image-container> -->
      <div
        class="grid-item-overlay overlay-background h-w-100p fixed-reset absolute"
      ></div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  data() {
    return {
      wasClicked: false,
    };
  },
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  onBeforeRouteLeave(to, from, next) {
    // console.log("ASDASD ASODJIKOA SIjd");
    // Add a delay before allowing the navigation to proceed
    setTimeout(() => next(), 1000);
  },
  methods: {
    handleClick($event) {
      // $event.preventDefault();
      // this.$nextTick(() => {
      this.$root.lastClickedImageId = this.blok.src.id;
      $event.target.parentNode.parentNode.classList.add("clicked");
      // this.$refs.link.$el.classList.add("clicked");
      // });
      console.log($event.target.parentNode.parentNode);
      const url = $event.target.parentNode.parentNode.pathname;
      console.log($event.target.parentNode.parentNode.pathname);
      setTimeout(() => {
        this.$router.push(url);
      }, 100); // Delay of 1 second
    },
    stringExists(arr, val) {
      const result = arr.findIndex(
        (item) => val.toUpperCase() === item.toUpperCase()
      );
      if (result !== -1) {
        return true;
      }
      return false;
    },
  },
  destroyed() {
    this.wasClicked = false;
  },
  computed: {
    project() {
      return this.blok.project.content;
    },
    width() {
      return this.blok.width;
    },
    tags() {
      return this.project && this.project.tags ? this.project.tags : ["~"];
    },
    checkTargetHeight() {
      if (!this.project) return "";
      if (!this.project.body) return "";
      const body = this.project.body[0];
      if (body.component == "image-container" && body.height)
        return body.height;
      else return "100vh";
    },
    checkClasses() {
      if (!this.blok) return "";
      const padding = this.blok.padding ? "padding-4" : "";
      const objectFit = this.blok.objectFit ? "contain" : "cover";
      return [padding, objectFit];
    },
    // checkProjectType() {
    //   if (this.tags[0] == "~") return "";
    //   if (this.stringExists(this.project.tags, "services")) return "services";
    //   if (this.stringExists(this.project.tags, "typefaces")) return "typefaces";
    //   if (this.stringExists(this.project.tags, "products")) return "products";
    //   return "";
    // },
  },
  mounted() {
    this.$refs.link.$el.classList.add(
      this.$refs.link.$el.dataset.originalWidth
    );
    // console.log(this.project);
  },
};
</script>

<style lang="scss">
.project {
  .grid-item-tags {
    display: none;
  }
}
.kimera-container-inner .kimera-flex-grid a:first-child {
  padding-top: 0;
}
.grid-item-inner.is-transitioning {
  // z-index: 10;
  // position: fixed;
  // height: 80vh !important;
  // width: 100vw;
  // top: 0;
  // left: 0;
}
.grid-item {
  min-height: 30em;
  height: 33vh;
  position: relative;
  @include until($tablet) {
    min-height: unset;
    height: auto;
    padding-top: 1rem;
    // aspect-ratio: 1;
  }
  .kimera-image {
    z-index: 1;
  }
}
.grid-item-tags {
  padding: 2px 0;
  @include until($tablet) {
    .tags {
      color: var(--kimera-grey);
    }
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
}
.grid-item-overlay.overlay-background {
  z-index: 0;
  background: transparent;
}
.grid-item-overlay.overlay-foreground {
  mix-blend-mode: lighten;
  z-index: 2;
  background: transparent;
}

.grid-item-overlay {
  transition: background 0.35s cubic-bezier(0.055, 0.315, 0.355, 1.02);
  border-radius: var(--kimera-border-radius);
  overflow: hidden;
}
.grid-item-inner {
  overflow: hidden;
  border-radius: var(--kimera-border-radius);
  background: var(--kimera-white);
  height: 100%;
  @include until($tablet) {
    height: auto;
  }
  &:not(.is-transitioning):before {
    content: attr(title);
    // width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 3;
    display: flex;
    align-items: center;
    pointer-events: none;
    transform: translateX(-100%);
    transition: transform 0.37s cubic-bezier(0, 1.65, 0.475, 1.005);
    @include until($tablet) {
      content: "";
      // transform: translateX(0%);
      // align-items: flex-end;
      // padding: 1rem;
      // width: 100%;
      // background: linear-gradient(0deg, var(--kimera-grey), transparent 4rem);
    }
  }
  &:not(.is-transitioning):hover {
    @include from($tablet) {
      &:before {
        transform: translateX(0%);
      }
      .grid-item-overlay {
        background: #c4c4c4;
      }
      .grid-item-overlay.overlay-background {
        background: #f7f7f7;
      }

      .grid-item-overlay {
      }
      .kimera-image img {
        filter: grayscale(100%) contrast(0.6) brightness(1.4);
        mix-blend-mode: multiply;
        opacity: 0.2;
        // transform: scale(1.05);
        // filter: grayscale(100%) contrast(0.6) brightness(1.6);
        // mix-blend-mode: multiply;
        // opacity: 0.4;
      }
    }
  }
  &:not(.is-transitioning):hover {
    @include from($tablet) {
      .grid-item-overlay.overlay-background {
        background: #fff;
      }
    }
  }
  .kimera-image img {
    // border-radius: var(--kimera-border-radius);
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.055, 0.315, 0.355, 1.02);
    z-index: 1;
    opacity: 1;
  }
  picture {
    // height: auto;
    // max-height: 100%;
    width: 100%;
    height: 100%;
  }
  img {
    height: 100%;
    width: 100%;
    // object-fit: cover;
  }
  // .image-container {
  //   height: unset !important;
  // }
  // &.products {
  //   img {
  //     width: 100%;
  //     height: 100%;
  //     object-fit: contain;
  //     padding: 4em;
  //     // @include until($tablet) {
  //     //   padding: 0;
  //     // }
  //   }
  // }

  // &.services img {
  //   width: 100%;
  //   height: 100%;
  //   object-fit: cover;
  // }
  // &.typefaces img {
  //   width: 100%;
  //   height: 100%;
  //   object-fit: contain;
  //   padding: 6em;
  //   @include until($tablet) {
  //     // padding: 0;
  //   }
  // }
}
</style>
