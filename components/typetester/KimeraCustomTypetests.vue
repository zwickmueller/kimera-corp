<template>
  <div class="kimera-custom-typetests">
    <kimera-typetester-preview
      :data-timestamp="String(typetest.timestamp)"
      v-for="typetest in customTypetests"
      :typetesterData="typetest"
      :key="String(typetest.timestamp) + typetest.text"
    ></kimera-typetester-preview>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      getCustomTypetestsByPath: "typetester/getCustomTypetestsByPath",
      // ...
    }),
    customTypetests() {
      // ROUTECHANGE HERE
      const path = this.$helpers.normalizePath(this.$route.fullPath);
      return this.getCustomTypetestsByPath(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.kimera-custom-typetests {
  padding-top: calc(var(--kimera-grid-gap) / 2);
  padding-left: var(--kimera-side-padding);
  padding-right: calc(var(--kimera-side-padding));
  .kimera-typetester.is-user-created {
    margin-bottom: calc(var(--kimera-grid-gap) / 2);
  }
  @include until($tablet) {
    padding: 0;
  }
}
</style>
