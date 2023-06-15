<template>
  <div class="buy-or-trial-wrapper">
    <shop-buy-or-trial
      title="Buy"
      @click.native="$emit('changeShopOverlayContent', 'shop-overlay-buy-form')"
    ></shop-buy-or-trial>
    <shop-buy-or-trial title="Trial"></shop-buy-or-trial>
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
