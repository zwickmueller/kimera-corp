<template>
<div v-editable="blok">
  <h2>
    {{ blok.name }}
  </h2>
</div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>
