<template>
  <footer
    class="kimera-footer"
    :class="[
      this.$route.name == 'info' ? 'is-info' : '',
      this.$route.name == 'index' ? 'is-index' : '',
    ]"
  >
    <div class="flex adress kimera-text-filter-tags">
      kimera Holzstraße 15a 80469 München +49 173 9032725
      <br class="hide-on-desktop" />
      post@kimeracorp.eu <br class="hide-on-desktop" />®All Rights reserved
      ©kimera2022
    </div>
    <div class="">
      <div class="foot flex kimera-text-filter-tags">
        <div class="foot-link">
          <span role="link" @click="anim('info')">Info</span>
        </div>
        <div class="foot-link">
          <span role="link" @click="anim('privacy')">Privacy</span>
        </div>
        <div class="foot-link">
          <span role="link" @click="anim('licensing')">Licensing</span>
        </div>
        <div class="foot-link">
          <span role="link" @click="anim('products')">Products</span>
        </div>
      </div>

      <div class="foot-spacer flex kimera-text">
        <div
          class="info-content"
          :class="mobileActive == 'info' ? 'active' : ''"
        >
          <p>
            Kasper-Florio is a graphic design studio, founded by Larissa Kasper
            and Rosario Florio in 2013. Together with our frequent collaborators
            Bänziger Hug we run Jungle Books, an independent publishing imprint
            specializing in contemporary visual arts.
            <br />
            <br />
            kimera<br />
            Michael Clasen<br />
            Holzstraße 15A<br />
            80469 Munich GER<br /><br />
            post@kimeracorp.eu<br />
            www.kimeracorp.eu<br />
            +49 (0)173 903 2725<br />
            <br />
            Website programming: <br />Artur Neufeld <br /><br />
            Typeface in use:<br />
            Waldenburg Halbfett<br /><br />
            Collaborators:<br />
            Mario Nägele<br />
            Marcel Saidov<br />
            Artur Neufeld<br /><br />
            Interviews:<br />
            It‘s Nice That, 2018<br />
            Type01, Industry Interviews, 2020<br />
            Trax Mag, Feed from Designer, 2020<br />
            KD Lounge, SoSe-2020-001, 2020<br />
            Hochschule Pforzheim, Werksound, 2021<br />
            Fabrice Pöhlmann, Live Lunch Break, 2021<br />
            Hochschule Mainz, Cup Club, 2021<br /><br />
            Teaching & Lectures:<br />
            Stuttgart Media University, Lectureship, 2019-2020<br />
            Hochschule Pforzheim - Fakultät für Gestaltung, Workshop, 2022<br />
          </p>
        </div>
        <div
          class="info-content"
          :class="mobileActive == 'privacy' ? 'active' : ''"
        >
          <p>
            Privacy Policy<br />
            Version 1.14<br />
            <br />
            If the opportunity for the input of personal or business data (email
            addresses, name, addresses) is given, the input of these data takes
            place voluntarily. The use and payment of all offered services are
            permitted—if and so far technically possible and reasonable without
            specification of any personal data or under specification of
            anonymized data or an alias. The use of published postal addresses,
            telephone or fax numbers and email addresses for marketing purposes
            is prohibited, offenders sending unwanted spam messages will be
            punished.
          </p>
        </div>
        <div
          class="info-content"
          :class="mobileActive == 'licensing' ? 'active' : ''"
        >
          <p>
            End User License Agreement Version 2.14 Terminology & Licenses The
            terms and conditions set below establish an agreement between you
            (the Licensee) and kimera (the Supplier) governing the use of the
            Font Software (or “Font”) ordered by you. This End User License
            Agreement (“Agreement”, or “License”) becomes binding by
            downloading, installing, or otherwise using the Font Software
            provided by the Supplier. Ownership and Copyright The font software
            downloaded will always remain copyrighted to the Supplier. The font
            software and the intellectual property of the design contained are
            owned by the Supplier and/or its contractors. Purchasing licenses
            grants you limited rights to use the font software. You are not
            allowed to share, distribute, illegally copy, sublicense, lend,
            lease, or sell the font software, its design, or any portion of it.
            Except for your right to use the font software granted by this
            license, all other rights are owned and retained by the Supplier.
            You hereby agree that this term is contractual in nature and that
            the unauthorized use of the design of the Font Software shall be an
            infringement of the Supplier’s rights. Lawful Use of Product By
            purchasing any font software from the Supplier and upon full payment
            of the agreed usage fee, you are granted the right to use the font
            software as specified in the order. Desktop License With any
            purchase of a desktop license, you obtain a license to install the
            font software on the specified number of computers. These computers
            have to belong to the Licensee. You are allowed to connect to and
            use the font software with any number of output devices, belonging
            to the Licensee, such as printers. The font software may be passed
            to a commercial printer or other prepress facilities in the scope of
            a defined project, only to prepare for printing and print your
            documents. Third parties are not allowed to actively create new
            documents with font software that has been passed on for output
            only. If any modification to a document is to be made by a
            non-licensee, a new license must be purchased. Web License By
            purchasing a web license you are granted the right to embed the font
            software on one website domain owned by the Licensee with the
            specified web traffic. Only the original font software de­livered
            can be used. The font software has to be stored on the same server
            associated with the licensed domain. Technologies other than
            @font-face are not allowed. The use of third-party font hosting
            services is prohibited. App License The font software delivered with
            an app license can be embedded in one mobile application with the
            specified app downloads. The use of font software may be used for
            the development of the app. Social Media License A social media
            license grants the Licensee the right to use the font software on
            social media platforms with the specified number of followers. A
            desktop license has to be purchased and registered to the Licensee
            prior to purchasing a social media license. Video License With a
            video license, the Licensee can use the fonts to make content that
            has animated or moving images of any kind. This license is needed
            for creating video content for streaming services like YouTube,
            Netflix, Vimeo, Twitch but also television, movies, commercials,
            exhibition screens and video billboards. For video content that is
            being used on social media there needs to be both a video license
            and a social media license. Student License Student licenses
            authorize the Licensee to use the font software for private &
            private commercial purposes only and exclusively as long as being a
            student. Private Commercial purposes are cases where there is no
            third party (a client) involved. The Licensee can use the font
            software to create own commercial projects but would still need to
            purchase licenses for third parties. Corporate License The purchase
            of a corporate license grants the Licensee to install font software
            on an unlimited number of computers belonging to the Licensee,
            and/or embed the font software on one website domain owned by the
            Licensee with unlimited web traffic, and/or embed the font software
            in one mobile application with unlimited downloads, ­and/or use the
            font software on social media platforms with unlimited followers,
            and/or use the font software for animation/moving image purposes.
            Specific details must be discussed with and agreed by the Supplier.
            Trial License The use of font software of a trial license is allowed
            for testing purposes only. The use for commercial or personal public
            projects is prohibited. If the font software is to be used for a
            project, a license has to be purchased and registered. Modifications
            You are not allowed to convert, modify, or rename the font software
            under any circumstance. Any modifications must be discussed with the
            Supplier as a bespoke project. Purchase and Transfer of Licenses
            Licenses are not transferrable to other companies or individuals.
            You are allowed to purchase font software on behalf of a client.
            Your client must be registered as the Licensee after the purchase,
            informed about this agreement, and provided with the invoice related
            to the purchase. The client has to accept this agreement. You are
            not authorized to invoice your client at another price as the one
            displayed on our site. Limited Liability Although every effort has
            been taken to produce the font software to the highest standards, in
            no circumstance whatsoever will the Supplier be liable to you for
            any consequential, indirect, incidental, punitive or special damages
            including any lost profits, lost data or lost savings. All font
            software installed is done so at the Licensee’s risk. Miscellaneous
            Any breach of the terms of this agreement shall be cause for
            termination. The use of font software in any racist, homophobic,
            transphobic, or sexist context is prohibited. We will pursue legal
            action if you are found to be using our fonts illegally. We reserve
            the right to update this agreement at any time without prior consent
            or notice. You acknowledge that you have read, understood, and
            agreed to be bound by the terms and conditions of this agreement.
          </p>
        </div>
        <div
          class="info-content"
          :class="mobileActive == 'products' ? 'active' : ''"
        >
          <p>
            End User License Agreement Version 2.14 Terminology & Licenses The
            terms and conditions set below establish an agreement between you
            (the Licensee) and kimera (the Supplier) governing the use of the
            Font Software (or “Font”) ordered by you. This End User License
            Agreement (“Agreement”, or “License”) becomes binding by
            downloading, installing, or otherwise using the Font Software
            provided by the Supplier. Ownership and Copyright The font software
            downloaded will always remain copyrighted to the Supplier. The font
            software and the intellectual property of the design contained are
            owned by the Supplier and/or its contractors. Purchasing licenses
            grants you limited rights to use the font software. You are not
            allowed to share, distribute, illegally copy, sublicense, lend,
            lease, or sell the font software, its design, or any portion of it.
            Except for your right to use the font software granted by this
            license, all other rights are owned and retained by the Supplier.
            You hereby agree that this term is contractual in nature and that
            the unauthorized use of the design of the Font Software shall be an
            infringement of the Supplier’s rights. Lawful Use of Product By
            purchasing any font software from the Supplier and upon full payment
            of the agreed usage fee, you are granted the right to use the font
            software as specified in the order. Desktop License With any
            purchase of a desktop license, you obtain a license to install the
            font software on the specified number of computers. These computers
            have to belong to the Licensee. You are allowed to connect to and
            use the font software with any number of output devices, belonging
            to the Licensee, such as printers. The font software may be passed
            to a commercial printer or other prepress facilities in the scope of
            a defined project, only to prepare for printing and print your
            documents. Third parties are not allowed to actively create new
            documents with font software that has been passed on for output
            only. If any modification to a document is to be made by a
            non-licensee, a new license must be purchased. Web License By
            purchasing a web license you are granted the right to embed the font
            software on one website domain owned by the Licensee with the
            specified web traffic. Only the original font software de­livered
            can be used. The font software has to be stored on the same server
            associated with the licensed domain. Technologies other than
            @font-face are not allowed. The use of third-party font hosting
            services is prohibited. App License The font software delivered with
            an app license can be embedded in one mobile application with the
            specified app downloads. The use of font software may be used for
            the development of the app. Social Media License A social media
            license grants the Licensee the right to use the font software on
            social media platforms with the specified number of followers. A
            desktop license has to be purchased and registered to the Licensee
            prior to purchasing a social media license. Video License With a
            video license, the Licensee can use the fonts to make content that
            has animated or moving images of any kind. This license is needed
            for creating video content for streaming services like YouTube,
            Netflix, Vimeo, Twitch but also television, movies, commercials,
            exhibition screens and video billboards. For video content that is
            being used on social media there needs to be both a video license
            and a social media license. Student License Student licenses
            authorize the Licensee to use the font software for private &
            private commercial purposes only and exclusively as long as being a
            student. Private Commercial purposes are cases where there is no
            third party (a client) involved. The Licensee can use the font
            software to create own commercial projects but would still need to
            purchase licenses for third parties. Corporate License The purchase
            of a corporate license grants the Licensee to install font software
            on an unlimited number of computers belonging to the Licensee,
            and/or embed the font software on one website domain owned by the
            Licensee with unlimited web traffic, and/or embed the font software
            in one mobile application with unlimited downloads, ­and/or use the
            font software on social media platforms with unlimited followers,
            and/or use the font software for animation/moving image purposes.
            Specific details must be discussed with and agreed by the Supplier.
            Trial License The use of font software of a trial license is allowed
            for testing purposes only. The use for commercial or personal public
            projects is prohibited. If the font software is to be used for a
            project, a license has to be purchased and registered. Modifications
            You are not allowed to convert, modify, or rename the font software
            under any circumstance. Any modifications must be discussed with the
            Supplier as a bespoke project. Purchase and Transfer of Licenses
            Licenses are not transferrable to other companies or individuals.
            You are allowed to purchase font software on behalf of a client.
            Your client must be registered as the Licensee after the purchase,
            informed about this agreement, and provided with the invoice related
            to the purchase. The client has to accept this agreement. You are
            not authorized to invoice your client at another price as the one
            displayed on our site. Limited Liability Although every effort has
            been taken to produce the font software to the highest standards, in
            no circumstance whatsoever will the Supplier be liable to you for
            any consequential, indirect, incidental, punitive or special damages
            including any lost profits, lost data or lost savings. All font
            software installed is done so at the Licensee’s risk. Miscellaneous
            Any breach of the terms of this agreement shall be cause for
            termination. The use of font software in any racist, homophobic,
            transphobic, or sexist context is prohibited. We will pursue legal
            action if you are found to be using our fonts illegally. We reserve
            the right to update this agreement at any time without prior consent
            or notice. You acknowledge that you have read, understood, and
            agreed to be bound by the terms and conditions of this agreement.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { gsap } from "gsap/all";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (process.client) {
  gsap.registerPlugin(ScrollToPlugin);
}
export default {
  data() {
    return {
      infoIsOpen: false,
      tl: null,
      mobileActive: "info",
    };
  },
  methods: {
    getOffsetTop(element) {
      return element
        ? element.offsetTop + this.getOffsetTop(element.offsetParent)
        : 0;
    },
    anim(name) {
      // console.log("asd");
      console.log(name);
      if (window.innerWidth < 769) {
        this.mobileActive = name;
      }
      if (this.$route.name == "info") return;
      this.infoIsOpen = !this.infoIsOpen;
      this.infoIsOpen ? this.tl.play() : this.tl.reverse();
      this.$nextTick(() => {
        const el = document.querySelector(".foot-spacer");
        //
        //   el.scrollIntoView({
        //     behavior: "smooth",
        //     block: "start",
        //     // inline: "nearest"
        //   })
        // let el = document.getElementById(domId)
        // console.log(el)
        // this.mouseLeave(payload)
      });
    },
  },
  mounted() {
    if (this.$route.name == "info") {
      gsap.to(window, {
        scrollTo: {
          y: 0,
        },
        duration: 0,
        autoKill: true,
        // ease: "elastic.out(1, 2)",
      });
      // window.scrollTo({
      //   left: 0,
      //   top: 0
      // })
      return;
    }
    this.tl = gsap.timeline({
      paused: true,
    });
    const anim1 = this.tl.to(".foot", {
      width: "100%",
      ease: "elastic.out(1, 1.5)",
      duration: 0.8,
    });
    const anim2 = this.tl.fromTo(
      ".foot-spacer",
      {
        opacity: 0,
      },
      {
        opacity: 0,
        display: "flex",
        onStart: () => {
          this.$nextTick(() => {
            const el = document.querySelector(".foot");
            // console.log(this.getOffsetTop(el) - 36);
            console.log(this.$helpers.getEmValue() * 3);
            gsap.to(window, {
              scrollTo: {
                y: this.getOffsetTop(el) - this.$helpers.getEmValue() * 3,
              },
              duration: 1,
              autoKill: true,
              ease: "elastic.out(1, 2)",
            });
            // window.scrollTo({
            //   left: 0,
            //   top: this.getOffsetTop(el) - (this.$helpers.getEmValue() * 3),
            //   behavior: "smooth"
            // })
          });
        },
        onComplete: () => {
          const el = document.querySelector(".foot");
          gsap.set(el, {
            opacity: 1,
          });
          this.$router.push({
            path: "/info",
          });
        },
        duration: 1,
        // width: '100%'
      }
    );

    // let a = -1
    // window.addEventListener("wheel", (evt) => {
    //   if (!evt) evt = event;
    //   var direction = (evt.detail < 0 || evt.wheelDelta > 0) ? 1 : -1;
    //   // console.log(evt);
    //   let test = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2
    //   console.log(test);
    //   if (test && a !== 0) {
    //     a += direction
    //     evt.preventDefault()
    //     tl.play()
    //
    //   } else {
    //     // a = 0
    //     tl.reverse()
    //
    //   }
    //   console.log(a);
    // }, {
    //   passive: false
    // })
  },
};
</script>

