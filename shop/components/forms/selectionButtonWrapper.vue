<template>
  <div class="selection-button-wrapper" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isColumn: {
      type: Boolean,
      default: false,
    },
    isGrid: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    classes() {
      return {
        "is-column": this.isColumn,
        "is-grid": this.isGrid,
      };
    },
  },
};
</script>
<style lang="scss">
.selection-button-wrapper {
  display: flex;
  padding: 0.25rem;
  gap: 0.25rem;
  background-color: var(--kimera-white);
  border-radius: 1rem;
  & > div {
    flex: 1;
  }
  &.is-column {
    flex-direction: column;
  }
  &.is-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
.selection-button-wrapper + .selection-button-wrapper {
  margin-top: 0.25rem;
}
.selection-button-wrapper {
  .kimera-selection-button {
    padding: 0; // background-color: red;
  }
  // input:has(input:checked) {
  //   background-color: red;
  // }
}
</style>
