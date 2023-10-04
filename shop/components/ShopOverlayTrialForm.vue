<template>
  <div class="temporary-trial-form" style="padding: 2rem 0">
    <form id="trial-form">
      <!-- <input
        type="email"
        placeholder="Enter your email"
        id="trial-email"
        required
      />
      <input type="text" name="name" id="trial-name" />
      <input type="submit" value="Submit" @click="submit" /> -->
      <transition name="fade" mode="out-in">
        <shop-modal
          v-if="showModal"
          @close="showModal = false"
          :title="success ? 'Download successful!' : 'Error'"
          key="showmodal"
          :hasCursor="false"
        >
          <p v-if="success">
            Hi there!<br />
            <br />
            thank you for downloading our Full Version Trials! You can use them
            to test out our typefaces on your computer and pitch design
            directions to your clients.
            <br />
            <br />
            Please see our EULA for further information.
            <br />
            <br />
            Best,<br />
            kimera
          </p>
          <p v-if="error">
            Oh, oh, something went wrong!<br />
            <br />
            Please write us an email at post@kimeracorp.eu so we can fix this.
            In the meantime, you can download the trial here.
            <br />
            <br />
            Please see our EULA for further information.
            <br />
            <br />
            Best,<br />
            kimera
          </p>
          <template #buttons>
            <div class="flex trial-buttons">
              <a :href="blok.eulaLink" target="_blank">
                <tag-button
                  :is-secondary="true"
                  :isDiv="true"
                  :is-form-button="true"
                  >EULA</tag-button
                ></a
              >
              <a :href="blok.trialLink" target="_blank">
                <tag-button
                  :is-secondary="true"
                  :isDiv="true"
                  :is-form-button="true"
                  >Download</tag-button
                ></a
              >
            </div>
          </template>
        </shop-modal>
      </transition>
      <form-wrapper title="Trial Fonts" class="invoice-details">
        <div style="column-count: 2" class="gap">
          <input-text
            title="Email"
            id="trial-email"
            group="trial-email"
            placeholder="hello@domain.com"
            type="email"
          ></input-text>
          <input-text
            :required="false"
            title="Name"
            id="trial-name"
            group="trial-name"
            placeholder="John Doe"
          ></input-text>
        </div>
      </form-wrapper>
      <form-wrapper altColor isSmall>
        <selection-button
          type="checkbox"
          id="newsletter-check"
          :checkedByDefault="true"
          group="newsletter-check"
          >Interested in our upcoming newsletter?</selection-button
        >
      </form-wrapper>
      <div class="submit-button">
        <tag-button
          :is-form-button="true"
          :is-inverted="true"
          type="submit"
          @click.native="submit"
          :disabled="isSubmitting"
          :class="isSubmitting ? 'is-submitting' : ''"
          v-show="!success"
          >Download Trial</tag-button
        >
      </div>
    </form>
  </div>
</template>

<script>
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";

export default {
  data() {
    return {
      isSubmitting: false,
      success: false,
      showModal: false,
      error: false,
    };
  },
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async submit($event) {
      this.isSubmitting = true;
      const form = document.getElementById("trial-form");
      if (!form.checkValidity()) {
        this.isSubmitting = false;
        return;
      }
      $event.preventDefault();

      const firebaseConfig = {
        apiKey: "AIzaSyBV-SIBODXTZDKFeewEDOgw_O-LFexOOMk",
        authDomain: "kimera-mailing-list.firebaseapp.com",
        projectId: "kimera-mailing-list",
        storageBucket: "kimera-mailing-list.appspot.com",
        messagingSenderId: "711901179740",
        appId: "1:711901179740:web:c14561f9f8c8c264009b99",
      };

      const firebase = initializeApp(firebaseConfig);
      const firestore = getFirestore(firebase);

      const email = form.querySelector("input[type=email]").value;
      const name = form.querySelector("input[type=text]").value;
      const interestedInNewsletter = form.querySelector(
        "input[type=checkbox]"
      ).checked;
      const data = {
        name: name,
        email: email,
        newsletter: interestedInNewsletter,
        date: new Date(),
        font: this.blok.fontName,
      };

      try {
        const docRef = await addDoc(collection(firestore, "list"), data);

        // console.log("Document written with ID: ", docRef.id);
        this.success = true;
        this.error = false;
        this.isSubmitting = false;
        this.showModal = true;
        // open trialLink
        setTimeout(() => {
          window.open(this.blok.trialLink, "_blank");
        }, 1000);
      } catch (e) {
        this.success = false;
        this.error = true;
        this.isSubmitting = false;

        console.error("Error adding document: ", e);
      }

      //
      // fetch(
      //   "https://script.google.com/macros/s/AKfycbz-avjx-HogGLaxocQfqWztuaWtZoun3eWPcNvXHv3cDcQox3qCQSDOi7O2dbBMP9E2/exec",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //       "Access-Control-Allow-Origin": "*",
      //     },
      //     mode: "cors",

      //     body: { email: email },
      //   }
      // )
      //   .then((response) => {
      //     return response;
      //   })
      //   .then((data) => {
      //     console.log(data);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      // // .then((response) => response.json())
      // // .then((data) => {
      // //   console.log(data);
      // // })
      // // .catch((error) => {
      // //   console.log(error);
      // // });
    },
  },
};
</script>
<style lang="scss">
#trial-form {
  .gap {
    gap: 4px;
  }
  .submit-button {
    display: flex;
    justify-content: center;
  }
  .trial-buttons {
    justify-content: space-between;
    padding-top: 0.5rem;
  }
}
</style>