<style lang="scss" scoped>
.info-content {
  @include until($tablet) {
    &:not(.active) {
      display: none;
      transition: opacity 1s ease;
      opacity: 0;
    }
    &.active {
      margin-top: 1rem;
      opacity: 1;
    }
  }
}
.kimera-footer.is-info {
  .adress {
    display: none;
  }
  .foot-spacer {
    display: flex;
    opacity: 1;
  }
  .foot {
    width: 100%;
  }
  padding-top: 3em;
}
.foot-link span {
}
.kimera-footer:not(.is-info) {
  .foot-link span {
    transition: 0.3s ease color;
    cursor: pointer;
    &:hover {
      color: var(--kimera-grey);
    }
  }
}
.kimera-footer {
  position: relative;
  .adress {
    margin-bottom: max(33vh, 30em);
    // margin-bottom: 30em;
    // margin-bottom: 10em;
  }
  .foot,
  .foot-spacer {
    display: flex;
    grid-column-gap: var(--kimera-grid-gap);
    // margin-top: 30em;
    justify-content: space-between;
    width: min-content;
    div {
      flex: 1;
    }
  }
  .foot-spacer {
    width: 100%;
    // height: 100vh;
    display: none;
    // display: flex;
    grid-column-gap: var(--kimera-grid-gap);
    justify-content: space-between;

    div {
      flex: 1;
    }
    &.is-info {
      display: flex;
    }
  }
  padding: var(--kimera-small-gap) var(--kimera-side-padding);
  &.is-index {
    padding: 1em var(--kimera-side-padding) var(--kimera-small-gap);
  }
  // a:first-child {
  //     padding-right: 1em;
  //
  // }
}
</style>
