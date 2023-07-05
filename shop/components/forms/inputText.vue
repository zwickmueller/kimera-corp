<template>
  <div>
    <label :for="group" class="text-input-label kimera-text">
      <p>{{ title }}</p>
    </label>
    <div class="kimera-text-input-wrapper">
      <input
        class="kimera-text-input"
        :type="type"
        :id="id"
        :name="group"
        :required="required"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    id: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang="scss">
textarea {
  width: 100% !important;
  padding: 0.5rem !important;
  height: 100% !important;
  border: none;
  outline: none;
  resize: none;
  margin-bottom: -0.25rem;
}
.kimera-text-input-wrapper,
textarea {
  --border-radius: 0.75rem;
  --padding: 0.25rem;
  input {
    width: 100%;
  }
  .kimera-text-input {
    padding: var(--padding);
    border-radius: var(--border-radius);
    background-color: transparent;
    transition: background-color 0.4s ease;
    outline: none;
    border: none;
    &:focus {
      background-color: var(--white);
    }
  }
  padding: var(--padding);
  background-color: var(--kimera-white);
  border-radius: 1rem;
  &:hover {
    .kimera-text-input {
      background-color: var(--white);
    }
  }
}
.text-input-label p {
  padding-top: 1rem;
  padding-bottom: 0.5rem;
}
</style>
