<template>
  <div v-editable="blok" class="project kimera-project" :class="projectType">
    <component
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
      :is="blok.component"
    />
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  computed: {
    projectType() {
      return this.$route.name.replace("-all", "");
    },
  },
  mounted() {
    // Assign blok.primaryColor to --primary-project-color
    // Assign blok.secondaryColor to --secondary-project-color
    // Assign blok.tertiaryColor to --tertiary-project-color

    const primaryColor = this.blok.primaryColor;
    const secondaryColor = this.blok.secondaryColor;
    const tertiaryColor = this.blok.tertiaryColor;
    const root = this.$el;
    root.style.setProperty("--primary-project-color", primaryColor);
    root.style.setProperty("--secondary-project-color", secondaryColor);
    root.style.setProperty("--tertiary-project-color", tertiaryColor);
  },
};
</script>

<style lang="scss">
.kimera-project {
  --primary-project-color: transparent;
  --secondary-project-color: transparent;
  --tertiary-project-color: transparent;
}
</style>
