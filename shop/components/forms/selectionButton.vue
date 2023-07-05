<template>
  <div
    class="kimera-selection-button"
    :class="hasCheckmark ? 'has-checkmark' : ''"
  >
    <input
      :class="inputClasses"
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
    <svg
      v-if="type == 'checkbox' && hasCheckmark"
      class="svg-checkmark"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="7" fill="black" />
      <path
        d="M10.069 13.872L17.167 6.774L18.826 8.433L10.069 17.211L8.389 15.552L8.41 15.531L5.365 12.507L7.024 10.848L10.069 13.872Z"
        fill="white"
      />
    </svg>
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
      default: true,
    },
    inputClasses: {
      type: String,
      default: "",
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
  --border-radius: 0.75rem;
  --padding: 0.25rem;
  padding: var(--padding);
  position: relative;
  display: flex;
  input {
    position: absolute;
    opacity: 0;
    &:checked {
      + label {
        background-color: var(--black);
        color: var(--kimera-white);
        font-variation-settings: "wght" 100;
      }
      + .svg-checkmark {
        opacity: 1;
      }
    }
    &:hover:not(:checked) {
      + label {
        background-color: var(--white);
      }
      + .svg-checkmark {
        opacity: 1;
      }
    }
  }
  label {
    padding: var(--padding);
    width: 100%;
    display: flex;
    border-radius: var(--border-radius);
    padding-left: calc(var(--padding) * 2);
    cursor: pointer;
    font-variation-settings: "wght" 120;
    transition: color 0.4s ease, background-color 0.4s ease;

    // background-color: black;
  }
  .svg-checkmark {
    opacity: 0;
    transition: opacity 0.4s ease;
    height: 100%;
    width: 100%;
    max-height: 1.5rem;
    max-width: 1.5rem;
    display: flex;
    position: absolute;
    right: var(--padding);
    align-self: center;
  }
  &:hover {
    .svg-checkmark {
      opacity: 1;
    }
  }
  input:checked + label + .svg-checkmark {
    opacity: 1;
  }
}
</style>
