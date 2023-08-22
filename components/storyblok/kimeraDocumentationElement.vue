<template>
  <div class="slider-element">
    <component
      v-if="blok.body[0]"
      :key="blok.body[0]._uid"
      :blok="blok.body[0]"
      :is="blok.body[0].component"
    />
    <div class="documentation-title kimera-text">
      <p>
        {{ blok.title }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.slider-element .documentation-title.kimera-text {
  padding: 0.5rem 0 0;
}
.slider-element {
  width: 100%;
  height: 100%;
}
// .slider-element {
//   transform: translateX(var(--kimera-side-padding));
//   @include until($tablet) {
//     transform: none;
//   }
// }
</style>
