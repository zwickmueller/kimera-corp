<template>
  <div class="image-cta-container">
    <div class="cta-image">
      <div class="placeholder"></div>
    </div>
    <div class="cta-button">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    // blok: {
    //     type: Object,
    //     required: true
    // }
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.image-cta-container {
  background-color: var(--white);
  border-radius: 1.5rem;
  width: 100%;
  padding: 0.5rem;
  .cta-image {
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    .placeholder {
      aspect-ratio: 1/1;
      border-radius: 1.2rem;
      width: 100%;
      background-color: black;
      transform: scale(0.5);
      transition: transform 0.25s ease;
    }
  }
  .cta-button {
    margin-top: 0.5rem;
    border-radius: 1.25rem;
    background-color: var(--kimera-white);
    padding: 0.5rem 0.75rem;
    transition: background-color 0.25s ease, color 0.25s ease;
  }
  &:hover {
    cursor: pointer;
    .cta-image {
      .placeholder {
        transform: scale(1);
      }
    }
    .cta-button {
      color: var(--kimera-white);
      background-color: var(--black);
    }
  }
}
</style>
