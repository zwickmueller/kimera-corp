<template>
  <div class="shop-overlay-content">
    <div class="shop-overlay-close-wrapper">
      <close-button
        v-if="lastState"
        noAnim
        isInverted
        class="shop-close-button"
        @click.native.stop="revertOverlayContent"
      ></close-button>
      <close-button
        isCross
        isInverted
        class="shop-close-button"
        @click.native.stop="close"
      ></close-button>
    </div>
    <!-- <div class="buy-or-trial-wrapper">
      <shop-buy-or-trial title="Buy"></shop-buy-or-trial>
      <shop-buy-or-trial title="Trial"></shop-buy-or-trial>
    </div> -->
    <transition name="shop-content-transition" mode="out-in">
      <component
        :is="currentState"
        :key="currentState"
        @changeShopOverlayContent="changeOverlayContent"
        :fontName="fontName"
      ></component>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      lastState: null,
      currentState: "shop-buy-or-trial-wrapper",
    };
  },
  props: {
    fontName: {
      type: String,
      required: true,
    },
  },
  methods: {
    changeOverlayContent(state) {
      this.lastState = this.currentState;
      this.currentState = state;
    },
    revertOverlayContent() {
      this.currentState = this.lastState;
      this.lastState = null;
    },
    close() {
      this.$emit("closeShopOverlay");
    },
  },
};
</script>
<style lang="scss">
.shop-overlay-content {
  height: 100%;
}
.buy-or-trial-wrapper {
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
  height: 100%;
  align-items: center;
}
.shop-overlay-close-wrapper {
  position: sticky;
  right: 0rem;
  // right: 0.5rem;
  top: 0rem;
  // top: 0.5rem;
  display: flex;
  gap: 0.25rem;
  justify-content: flex-end;
  z-index: 1;
}
</style>
