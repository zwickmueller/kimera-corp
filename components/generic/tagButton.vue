<template>
  <div
    v-if="isDiv"
    class="kimera-button kimera-text-filter"
    :class="getClasses"
  >
    <slot></slot>
  </div>
  <button
    v-else
    class="kimera-button kimera-text-filter button-reset"
    :class="getClasses"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    isDiv: {
      default: false,
    },
    isInverted: {
      default: false,
      type: Boolean,
    },
    isSmall: {
      default: false,
      type: Boolean,
    },
    isSecondary: {
      default: false,
      type: Boolean,
    },
    isActive: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    getClasses() {
      return {
        "is-inverted": this.isInverted,
        "is-small": this.isSmall,
        "is-secondary": this.isSecondary,
        "is-active": this.isActive,
      };
    },
  },
};
</script>

<style lang="scss">
.kimera-button {
  transition: $typetester-invert-transition;
  &.is-inverted {
    background: var(--kimera-white);
    color: var(--black);
    &:hover {
      background: var(--black);
      color: var(--kimera-white);
    }
    &:not(.is-secondary):hover {
      background: var(--black) !important;
      color: var(--kimera-white) !important;
    }
    // font-weight: 700;
  }
  &.is-secondary {
    color: var(--black);
    background: var(--kimera-grey);
    &:hover {
      color: var(--kimera-white);
      background: var(--black);
    }
    &.is-active {
      color: var(--kimera-white);
      background: var(--black);
    }
  }
  &.is-secondary.is-inverted {
    color: var(--white);
    background: var(--kimera-dark-grey);
    &.is-active {
      color: var(--black);
      background: var(--kimera-white);
    }
    &:hover {
      color: var(--black);
      background: var(--kimera-white);
    }
  }
}
.kimera-button {
  background: var(--black);
  color: var(--kimera-white);
  border-radius: var(--kimera-button-border-radius);
  // padding: 0.85em;
  padding: 1em 0.85em 0.85em;
  display: flex;
  overflow: hidden;
  align-items: center;
  white-space: nowrap;
  justify-content: flex-end;
  &.is-small {
    padding: 0.625em 0.675em;
  }
}
.kimera-button.tag.subtag {
  background: var(--kimera-filter-color);
  color: var(--black);
  backdrop-filter: blur(5px);
}
</style>
