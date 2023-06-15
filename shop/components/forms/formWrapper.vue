<template>
  <div class="form-wrapper">
    <div class="form-heading-wrapper">
      <div class="form-title">
        {{ title }}
      </div>
      <div class="form-illustration"><div class="placeholder"></div></div>
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
}
.form-wrapper + .form-wrapper {
  margin: 0.5rem 0;
}
.form-heading-wrapper {
  display: flex;
  justify-content: space-between;
  padding: $shop-padding;
  .form-illustration {
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12rem;
    .placeholder {
      aspect-ratio: 1/1;
      border-radius: $shop-main-border-radius;
      width: 100%;
      background-color: black;
      opacity: 0.5;
    }
  }
}
</style>
