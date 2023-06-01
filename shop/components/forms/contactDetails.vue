<template>
  <div class="label-wrapper contact-details">
    <div class="kimera-text">
      <p style="text-transform: capitalize">{{ type }} Details</p>
    </div>
    <div style="column-count: 2" class="company-or-person">
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
    </div>

    <div class="company-form">
      <div class="kimera-text">
        <p>Company Name</p>
      </div>
      <input
        type="text"
        id="company-name"
        name="company-name"
        placeholder="Legal Name of Licensee"
      />
    </div>
    <div class="person-form" style="column-count: 2">
      <div>
        <div class="kimera-text">
          <p>First Name</p>
        </div>
        <input
          type="text"
          id="person-first-name"
          name="person-first-name"
          placeholder="John"
        />
      </div>
      <div>
        <div class="kimera-text">
          <p>Last Name</p>
        </div>
        <input
          type="text"
          id="person-last-name"
          name="person-last-name"
          placeholder="Doe"
        />
      </div>
    </div>
    <div style="column-count: 3">
      <div>
        <div class="kimera-text">
          <p>City</p>
        </div>
        <input
          type="text"
          id="licensee-details-city"
          name="licensee-details-city"
          placeholder="City"
        />
      </div>
      <div>
        <div class="kimera-text">
          <p>State</p>
        </div>
        <input
          type="text"
          id="licensee-details-state"
          name="licensee-details-state"
          placeholder="State"
        />
      </div>
      <div>
        <div class="kimera-text">
          <p>Postal Code</p>
        </div>
        <input
          type="text"
          id="licensee-details-postal-code"
          name="licensee-details-postal-code"
          placeholder="Postal Code"
        />
      </div>
    </div>
    <div>
      <div class="kimera-text">
        <p>Email</p>
      </div>
      <input
        type="text"
        id="licensee-details-email"
        name="licensee-details-email"
        placeholder="hello@domain.com"
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
    type: {
      type: String,
    },
  },
};
</script>
<style lang="scss" scoped>
.contact-details {
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
