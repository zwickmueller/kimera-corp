<template>
  <section
    :style="blok.background ? 'background:' + blok.background : ''"
    v-editable="blok"
    class="kimera-container"
    :class="[
      blok.bottomGradient ? 'bottom-gradient' : '',
      blok.paddingTop ? blok.paddingTop : '',
      blok.paddingBottom ? blok.paddingBottom : '',
    ]"
  >
    <h3
      :id="this.$helpers.normalizeString(blok.heading)"
      v-if="blok.heading"
      class="kimera-text-filter-tags"
      :class="blok.headingInside ? 'heading-inside' : ''"
    >
      {{ blok.heading }}
    </h3>
    <div
      class="kimera-container-inner"
      :class="blok.fullWidth ? '' : 'has-max-width'"
    >
      <component
        v-for="blok in blok.body"
        :key="blok._uid"
        :blok="blok"
        :is="blok.component"
      />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.kimera-container {
  .kimera-container-inner {
    margin: 0 auto;
    &.has-max-width {
      max-width: 1024px;
    }
  }
  h3 {
    padding: calc(var(--kimera-grid-gap) / 2) 0 1.5em;
    text-align: center;
    text-transform: uppercase;
    position: relative;
    &.heading-inside {
      position: absolute;
      width: 100%;
    }
  }
  @include until($tablet) {
    padding: var(--kimera-grid-gap) calc(var(--kimera-grid-gap) / 2);
  }
}
.bottom-gradient-mobile {
  @include from($tablet) {
    &:after {
      display: none !important;
    }
  }
}
.bottom-gradient-mobile,
.bottom-gradient {
  position: relative;
  // min-height: 6em;
  padding-bottom: calc(30px + 1em);
  &:after {
    content: "";
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
    // background: red;
    pointer-events: none;
    height: 30px;
    background: linear-gradient(
      0deg,
      rgba(234, 234, 234, 0.75) 0%,
      rgba(234, 234, 234, 0) 100%
    );
    background-blend-mode: multiply;
  }
}
</style>
