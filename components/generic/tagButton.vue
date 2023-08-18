<template>
  <div v-if="isDiv" class="kimera-button" :class="getClasses">
    <slot></slot>
  </div>

  <button v-else class="kimera-button button-reset" :class="getClasses">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    isDiv: {
      default: false,
    },
    isBig: {
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
    isBuyButton: {
      default: false,
      type: Boolean,
    },
    isFormButton: {
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
        "is-big kimera-text-bigger": this.isBig,
        "kimera-text-filter": !this.isBig,
        "is-buy-button": this.isBuyButton,
        "is-form-button": this.isFormButton,
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
  &.is-big {
    border-radius: 2rem;
    padding: 0.5rem 0.9rem;
  }
  &.is-buy-button {
    background: var(--kimera-green);
    color: var(--black);
    transition: $typetester-invert-transition, filter 0.375s ease,
      transform 0.75s cubic-bezier(0, 0.55, 0.45, 1);

    &:hover {
      // background: var(--black);
      color: var(--kimera-white);
    }
  }
  &.is-form-button {
    background-color: var(--kimera-white);
    color: var(--black);
    font-size: 1.25rem;
    letter-spacing: 0;
    padding: 0.65rem 0.8rem;
    text-transform: none;
    &:hover {
      background-color: var(--black);
      color: var(--kimera-white);
      font-weight: 500;
    }
    &.is-secondary {
      color: var(--white) !important;
      background: var(--kimera-dark-grey) !important;
      &:hover {
        background-color: var(--kimera-white) !important;
        color: var(--black) !important;
      }
    }
    &.is-inverted {
      background-color: var(--black);
      color: var(--kimera-white);
      &:hover {
        background-color: var(--kimera-white) !important;
        color: var(--black) !important;
      }
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
  position: relative;
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
