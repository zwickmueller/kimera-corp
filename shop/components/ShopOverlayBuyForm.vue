<template>
  <div style="padding-top: 1rem" :class="isSubmitting ? 'is-submitting' : ''">
    <keep-alive>
      <div class="temporary-buy-form relative">
        <form
          id="myForm"
          method="POST"
          action="https://formsubmit.co/request@kimeracorp.eu"
        >
          <div class="temporary-buy-form-inner relative">
            <!-- <div class="kimera-text" style="padding-bottom: 2rem">
              <p>
                Currently, the shop is under construction! Keep up to date by
                following @Kimeracorp. In the meantime, you can still purchase
                our fonts by contacting us directly:
              </p>
            </div> -->
            <input type="text" name="honeypot" style="display: none" />
            <form-wrapper
              title="License Size"
              illustration="LICENSE_SIZE_VECTOR"
            >
              <!-- <div class="label-wrapper"> -->
              <selection-button-wrapper>
                <selection-button
                  id="commercial"
                  :checkedByDefault="true"
                  outputValue="Commercial Project"
                  group="license-size-licensee"
                  labelText="Commercial Project"
                  :onChangeEventValue="false"
                  @changed="changedLicenseeType"
                ></selection-button>

                <selection-button
                  id="student"
                  outputValue="Student Project"
                  group="license-size-licensee"
                  labelText="Personal Student Project"
                  :onChangeEventValue="true"
                  @changed="changedLicenseeType($event, true)"
                ></selection-button>
              </selection-button-wrapper>
              <selection-button-wrapper isColumn id="license-size-label">
                <!-- <div class="label-wrapper" >
              <div > -->
                <selection-button
                  v-for="(sizes, i) in licenseSizes"
                  :id="sizes[0]"
                  :outputValue="sizes[0]"
                  :type="'checkbox'"
                  group="license-size"
                  :key="sizes[0]"
                  :labelText="sizes[0]"
                  :checkedByDefault="false"
                  @changed="changedExclusiveLicense(i)"
                  :hasCheckmark="false"
                >
                  <div
                    class="flex-space-between"
                    style="width: 100%; padding-right: 0.25rem"
                  >
                    <div>{{ sizes[0] }}</div>
                    <div v-if="typeof sizes[1] == 'string'">
                      {{ sizes[1] }}
                    </div>
                    <div v-else>
                      {{
                        sizes[1] == 1
                          ? sizes[1] + " employee"
                          : "<" + sizes[1] + " employees"
                      }}
                    </div>
                  </div>
                </selection-button>

                <!-- <label
                  :for="sizes[0]"
                  class="flex"
                  style="justify-content: flex-start"
                >
                  <input
                    type="radio"
                    name="license-size"
                    :id="sizes[0]"
                    :value="sizes[0]"
                    :checked="i == 0"
                  />
                  <div class="flex-space-between" style="width: 100%">
                    <div>{{ sizes[0] }}</div>
                    <div v-if="typeof sizes[1] == 'string'">
                      {{ sizes[1] }}
                    </div>
                    <div v-else>
                      {{
                        sizes[1] == 1
                          ? sizes[1] + " employee"
                          : "<" + sizes[1] + " employees"
                      }}
                    </div>
                  </div>
                </label> -->
                <!-- </div>
            </div> -->
              </selection-button-wrapper>
              <!-- </div> -->
            </form-wrapper>

            <!-- <div class="label-wrapper"> -->
            <!-- <label for="license-size-licensee">
            <div class="kimera-text">
              <p>License Size</p>
            </div>
          </label> -->
            <!-- <input
            type="radio"
            id="commercial"
            checked
            name="license-size-licensee"
            value="Commercial Project"
            @change="changedLicenseeType($event, false)"
          />
          <label for="commercial">Commercial Project</label>

          <input
            type="radio"
            id="student"
            name="license-size-licensee"
            value="Student Project"
            @change="changedLicenseeType($event, true)"
          />
          <label for="student">Personal Student Project</label> -->
            <!-- </div> -->

            <form-wrapper
              title="License Type"
              illustration="LICENSE_TYPE_VECTOR"
            >
              <!-- <div class="label-wrapper"> -->
              <selection-button-wrapper isGrid>
                <selection-button
                  v-for="types in licenseTypes"
                  :key="types"
                  type="checkbox"
                  :id="types"
                  :outputValue="types"
                  group="license-types"
                  :labelText="types + ' License'"
                ></selection-button>
              </selection-button-wrapper>
            </form-wrapper>

            <!-- <div class="label-wrapper">
          <div class="kimera-text">
            <p>License Type</p>
          </div>
          <div style="column-count: 2">
            <div v-for="types in licenseTypes">
              <input
                type="checkbox"
                :id="types"
                name="license-types"
                :value="types"
              />
              <label :for="types"> {{ types + " License" }}</label>
            </div>
          </div>
        </div> -->

            <form-wrapper
              title="Cut Selection"
              illustration="CUT_SELECTION_VECTOR"
            >
              <!-- <div class="label-wrapper"> -->
              <selection-button-wrapper
                :key="String(cut) + String(i)"
                isGrid
                v-for="(chunk, i) in fontFamilyChunked"
              >
                <selection-button
                  v-for="cut in chunk"
                  :key="String(cut)"
                  type="checkbox"
                  :id="'cut-' + cut.weightReadable"
                  :outputValue="cut.weightReadable"
                  :group="'cut-' + cut.weightReadable"
                  :labelText="'cut-' + cut.weightReadable"
                >
                  <inline-font-preview
                    :fontName="fontName"
                    :fontData="cut"
                  ></inline-font-preview>
                </selection-button>
              </selection-button-wrapper>
            </form-wrapper>

            <!-- <div class="label-wrapper">
          <div class="kimera-text">
            <p>Cut Selection</p>
          </div>
          <div class="font-cuts-wrapper" v-for="chunk in fontFamilyChunked">
            <div class="font-cuts-inner">
              <div class="font-cut" v-for="cut in chunk">
                <input
                  type="checkbox"
                  :id="'cut-' + cut.weightReadable"
                  :name="'cut-' + cut.weightReadable"
                  :value="cut.weightReadable"
                />
                <label :for="'cut-' + cut.weightReadable">
                  <inline-font-preview
                    :fontName="fontName"
                    :fontData="cut"
                  ></inline-font-preview>
                </label>
              </div>
            </div>
          </div>
        </div> -->
          </div>
          <form-wrapper
            title="Billing Details"
            illustration="BILLING_DETAILS_VECTOR"
          >
            <contactDetails
              :type="'licensee'"
              id="LicenseeDetails"
            ></contactDetails>
          </form-wrapper>
          <form-wrapper altColor isSmall>
            <selection-button
              type="checkbox"
              id="same-as-licensee"
              :checkedByDefault="true"
              group="same-as-licensee"
              >Billing details are the same as Licensee
              details</selection-button
            >
          </form-wrapper>
          <!-- <input
        type="checkbox"
        checked
        name="same-as-licensee"
        id="same-as-licensee"
      />

      <label for="same-as-licensee">
        Invoice details are the same as Licensee details</label
      > -->
          <form-wrapper title="Licensee Details" class="invoice-details">
            <contactDetails
              :type="'invoice'"
              id="InvoiceDetails"
            ></contactDetails>
          </form-wrapper>

          <form-wrapper
            title="Additional Information"
            illustration="ADDITIONAL_INFORMATION_VECTOR"
          >
            <textarea
              id="additional-information"
              class="textarea"
              rows="5"
              form="MyForm"
              name="text"
              placeholder="Send us a message."
            ></textarea>
          </form-wrapper>

          <!-- <div> -->
          <div class="flex sticky-buttons">
            <a :href="blok.pricingLink" target="_blank">
              <tag-button :is-form-button="true" :isDiv="true"
                >Price List</tag-button
              >
            </a>
            <!-- :isSecondary="true"
              :isActive="true" -->
            <a :href="blok.eulaLink" target="_blank">
              <tag-button :is-form-button="true" :isDiv="true">EULA</tag-button>
            </a>
          </div>
          <!-- </div> -->

          <div v-if="error" class="kimera-text error-message">
            <p>
              Oh no, something went wrong! Please contact us directly via
              post@kimeracorp.eu and provide the following text:
            </p>
            <pre>{{ errorBackup }}</pre>
          </div>

          <div v-if="success" class="kimera-text success-message">
            <p>
              Thank you for your request! We’ll come back to you asap. <br />
              In the meantime you can check out our
              <span @click="$emit('revertOverlayContent')"
                >Full Version Trials</span
              >
              for testing purposes.
            </p>
          </div>
          <!-- style="padding: 2rem 0"  -->
          <div class="form-submit-button">
            <!-- :is-big="true" -->
            <!-- :is-inverted="true" -->
            <!-- :is-inverted="true" -->
            <tag-button
              :is-inverted="true"
              :is-form-button="true"
              type="submit"
              @click.native="submitForm"
              :disabled="isSubmitting"
              :class="isSubmitting ? 'is-submitting' : ''"
              v-show="!success"
              >{{
                isSubmitting ? "Processing Request" : "Request Offer"
              }}</tag-button
            >
            <!-- <button type="button" @click="submitForm">submit</button> -->
            <!-- @click.native="submitForm" -->
          </div>
        </form>
      </div>
    </keep-alive>
  </div>
