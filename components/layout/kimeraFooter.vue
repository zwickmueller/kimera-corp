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
        <div
          class="foot-link"
          :class="mobileActive == 'info' ? 'active-link' : ''"
        >
          <span role="link" @click="anim('info')">Info</span>
        </div>
        <div
          class="foot-link"
          :class="mobileActive == 'privacy' ? 'active-link' : ''"
        >
          <span role="link" @click="anim('privacy')">Privacy</span>
        </div>
        <div
          class="foot-link"
          :class="mobileActive == 'licensing' ? 'active-link' : ''"
        >
          <span role="link" @click="anim('licensing')">Licensing</span>
        </div>
        <div
          class="foot-link"
          :class="mobileActive == 'products' ? 'active-link' : ''"
        >
          <span role="link" @click="anim('products')">Products</span>
        </div>
      </div>

      <div class="foot-spacer flex kimera-text">
        <div
          class="info-content"
          :class="mobileActive == 'info' ? 'active' : ''"
        >
          <kimera-text
            v-if="getInfoContent"
            :blok="getInfoContent.content.info"
          ></kimera-text>
        </div>
        <div
          class="info-content"
          :class="mobileActive == 'privacy' ? 'active' : ''"
        >
          <kimera-text
            v-if="getInfoContent"
            :blok="getInfoContent.content.privacy"
          ></kimera-text>
        </div>
        <div
          class="info-content"
          :class="mobileActive == 'licensing' ? 'active' : ''"
        >
          <kimera-text
            v-if="getInfoContent"
            :blok="getInfoContent.content.licensing"
          ></kimera-text>
        </div>
        <div
          class="info-content"
          :class="mobileActive == 'products' ? 'active' : ''"
        >
          <kimera-text
            v-if="getInfoContent"
            :blok="getInfoContent.content.products"
          ></kimera-text>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { gsap } from "gsap/all";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { mapGetters, mapMutations } from "vuex";

if (process.client) {
  gsap.registerPlugin(ScrollToPlugin);
}
export default {
  data() {
    return {
      infoIsOpen: false,
      tl: null,
      // mobileActive: "info",
    };
  },
  computed: {
    ...mapGetters({
      getInfoContent: "getInfoContent",
      mobileActive: "getInfoMobileState",
      // ...
    }),
  },
  methods: {
    ...mapMutations({
      setInfoMobileState: "setInfoMobileState",
    }),
    getOffsetTop(element) {
      return element
        ? element.offsetTop + this.getOffsetTop(element.offsetParent)
        : 0;
    },
    anim(name) {
      // console.log("asd");
      // console.log(name);
      if (window.innerWidth < 769) {
        this.$nextTick(() => {
          // this.mobileActive = name;
          this.setInfoMobileState(name);
        });
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
            gsap.to(el, {
              minHeight: "100vh",
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
    opacity: 0;
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
  @include until($tablet) {
    .kimera-text {
      padding: 0;
    }

    &.is-info .active-link {
      color: var(--kimera-grey);
    }
    .foot-link {
      transition: 0.3s ease color;
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
