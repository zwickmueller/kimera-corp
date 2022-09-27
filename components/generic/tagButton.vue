<template>
<div v-if="isDiv" class="kimera-button kimera-text-filter" :class="isInverted ? 'is-inverted': ''">
  <slot></slot>
</div>
<button v-else class="kimera-button kimera-text-filter button-reset" :class="isInverted ? 'is-inverted': ''">
  <slot></slot>
</button>
</template>

<script>
export default {
  props: {
    isDiv: {
      default: false
    },
    isInverted: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style lang="scss" >
.kimera-button {
    transition: $typetester-invert-transition;
    &.is-inverted {
        background: var(--kimera-white);
        color: var(--black);
        // font-weight: 700;
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

}
.kimera-button.tag.subtag {
    background: var(--kimera-filter-color);
    color: var(--black);
    backdrop-filter: blur(5px);

}
</style>