</template>

<script>
// import mapgetters from vuex

import { mapGetters } from "vuex";

// LICENSE NAMES: Mini, XXS, XS, S, M, L, XL, XXL, XXXL, MAXI
// EMPLOYEE SIZE: 1, 5,10,25,50,100,200,300,500,1000

const LicenseSizes = [
  ["Mini", 1],
  ["XXS", 5],
  ["XS", 10],
  ["S", 25],
  ["M", 50],
  ["L", 100],
  ["XL", 200],
  ["XXL", 300],
  ["XXXL", 500],
  ["MAXI", 1000],
  ["More/Unlimited?", "Get in Contact"],
];

const LicenseTypes = [
  "Desktop",
  "Web",
  "Social Media",
  "App",
  "Broadcast",
  "Logo",
];

function divideArrayIntoChunks(array, chunkSize) {
  // const chunks = [];
  // const length = array.length;

  // for (let i = 0; i < length; i += chunkSize) {
  //   chunks.push(array.slice(i, i + chunkSize));
  // }
  // const chunks = [[], [], []]; // Initialize the chunks as empty arrays
  const chunks = Array.from({ length: chunkSize }, () => []);

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const weightReadable = item.fontStretch.toLowerCase();

    if (weightReadable.includes("semi-condensed")) {
      chunks[1].push(item); // Push to chunk 1 if "halbschmal" is present
    } else if (weightReadable.includes("condensed")) {
      chunks[2].push(item); // Push to chunk 2 if "schmal" is present
    } else {
      chunks[0].push(item); // Otherwise, push to chunk 0
    }
  }

  return chunks;
}

