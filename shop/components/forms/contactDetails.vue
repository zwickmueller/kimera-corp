<template>
  <div class="label-wrapper contact-details">
    <!-- <div class="kimera-text">
      <p style="text-transform: capitalize">{{ type }} Details</p>
    </div> -->
    <selection-button-wrapper class="company-or-person">
      <selection-button
        :id="'licensee-' + type"
        :checkedByDefault="true"
        outputValue="Company"
        :group="'licensee-type' + type"
        labelText="Company"
        :inputClasses="'company-licensee'"
        :onChangeEventValue="false"
      ></selection-button>

      <selection-button
        :id="'licensee2-' + type"
        outputValue="Person"
        :group="'licensee-type' + type"
        :inputClasses="'person-licensee'"
        labelText="Person"
        :onChangeEventValue="false"
      ></selection-button>
    </selection-button-wrapper>

    <!-- <div style="column-count: 2" class="company-or-person">
      <div>
        <input
          type="radio"
          :id="'licensee-' + type"
          checked
          class="company-licensee"
          :name="'licensee-type' + type"
          value="Company"
        />
        <label :for="'licensee-' + type">Company</label>
      </div>
      <div>
        <input
          type="radio"
          :id="'licensee2-' + type"
          class="person-licensee"
          :name="'licensee-type' + type"
          value="Person"
        />
        <label :for="'licensee2-' + type">Person</label>
      </div>
    </div> -->

    <div class="company-form">
      <input-text
        title="Company Name"
        id="company-name"
        group="company-name"
        placeholder="Legal Name of Licensee"
      ></input-text>
      <!-- <input
        type="text"
        id="company-name"
        name="company-name"
        placeholder="Legal Name of Licensee"
      /> -->
    </div>
    <div class="person-form gap" style="column-count: 2">
      <div>
        <input-text
          title="First Name"
          id="person-first-name"
          group="person-first-name"
          placeholder="John"
        ></input-text>

        <!-- <div class="kimera-text">
          <p>First Name</p>
        </div>
        <input
          type="text"
          id="person-first-name"
          name="person-first-name"
          placeholder="John"
        /> -->
      </div>
      <div>
        <input-text
          title="Last Name"
          id="person-last-name"
          group="person-last-name"
          placeholder="Doe"
        ></input-text>
        <!-- <div class="kimera-text">
          <p>Last Name</p>
        </div>
        <input
          type="text"
          id="person-last-name"
          name="person-last-name"
          placeholder="Doe"
        /> -->
      </div>
    </div>
    <div style="column-count: 3" class="gap">
      <div>
        <input-text
          title="City"
          id="licensee-details-city"
          group="licensee-details-city"
          placeholder="City"
        ></input-text>
        <!-- <div class="kimera-text">
          <p>City</p>
        </div>
        <input
          type="text"
          id="licensee-details-city"
          name="licensee-details-city"
          placeholder="City"
        /> -->
      </div>
      <div>
        <input-text
          title="Country"
          id="licensee-details-state"
          group="licensee-details-state"
          placeholder="Country"
        ></input-text>
        <!-- <div class="kimera-text">
          <p>State</p>
        </div>
        <input
          type="text"
          id="licensee-details-state"
          name="licensee-details-state"
          placeholder="State"
        /> -->
      </div>
      <div>
        <!-- <div class="kimera-text">
          <p>Postal Code</p>
        </div>
        <input
          type="text"
          id="licensee-details-postal-code"
          name="licensee-details-postal-code"
          placeholder="Postal Code"
        /> -->
        <input-text
          title="Postal Code"
          id="licensee-details-postal-code"
          group="licensee-details-postal-code"
          placeholder="Postal Code"
        ></input-text>
      </div>
    </div>
    <div>
      <input-text
        title="Email"
        id="licensee-details-email"
        group="licensee-details-email"
        placeholder="hello@domain.com"
        type="email"
      ></input-text>
      <!-- <div class="kimera-text">
        <p>Email</p>
      </div>
      <input
        type="text"
        id="licensee-details-email"
        name="licensee-details-email"
        placeholder="hello@domain.com"
      /> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    type: {
      type: String,
    },
  },
};
</script>
<style lang="scss" scoped>
.contact-details {
  .gap {
    gap: 4px;
  }
  &:has(.company-licensee:checked) .person-form {
    display: none;
  }
  &:has(.person-licensee:checked) .company-form {
    display: none;
  }
  input {
    margin-bottom: 0.5rem;
  }
}
</style>
