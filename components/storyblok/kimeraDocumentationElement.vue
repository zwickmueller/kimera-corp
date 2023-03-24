<template>
  <div>
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
.documentation-title {
  padding-top: 0.5rem;
}
// .slider-element {
//   transform: translateX(var(--kimera-side-padding));
//   @include until($tablet) {
//     transform: none;
//   }
// }
</style>
