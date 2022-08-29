<template>
<div class="layout-wrapper">
  <kimera-navigation></kimera-navigation>
  <div class="page-overlay h-w-100 fixed fixed-reset">

  </div>

  <Nuxt class="layout-inner" />
  <!-- <Nuxt class="layout-inner" keep-alive :keep-alive-props="{ include: ['index'] }" /> -->
  <kimera-footer></kimera-footer>
</div>
</template>


<style lang="scss">
.page-overlay {
    background: var(--white);
    z-index: 3;
    opacity: 0;
    pointer-events: none;
}
.nav-height-adjustment {
    padding-top: var(--nav-height);
}

.layout-inner {
    padding: var(--main-padding);
}
</style>
