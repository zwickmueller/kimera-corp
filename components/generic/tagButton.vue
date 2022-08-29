<template>
<button class="kimera-button kimera-text-filter button-reset">
  <slot></slot>
</button>
</template>

<script>
export default {}
</script>

<style lang="scss" >
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
