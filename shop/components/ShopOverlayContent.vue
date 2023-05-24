<template>
  <div class="temporary-buy-form relative">
    <div class="temporary-buy-form-inner relative">
      <div class="kimera-text">
        <p>
          Currently, the shop is under construction! Keep up to date by
          following @Kimeracorp. In the meantime, you can still purchase our
          fonts by contacting us directly:
        </p>
      </div>
      <div class="label-wrapper">
        <label for="licensee"
          >1. The Typeface is being used in Project for:</label
        ><br />
        <input
          type="radio"
          id="yourself"
          checked
          name="licensee"
          value="licensee"
        />
        <label for="yourself">Yourself</label>
        <input type="radio" id="client" name="licensee" value="client" />
        <label for="client">Your Client</label>
      </div>
      <div class="label-wrapper">
        <label for="client-name">2. If "your client" is chosen:</label><br />
        <input
          type="text"
          name="client-name"
          id="client-name"
          placeholder="Enter Company Name (Licence Owner)"
        />
      </div>
      <div class="label-wrapper">
        <label for="student">3. Are you a student? (-50%)</label><br />
        <!-- <input type="checkbox" id="student" name="student" value="student" /> -->
        <input type="radio" id="student-no" name="student" value="no" checked />
        <label for="student-no">No</label>
        <input type="radio" id="student-yes" name="student" value="yes" />
        <label for="student-yes">Yes</label>
      </div>

      <div class="label-wrapper">
        <label for="license-size"
          >4. License Size (Company Size of License Owner)</label
        >
        <br />
        <input
          type="text"
          id="license-size"
          name="license-size"
          placeholder="Enter Company Size"
        />
      </div>
      <div class="label-wrapper">
        <label for="license-types">5. License Types</label><br />
        <input
          type="checkbox"
          id="desktop"
          name="license-types"
          value="desktop"
        />
        <label for="desktop">Base (Desktop) License</label><br />
        <input type="checkbox" id="web" name="license-types" value="web" />
        <label for="web">Web License</label><br />
        <input
          type="checkbox"
          id="social-media"
          name="license-types"
          value="social-media"
        />
        <label for="social-media">Social Media License</label><br />
        <input type="checkbox" id="app" name="license-types" value="app" />
        <label for="app">App License</label><br />
        <input
          type="checkbox"
          id="broadcast"
          name="license-types"
          value="broadcast"
        />
        <label for="broadcast">Broadcast License</label><br />
        <input type="checkbox" id="logo" name="license-types" value="logo" />
        <label for="logo">Logo License</label><br />
      </div>
      <div class="label-wrapper">
        <label for="font-cuts">6. Font Cuts</label>
        <div class="font-cuts-wrapper">
          <div v-for="cut in fontFamily">
            <input
              type="checkbox"
              :id="'cut-' + cut.weightReadable"
              :name="'cut-' + cut.weightReadable"
              :value="cut.weightReadable"
            />
            <label :for="'cut-' + cut.weightReadable">
              {{ fontName }} {{ cut.weightReadable }}</label
            >
          </div>
        </div>
      </div>
    </div>
    <div class="label-wrapper">
      <label for="bundle">7. Bundles and Discounts</label><br />
      <div>
        <div class="flex-space-between">
          <div>Duo (Corresponding Italic) (2 Cuts)</div>
          <div>Save 25%</div>
        </div>
        <div class="flex-space-between">
          <div>Essential (6 Cuts)</div>
          <div>Save 40%</div>
        </div>
        <div class="flex-space-between">
          <div>Full (All Cuts)</div>
          <div>Save 65%</div>
        </div>
        <br />
        <div class="flex-space-between">
          <div>Multi License Discount 2-4 Licenses</div>
          <div>Save 25%</div>
        </div>
        <div class="flex-space-between">
          <div>Multi License Discount 5 Licenses</div>
          <div>Save 45%</div>
        </div>
      </div>
      <div style="padding: 2rem 0 1rem 0">
        <div class="kimera-text">
          <p>
            We will apply your discounts and come back to you with a quote after
            you submit your information.
          </p>
        </div>
      </div>
      <div class="flex-space-between">
        <tag-button is-secondary is-active>Pricing Information</tag-button>
        <tag-button is-secondary is-active>License Information</tag-button>
      </div>
    </div>

    <div class="submit-button">
      <tag-button is-big is-secondary @click.native.prevent="submitForm"
        >Submit</tag-button
      >
    </div>
  </div>
</template>

<script>
// import mapgetters from vuex

import { mapGetters } from "vuex";

export default {
  data() {
    return { fontFamily: null };
  },
  props: {
    fontName: {
      type: String,
      required: true,
      default: "KMR-Waldenburg",
    },
  },
  computed: {
    ...mapGetters({
      getFontDataByName: "fontData/getFontDataByName",
    }),
  },
  methods: {
    submitForm() {
      // Get all the data from the inputs and prepare an email template, that formats the data nicely and opens a new window with the email client
      const licensee = document.querySelector(
        'input[name="licensee"]:checked'
      ).value;
      const clientName = document.querySelector(
        'input[name="client-name"]'
      ).value;
      // const isStudent = document.querySelector('input[name="student"]').checked;
      const isStudent =
        document.querySelector('input[name="student"]:checked').value === "yes"; // Check if 'yes' is selected

      const companySize = document.querySelector(
        'input[name="license-size"]'
      ).value;
      const licenseTypes = Array.from(
        document.querySelectorAll('input[name="license-types"]:checked')
      ).map((input) => input.value);
      const fontCuts = Array.from(
        document.querySelectorAll('input[name^="cut-"]:checked')
      ).map((input) => input.value);

      // Prepare email template with the data
      const emailBody = `
        Licensee: ${licensee}
        Client Name: ${clientName}
        Is Student: ${isStudent ? "Yes" : "No"}
        Company Size: ${companySize}
        License Types: ${licenseTypes.join(", ")}
        Font Cuts (${fontCuts.length}): ${fontCuts.join(", ")}
      `;

      // Open a new window with the email client and pre-fill the email template
      const mailtoLink = `mailto:sales@kimeracorp.com?subject=Font%20Purchase%20Inquiry%20${
        this.fontName
      }&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink);
    },
  },
  mounted() {
    this.fontFamily = this.getFontDataByName(this.fontName).fontFamilies;
  },
};
</script>
<style lang="scss">
.temporary-buy-form {
  // padding-bottom: 4rem;
  input[type="text"] {
    width: 100%;
    height: 2rem;
    // margin-bottom: 1rem;
  }
}
.font-cuts-wrapper {
  max-height: 30rem;
  overflow-y: auto;
}
.submit-button {
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.label-wrapper {
  margin-bottom: 1rem;
}
.flex-space-between {
  display: flex;
  justify-content: space-between;
}
</style>