import { gsap, Flip } from "gsap/all";
if (process.client) {
  gsap.registerPlugin(Flip);
}

export default {
  data() {
    return {
      fontFamily: null,
      fontFamilyChunked: [],
      licenseSizes: LicenseSizes,
      licenseTypes: LicenseTypes,
      success: false,
      error: false,
      errorMessage: "",
      errorBackup: "",
      isSubmitting: false,
    };
  },

  props: {
    fontName: {
      type: String,
      required: true,
      default: "KMR-Waldenburg",
    },
    blok: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      getFontDataByName: "fontData/getFontDataByName",
      showDisclaimer: "getShowShopDisclaimer",
    }),
  },
  methods: {
    test() {
      const form = document.querySelector("#myForm");
      form.submit();
    },
    submitFormTest(event) {
      console.log("submitFormTest ", event);
    },
    getFontDataAsChunks(chunkSize) {
      const array = this.fontFamily;
      return divideArrayIntoChunks(array, chunkSize);
    },
    changedExclusiveLicense(index) {
      var allRadioButtonsExclusive = document.querySelectorAll(
        "#license-size-label input"
      );
      for (var i = 0; i < allRadioButtonsExclusive.length; i++) {
        let radioButton = allRadioButtonsExclusive[i];
        if (i != index) radioButton.checked = false;
      }
      // check if any Radio Button in allRadioButtonsExclusive is checked:

      var state = Flip.getState(
        "#license-size-label .kimera-selection-button:has(input:not(:checked))"
      );

      const anyChecked = [...allRadioButtonsExclusive].some(
        (radioButton) => radioButton.checked
      );
      if (anyChecked) {
        allRadioButtonsExclusive.forEach((radioButton) => {
          if (!radioButton.checked) {
            // radioButton.parentElement.style.order = "unset";
            radioButton.parentElement.style.display = "none";
          } else {
            radioButton.parentElement.style.display = "block";
            // radioButton.parentElement.style.order = "-1";
          }
        });
      } else {
        allRadioButtonsExclusive.forEach((radioButton) => {
          radioButton.parentElement.style.display = "block";
          // radioButton.parentElement.style.order = "unset";
        });
      }

      // this.$nextTick(() => {
      //   gsap.to(
      //     "#license-size-label .kimera-selection-button:has(input:not(:checked))",
      //     {
      //       duration: 0.5,
      //       display: "none",
      //       position: "absolute",
      //       opacity: 0,
      //       ease: "power2.out",
      //     }
      //   );
      // Flip.from(state, {
      //   nested: true,
      //   // targets: "#license-size-label input",
      //   // absolute: true,
      //   // absoluteOnLeave: true,
      //   ease: "power2.out",
      //   onEnter: (targets) => {
      //     console.log("onEnter");
      //     console.log(targets);
      //   },
      // });
      // });
    },
    changedLicenseeType(event, boolean) {
      console.log(event, boolean);
      var radioButtonsPerson = document.querySelectorAll(".person-licensee");
      // check each radio button

      var radioButtonsCompany = document.querySelectorAll(".company-licensee");
      for (var i = 0; i < radioButtonsPerson.length; i++) {
        radioButtonsPerson[i].checked = boolean;
      }
      for (var i = 0; i < radioButtonsCompany.length; i++) {
        radioButtonsCompany[i].disabled = boolean;
        radioButtonsCompany[i].checked = !boolean;
      }
      // radioButton.checked = true;
    },
    submitForm() {
      const form = document.querySelector("#myForm");
      let isValid = true;
      function isVisible(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
      }
      for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];
        // if (element.checkVisibility()) {
        if (isVisible(element)) {
          if (!element.validity.valid) {
            isValid = false;
          }
        }
      }
      if (!isValid) return;

      if (document.querySelector('input[name="honeypot"]').value !== "") {
        console.log("Oh oh, you're a bot!");
        return;
      }

      const licenseeType = document.querySelector(
        'input[name="license-size-licensee"]:checked'
      ).value;

      let licenseSize = document.querySelector(
        'input[name="license-size"]:checked'
      );

      // console.log(licenseeType);
      if (!licenseSize && licenseeType === "Commercial Project") {
        alert("Please select a license size");
        return;
      }
      if (licenseeType === "Commercial Project") {
        licenseSize = licenseSize.value;
      }

      const licenseTypes = Array.from(
        document.querySelectorAll('input[name="license-types"]:checked')
      ).map((checkbox) => checkbox.value);

      // console.log(licenseTypes);
      if (licenseTypes.length === 0) {
        alert("Please select at least one license type");
        return;
      }
      const cutsSelection = Array.from(
        document.querySelectorAll('input[name^="cut-"]:checked')
      ).map((checkbox) => checkbox.value);

      // console.log(cutsSelection);

      if (cutsSelection.length === 0) {
        alert("Please select at least one cut");
        return;
      }

      let isSameAsLicensee = document.querySelector(
        'input[name="same-as-licensee"]:checked'
      );
      if (isSameAsLicensee !== null) {
        isSameAsLicensee = "true";
      } else {
        isSameAsLicensee = "false";
      }

      const LicenseeDetailsType = document.querySelector(
        "#LicenseeDetails .company-or-person input:checked"
      ).value;

      // LICENSEE DETAILS
      const companyName = document.querySelector(
        "#LicenseeDetails #company-name"
      ).value;
      const firstName = document.querySelector(
        "#LicenseeDetails #person-first-name"
      ).value;
      const lastName = document.querySelector(
        "#LicenseeDetails #person-last-name"
      ).value;
      const city = document.querySelector(
        "#LicenseeDetails #licensee-details-city"
      ).value;
      const state = document.querySelector(
        "#LicenseeDetails #licensee-details-state"
      ).value;
      const postalCode = document.querySelector(
        "#LicenseeDetails #licensee-details-postal-code"
      ).value;
      const email = document.querySelector(
        "#LicenseeDetails #licensee-details-email"
      ).value;
      const streetAndNumber = document.querySelector(
        "#LicenseeDetails #licensee-details-street-adress"
      ).value;

      // INVOICE DETAILS
      const companyNameInvoice = document.querySelector(
        "#InvoiceDetails #company-name"
      ).value;
      const firstNameInvoice = document.querySelector(
        "#InvoiceDetails #person-first-name"
      ).value;
      const lastNameInvoice = document.querySelector(
        "#InvoiceDetails #person-last-name"
      ).value;
      const cityInvoice = document.querySelector(
        "#InvoiceDetails #licensee-details-city"
      ).value;
      const stateInvoice = document.querySelector(
        "#InvoiceDetails #licensee-details-state"
      ).value;
      const postalCodeInvoice = document.querySelector(
        "#InvoiceDetails #licensee-details-postal-code"
      ).value;
      const emailInvoice = document.querySelector(
        "#InvoiceDetails #licensee-details-email"
      ).value;
      const streetAndNumberInvoice = document.querySelector(
        "#InvoiceDetails #licensee-details-street-adress"
      ).value;

      // get additional information text area
      const additionalInformation = document.querySelector(
        "#additional-information"
      ).value;

      // Prepare the email content using the collected data
      const emailContent = `

    Font Name: ${this.fontName}

    Licensee Type: ${licenseeType}

    License Size: ${
      licenseeType == "Student Project" ? "Student License" : licenseSize
    }
    License Types: 
    ${licenseTypes.join(", ")}

    Cuts Selection: 
    ${cutsSelection.join(", ")}

    Invoice is the same as Licensee: ${isSameAsLicensee}

    Contact Details:
    ${
      LicenseeDetailsType === "Company"
        ? `Company Name: ${companyName}`
        : `First Name: ${firstName}
    Last Name: ${lastName}`
    }
    City: ${city}
    Country: ${state}
    Postal Code: ${postalCode}
    Street and Number: ${streetAndNumber}
    Email: ${email}

    ${
      isSameAsLicensee == "false"
        ? `Invoice Details:
    ${
      LicenseeDetailsType === "Company"
        ? `Company Name: ${companyNameInvoice}`
        : `First Name: ${firstNameInvoice}
    Last Name: ${lastNameInvoice}`
    }
    City: ${cityInvoice}
    Country: ${stateInvoice}
    Postal Code: ${postalCodeInvoice}
    Street and Number: ${streetAndNumberInvoice}
    Email: ${emailInvoice}`
        : ""
    }
  
    Additional Information:
    ${additionalInformation}

    `;

      // console.log(emailContent);
      let data = {
        content: emailContent,
      };
      let that = this;
      this.isSubmitting = true;
      // console.log(JSON.stringify(data));
      fetch("https://formsubmit.co/ajax/request@kimeracorp.eu", {
        // fetch("https://formsubmit.co/ajax/489d8e6ffd4abce2bd9233ce422b5fff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          that.success = true;
          that.isSubmitting = false;
        })
        .catch((error) => {
          that.error = true;
          that.isSubmitting = false;
          that.errorMessage = error;
          that.errorBackup = emailContent;
          console.log(error);
        });
    },
  },
  mounted() {
    this.fontFamily = this.getFontDataByName(this.fontName).fontFamilies;
    this.fontFamilyChunked = this.getFontDataAsChunks(3);

    if (!this.showDisclaimer) {
      this.$store.commit("setShowShopDisclaimer", true);
    }
  },
};
</script>
<style lang="scss">
.temporary-buy-form,
.temporary-trial-form {
  .form-submit-button {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    transform: translateY(-100%);
  }
}
.temporary-buy-form {
  // padding-bottom: 4rem;
  input[type="text"] {
    width: 100%;
    height: 2rem;
    // margin-bottom: 1rem;
  }

  &:has(#commercial:not(:checked)) #license-size-label {
    display: none;
    input {
      display: none;
    }
  }
  &:has(#same-as-licensee:checked) .invoice-details {
    display: none;
    input {
      display: none;
    }
  }
  // &:has(#licensee-details #licensee:checked) .person-form {
  //   display: none;
  // }
  // &:has(#licensee-details #licensee2:checked) .company-form {
  //   display: none;
  // }

  .font-cuts-inner {
    display: flex;
    flex-wrap: wrap;
    column-gap: 1rem;
    .font-cut {
      width: calc(50% - 0.5rem);
    }
  }
}
.is-submitting {
  cursor: wait !important;
}
button.is-submitting {
  opacity: 0.5;
}
label {
  // @include until($tablet) {
  display: block;
  // }
}
.font-cuts-wrapper {
  // max-height: 30rem;
  // overflow-y: auto;
  font-size: 1.2rem;
  padding: 0.5rem 0;
}
input:disabled + label {
  opacity: 0.25;
  cursor: not-allowed;
}
.label-wrapper {
  // margin-bottom: 1rem;
}
.flex-space-between {
  display: flex;
  justify-content: space-between;
}
.sticky-buttons {
  position: sticky;
  bottom: 0rem;
  gap: 0.25rem;
  z-index: 1;
  max-width: 50%;
}
.error-message {
  p {
    color: red;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  pre {
    font-size: 1rem;
    border: 1px solid black;
  }
}
.selection-button-wrapper:empty {
  display: none !important;
}
.success-message {
  p {
    color: rgb(12, 187, 12);
    padding: 1rem;
    width: 100%;
    padding: 0.25rem;
    padding-top: 0.5rem;
    // text-align: center;
    font-size: 1rem;
    span {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
