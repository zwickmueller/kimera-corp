<template>
<div class="layout-wrapper">
  <navigation></navigation>


  <Nuxt class="layout-inner" />
  <kimera-footer></kimera-footer>
</div>
</template>

<style lang="scss">
.nav-height-adjustment {
    padding-top: var(--nav-height);
}

.layout-inner {
    padding: var(--main-padding);
}
</style>
