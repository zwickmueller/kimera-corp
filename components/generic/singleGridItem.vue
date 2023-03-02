<template>
  <div class="grid-item" :style="`grid-column: span ${width}`">
    <div class="grid-item-tags kimera-text-filter-tags">
      <span v-for="(tag, index) in project.tags"
        >{{ tag }}{{ index < project.tags.length - 1 ? ", " : "" }}
      </span>
    </div>
    <div
      class="grid-item-inner center-all relative kimera-text-kacheln"
      :class="checkProjectType"
      :title="project.title"
    >
      <div
        class="grid-item-overlay overlay-foreground h-w-100p fixed-reset absolute"
      ></div>
      <img :src="project.media[0].src" alt="" />
      <div
        class="grid-item-overlay overlay-background h-w-100p fixed-reset absolute"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    project: {},
    width: {
      default: 3,
      // type: Number
    },
  },
  methods: {
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
  computed: {
    checkProjectType() {
      if (this.stringExists(this.project.tags, "services")) return "services";
      if (this.stringExists(this.project.tags, "typefaces")) return "typefaces";
      if (this.stringExists(this.project.tags, "products")) return "products";
      return "";
    },
  },
};
</script>

<style lang="scss" scoped>
.grid-item {
  min-height: 30em;
  height: 33vh;
}
.grid-item-tags {
  padding: 2px 0;
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
  &:before {
    content: attr(title);
    // width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 3;
    display: flex;
    align-items: center;
    transform: translateX(-100%);
    transition: transform 0.37s cubic-bezier(0, 1.65, 0.475, 1.005);
  }
  &:hover {
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
    img {
      filter: grayscale(100%) contrast(0.6) brightness(1.6);
      mix-blend-mode: multiply;
      opacity: 0.4;
    }
  }
  img {
    border-radius: var(--kimera-border-radius);
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.055, 0.315, 0.355, 1.02);
    z-index: 1;
    opacity: 1;
  }
  &.products img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 4em 0;
  }
  &.services img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &.typefaces img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 6em;
  }
}
</style>
