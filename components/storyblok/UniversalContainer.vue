<template lang="html">
  <div v-editable="blok" class="kimera-container" :class="blok.bottomGradient ? 'bottom-gradient' : ''">
    <h3 v-if="blok.heading" class="kimera-text-filter-tags">{{blok.heading}}</h3>
    <div class="kimera-container-inner" :class="blok.fullWidth ? '' : 'has-max-width'">

    <component v-for="blok in blok.body" :key="blok._uid" :blok="blok" :is="blok.component" />
  </div>
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }

  }
}</script>

<style lang="scss" scoped>
.kimera-container {
    .kimera-container-inner {
        margin: 0 auto;
        &.has-max-width {

            max-width: 1024px;
        }
    }
    h3 {
        padding: 1em 0 1.5em;
        text-align: center;
        text-transform: uppercase;
    }
    &.bottom-gradient {
        position: relative;
        // min-height: 6em;
        padding-bottom: calc(30px + 1em);
        &:after {
            content: '';
            width: 100%;
            bottom: 0;
            left: 0;
            position: absolute;
            // background: red;
            height: 30px;
            background: linear-gradient(0deg, rgba(234, 234, 234, 0.75) 0%, rgba(234, 234, 234, 0) 100%);
            background-blend-mode: multiply;
        }
    }
}
</style>
