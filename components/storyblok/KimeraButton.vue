<template>
  <button
    type="button"
    name="kimera-button"
    class="kimera-button kimera-text-filter button-reset"
    @click="handleClick"
  >
    {{ blok.title }}
  </button>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleClick() {
      if (!this.blok.mailTo) return;
      // open new tab/window with mailto:
      window.open("mailto:" + this.blok.mailTo, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.kimera-button {
  background: var(--black);
  color: var(--kimera-white);
  padding: 1em;
  border-radius: var(--kimera-button-border-radius);
  width: 100%;
  max-width: calc(100vw / 8 * 2 - 8px);
  margin: 0 auto;
  display: block;
  text-align: center;
}
</style>
