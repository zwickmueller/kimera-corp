<template>
  <div class="buy-or-trial-wrapper">
    <shop-buy-or-trial
      title="Buy"
      lottieAnimName="kimera_BUY_ANIMATION_03"
      @click.native="$emit('changeShopOverlayContent', 'shop-overlay-buy-form')"
    ></shop-buy-or-trial>
    <shop-buy-or-trial
      title="Trial"
      lottieAnimName="kimera_TRIAL_ANIMATION_01"
      @click.native="
        $emit('changeShopOverlayContent', 'shop-overlay-trial-form')
      "
    ></shop-buy-or-trial>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss"></style>
