<template>
  <keep-alive>
    <div class="temporary-buy-form relative">
      <div class="temporary-buy-form-inner relative">
        <div class="kimera-text" style="padding-bottom: 2rem">
          <p>
            Currently, the shop is under construction! Keep up to date by
            following @Kimeracorp. In the meantime, you can still purchase our
            fonts by contacting us directly:
          </p>
        </div>

        <form-wrapper title="License Size">
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
            >
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

        <form-wrapper title="License Type">
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
              :onChangeEventValue="false"
              @changed="changedLicenseeType"
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

        <form-wrapper title="Cut Selection">
          <!-- <div class="label-wrapper"> -->
          <selection-button-wrapper isGrid v-for="chunk in fontFamilyChunked">
            <selection-button
              v-for="cut in chunk"
              :key="cut"
              type="checkbox"
              :id="'cut-' + cut.weightReadable"
              :outputValue="cut.weightReadable"
              :group="'cut-' + cut.weightReadable"
              :labelText="'cut-' + cut.weightReadable"
              :onChangeEventValue="false"
              @changed="changedLicenseeType"
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

      <contactDetails :type="'licensee'" id="LicenseeDetails"></contactDetails>
      <input
        type="checkbox"
        checked
        name="same-as-licensee"
        id="same-as-licensee"
      />
      <label for="same-as-licensee">
        Invoice details are the same as Licensee details</label
      >
      <contactDetails
        :type="'invoice'"
        class="invoice-details"
        id="InvoiceDetails"
      ></contactDetails>

      <div style="padding-top: 2rem">
        <div class="flex-space-between">
          <tag-button is-secondary is-active>Pricing List</tag-button>
          <tag-button is-secondary is-active>EULA</tag-button>
        </div>
      </div>

      <div class="submit-button">
        <tag-button is-big is-secondary @click.native.prevent="submitForm"
          >Submit</tag-button
        >
      </div>
    </div>
  </keep-alive>
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
    };
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
      // Get all the data from the inputs and prepare an email template, that formats the data nicely and opens a new window with the email client
      // const licenseSizeLicensee = document.querySelector(
      //   'input[name="license-size-licensee"]:checked'
      // ).value;
      // const clientName = document.querySelector(
      //   'input[name="client-name"]'
      // ).value;
      // // const isStudent = document.querySelector('input[name="student"]').checked;
      // const isStudent =
      //   document.querySelector('input[name="student"]:checked').value === "yes"; // Check if 'yes' is selected

      // const companySize = document.querySelector(
      //   'input[name="license-size"]'
      // ).value;
      // const licenseTypes = Array.from(
      //   document.querySelectorAll('input[name="license-types"]:checked')
      // ).map((input) => input.value);
      // const fontCuts = Array.from(
      //   document.querySelectorAll('input[name^="cut-"]:checked')
      // ).map((input) => input.value);

      // // Prepare email template with the data
      // const emailBody = `
      //   Project is: ${licenseSizeLicensee}
      //   Client Name: ${clientName}
      //   Is Student: ${isStudent ? "Yes" : "No"}
      //   Company Size: ${companySize}
      //   License Types: ${licenseTypes.join(", ")}
      //   Font Cuts (${fontCuts.length}): ${fontCuts.join(", ")}
      // `;

      // // Open a new window with the email client and pre-fill the email template
      // const mailtoLink = `mailto:sales@kimeracorp.com?subject=Font%20Purchase%20Inquiry%20${
      //   this.fontName
      // }&body=${encodeURIComponent(emailBody)}`;
      // window.open(mailtoLink);

      const licenseeType = document.querySelector(
        'input[name="license-size-licensee"]:checked'
      ).value;

      const licenseSize = document.querySelector(
        'input[name="license-size"]:checked'
      ).value;

      const licenseTypes = Array.from(
        document.querySelectorAll('input[name="license-types"]:checked')
      ).map((checkbox) => checkbox.value);

      const cutsSelection = Array.from(
        document.querySelectorAll('input[name^="cut-"]:checked')
      ).map((checkbox) => checkbox.value);

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

      // Prepare the email content using the collected data
      const emailContent = `
    Licensee Type: ${licenseeType}
    License Size: ${
      licenseeType == "Student Project" ? "Student License" : licenseSize
    }
    License Types: ${licenseTypes.join(", ")}
    Cuts Selection: ${cutsSelection.join(", ")}
    Invoice is the same as Licensee: ${isSameAsLicensee}

    Contact Details:
    ${
      LicenseeDetailsType === "Company"
        ? `Company Name: ${companyName}`
        : `First Name: ${firstName}
    Last Name: ${lastName}`
    }
    City: ${city}
    State: ${state}
    Postal Code: ${postalCode}
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
    State: ${stateInvoice}
    Postal Code: ${postalCodeInvoice}
    Email: ${emailInvoice}`
        : ""
    }
  `;

      // Do something with the prepared email content, such as sending an email
      console.log(emailContent);
    },
  },
  mounted() {
    this.fontFamily = this.getFontDataByName(this.fontName).fontFamilies;
    this.fontFamilyChunked = this.getFontDataAsChunks(3);
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
  .submit-button {
    height: 3rem;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  &:has(#commercial:not(:checked)) #license-size-label {
    display: none;
  }
  &:has(#same-as-licensee:checked) .invoice-details {
    display: none;
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
.font-cuts-wrapper {
  // max-height: 30rem;
  // overflow-y: auto;
  font-size: 1.2rem;
  padding: 0.5rem 0;
}

.label-wrapper {
  margin-bottom: 1rem;
}
.flex-space-between {
  display: flex;
  justify-content: space-between;
}
</style>
