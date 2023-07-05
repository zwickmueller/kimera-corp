<template>
  <div class="form-wrapper" :class="altColor ? 'alt-color' : ''">
    <div v-if="!isSmall" class="form-heading-wrapper">
      <div
        class="form-title"
        :style="!illustration ? 'padding-bottom: 2rem' : ''"
      >
        {{ title }}
      </div>
      <div v-if="illustration" class="form-illustration">
        <!-- <div class="placeholder"></div> -->
        <img :src="require('/assets/img/' + illustration + '.png')" alt="" />
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    altColor: {
      type: Boolean,
      default: false,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
    illustration: {
      type: String,
      required: false,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
$shop-padding: 0.5rem;
$shop-font-size: 1.25rem;
$shop-main-border-radius: 1.2rem;
.form-wrapper {
  background-color: var(--white);
  padding: $shop-padding;
  font-size: $shop-font-size;
  border-radius: $shop-main-border-radius;
  &.alt-color {
    padding: 0.25rem;
    background-color: var(--kimera-white);
    .svg-checkmark {
      right: 0.5rem;
    }
  }
}
.form-wrapper + .form-wrapper {
  margin: 0.5rem 0;
}
.form-heading-wrapper {
  display: flex;
  justify-content: space-between;
  // padding: $shop-padding;
  .form-illustration {
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14rem;
    padding-bottom: 1.5rem;
    padding-top: 1rem;
    .placeholder {
      aspect-ratio: 1/1;
      border-radius: $shop-main-border-radius;
      width: 100%;
      background-color: black;
      opacity: 0.5;
    }
  }
  .form-title {
    padding-left: 0.75rem;
    padding-top: 0.5rem;
  }
}
</style>
