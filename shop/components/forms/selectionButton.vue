<template>
  <div
    class="kimera-selection-button"
    :class="hasCheckmark ? 'has-checkmark' : ''"
  >
    <input
      :type="type"
      :id="id"
      :checked="checkedByDefault"
      :name="group"
      :value="outputValue"
      @change="$emit('changed', onChangeEventValue)"
    />
    <!-- @change="changedLicenseeType($event, false)" -->
    <label v-if="!hasSlot" :for="id">{{ labelText }}</label>
    <label v-else :for="id"><slot></slot> </label>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "radio",
    },
    id: {
      type: String,
      required: true,
    },
    labelText: {
      type: String,
      required: true,
    },
    checkedByDefault: {
      type: Boolean,
      default: false,
    },
    outputValue: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
    hasCheckmark: {
      type: Boolean,
      default: false,
    },
    // onChangeEventName: {
    //   type: String,
    //   default: "change",
    //   required: false,
    // },
    onChangeEventValue: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    hasSlot() {
      return !!this.$slots["default"] || !!this.$scopedSlots["default"];
    },
  },
};
</script>
<style lang="scss">
.kimera-selection-button {
  padding: 0.25rem;
  input {
    position: absolute;
    opacity: 0;
    &:checked {
      + label {
        background-color: var(--black);
        color: var(--kimera-white);
        font-variation-settings: "wght" 100;
      }
    }
    &:hover:not(:checked) {
      + label {
        background-color: var(--white);
      }
    }
  }
  label {
    padding: 0.25rem;
    width: 100%;
    display: flex;
    border-radius: 0.75rem;
    padding-left: 0.5rem;
    cursor: pointer;
    font-variation-settings: "wght" 120;
    transition: color 0.4s ease, background-color 0.4s ease;

    // background-color: black;
  }
}
</style>
