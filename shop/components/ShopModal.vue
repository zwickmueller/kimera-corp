<template>
  <div class="shop-modal" :style="hasCursor ? 'cursor: pointer;' : ''">
    <div class="modal-wrapper">
      <div class="modal-title">
        <div>{{ title }}</div>
        <close-button
          style="height: 1.5rem"
          isCross
          @click.native="$emit('close')"
          class="shop-close-button"
        ></close-button>
      </div>

      <!-- isInverted -->
      <div class="modal-inner kimera-text">
        <slot></slot>
        <!-- <p>
          Hi there!<br />
          <br />
          Our full webshop is currently under construction. In the meantime you
          can purchase our typefaces via a request formula that we will answer
          per mail and we want to give you a more personal and individual
          customer support.
          <br />
          <br />
          Best,<br />
          kimera
        </p> -->
      </div>
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hasCursor: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "Full shop coming soon!",
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.shop-modal {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
  color: var(--white);

  .modal-wrapper {
    background-color: var(--black);
    padding: 0.75rem;
    padding-top: 0.5rem;
    border-radius: 1.25rem;
    max-width: 30rem;
    width: 100%;
  }
  .modal-title {
    padding-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .modal-inner {
    background-color: var(--kimera-dark-grey);
    padding: 0.75rem;
    border-radius: 1rem;
  }
}
</style>
