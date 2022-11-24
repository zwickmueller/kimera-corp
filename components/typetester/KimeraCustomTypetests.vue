<template lang="html">
  <div class="kimera-custom-typetests">
    <kimera-typetester-preview v-for="typetest in customTypetests" :typetesterData="typetest" :key="String(typetest.timestamp)"></kimera-typetester-preview>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      getCustomTypetestsByPath: 'typetester/getCustomTypetestsByPath',
      // ...
    }),
    customTypetests() {
      return this.getCustomTypetestsByPath(this.$route.fullPath)
    },
  }
}
</script>

<style lang="scss" scoped>
.kimera-custom-typetests {
    padding-left: var(--kimera-side-padding);
    padding-right: calc(var(--kimera-side-padding));
}
</style>
