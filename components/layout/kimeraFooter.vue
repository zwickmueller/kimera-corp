<template>
  <footer
    class="kimera-footer"
    :class="[
      this.$route.name == 'info' ? 'is-info' : '',
      this.$route.name == 'index' ? 'is-index' : '',
    ]"
  >
    <div class="flex adress kimera-text-filter-tags">
      kimera Holzstraße 15a 80469 Munich
      <!-- <br class="hide-on-desktop" /> -->
      <!-- post@kimeracorp.eu -->
      <!-- <br class="hide-on-desktop" /> -->
      ®All Rights reserved ©kimera {{ new Date().getFullYear() }}
    </div>
    <div class="info-big-text">
      {{ getInfoContent ? getInfoContent.content.bigText : "" }}
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
          <div class="kimera-dude">
            <svg
              width="213"
              height="562"
              viewBox="0 0 213 562"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_5269_17640)">
                <path
                  d="M151.203 546.613C134.55 534.114 118.054 521.733 101.558 509.35C101.46 509.428 101.362 509.506 101.261 509.587C111.094 527.013 120.93 544.441 130.763 561.867C130.713 561.911 130.66 561.956 130.61 562C128.734 560.541 126.855 559.085 124.981 557.627C97.583 536.297 70.187 514.96 42.7692 493.651C41.8398 492.929 41.4842 492.184 41.4886 491.019C41.5366 475.106 41.5475 459.19 41.5409 443.276C41.5344 423.927 41.4886 404.581 41.4864 385.232C41.4864 376.334 41.5213 367.439 41.5955 358.544C41.6042 357.428 41.2791 356.81 40.2581 356.278C33.4314 352.723 26.6572 349.073 19.8305 345.521C18.792 344.98 18.6022 344.355 18.7244 343.281C19.1913 339.154 19.56 335.017 19.968 330.883C20.448 325.996 20.9301 321.107 21.4079 316.22C21.8006 312.194 22.189 308.166 22.5817 304.141C23.0639 299.217 23.5504 294.293 24.0304 289.369C24.4994 284.551 24.9554 279.733 25.4245 274.916C25.8979 270.063 26.3801 265.211 26.8535 260.358C27.2528 256.261 27.6411 252.162 28.0426 248.063C28.516 243.21 29.0003 238.358 29.4738 233.505C29.8708 229.443 30.2592 225.38 30.6563 221.318C31.1341 216.429 31.6184 211.542 32.0962 206.654C32.4627 202.915 32.8315 199.178 33.1893 195.439C33.5907 191.268 33.9594 187.095 34.3936 182.928C34.4808 182.082 34.171 181.624 33.5034 181.16C22.597 173.577 11.7145 165.962 0.801493 158.393C-0.0537451 157.8 -0.250101 157.397 0.323694 156.435C20.8625 122.058 41.3729 87.6641 61.8681 53.2611C62.3284 52.4885 62.8193 52.1565 63.7596 52.1869C71.1775 52.4299 78.3401 50.8631 85.4569 49.0424C88.2692 48.3241 91.0465 47.4647 93.8479 46.7073C99.3131 45.2295 103.347 41.7073 107.03 37.6644C107.656 36.9765 107.08 36.7378 106.644 36.4404C102.861 33.871 99.0731 31.3103 95.2878 28.7452C93.3352 27.4214 91.3956 26.0759 89.4233 24.7825C88.7863 24.3637 88.5899 24.0186 89.0786 23.3199C91.2145 20.2622 93.3308 17.1871 95.3991 14.0838C95.9314 13.2852 96.335 13.5955 96.887 13.971C102.59 17.8468 108.302 21.7096 114.011 25.5768C115.214 26.3906 115.2 26.3841 115.914 25.1514C118.615 20.4857 120.973 15.6159 124.224 11.2778C126.526 8.2071 129.22 5.53784 132.493 3.48707C138.654 -0.373585 145.221 -0.907436 152.054 1.29958C157.384 3.02049 162.119 5.83515 166.246 9.58296C173.712 16.3603 175.741 24.5981 172.634 34.1184C171.308 38.1831 169.218 41.8462 166.641 45.2533C164.148 48.5498 162.023 52.0957 159.673 55.4898C159.282 56.0562 159.442 56.3579 159.959 56.7073C166.187 60.9086 169.096 62.5601 175.292 66.807C176.079 67.3474 176.448 66.9394 176.946 66.488C184.854 60.9542 194.838 57.1912 203.694 54.8713C205.936 54.3093 206.768 54.2984 208.825 55.7741C209.997 56.7485 211.142 57.7598 212.357 58.6734C213.134 59.2572 213.173 59.7324 212.632 60.5397C207.208 68.6343 201.824 76.7527 196.428 84.8647C195.266 86.6138 194.131 88.3846 192.922 90.1012C192.421 90.813 192.397 91.3034 193.021 91.9718C194.402 93.4584 195.656 95.0599 197.035 96.5508C197.744 97.3169 197.596 97.6793 196.729 98.1415C193.976 99.615 191.286 101.204 188.517 102.645C187.424 103.213 187.128 103.934 187.285 105.086C187.778 108.695 189.584 111.67 191.74 114.485C192.246 115.147 192.77 115.802 193.354 116.39C193.928 116.967 193.913 117.427 193.424 118.063C190.252 122.189 186.395 125.57 182.064 128.432C177.068 131.733 171.677 134.077 165.686 134.864C164.774 134.984 164.582 135.216 164.974 136.071C167.006 140.472 168.847 144.96 171.02 149.296C172.27 151.789 172.045 152.933 169.925 154.819C158.626 164.875 147.324 174.931 135.999 184.96C135.144 185.717 134.779 186.479 134.779 187.644C134.81 251.517 134.801 315.391 134.81 379.264C134.81 395.792 134.877 412.319 134.873 428.849C134.867 458.001 134.834 487.152 134.792 516.303C134.792 517.321 135.032 518.187 135.539 519.064C140.607 527.801 145.651 536.551 150.693 545.303C150.885 545.637 151.179 545.936 151.197 546.609L151.203 546.613ZM89.1572 420.644C89.0612 420.644 88.9652 420.644 88.8692 420.644C88.795 419.127 88.6728 417.612 88.6554 416.095C88.4961 402.068 88.3543 388.04 88.2146 374.012C88.2016 372.676 88.2452 371.339 88.2626 370.002C88.2692 369.529 88.1972 369.14 87.5841 369.112C86.4234 369.062 85.2628 368.991 84.1021 368.91C83.4803 368.867 83.2556 369.14 83.2883 369.742C83.3603 371.076 83.4105 372.413 83.4563 373.748C83.801 384.116 84.1588 394.485 84.4752 404.856C84.6606 410.926 84.3115 444.453 84.6541 455.147C84.8177 460.277 84.9682 465.407 85.1362 470.537C85.1886 472.143 86.5194 472.059 88.1274 472.13C89.4691 472.191 89.3622 471.399 89.347 470.535C89.2771 466.414 89.1746 462.293 89.1659 458.172C89.1419 445.663 89.1572 433.153 89.1572 420.644Z"
                  fill="black"
                />
                <path
                  d="M165.013 77.9576C150.097 100.761 135.215 123.587 120.327 146.406C119.489 147.688 119.478 147.686 118.165 146.837L112.752 142.888L110.741 141.421C110.741 141.358 110.749 141.293 110.767 141.228C110.85 140.867 111.153 140.481 111.779 140.255C112.469 140.004 113.285 139.815 113.847 139.578C116.424 138.495 119.047 137.519 121.593 136.373C123.499 135.516 124.318 133.623 123.833 131.712C123.393 129.967 121.741 128.732 119.882 128.76C119.051 128.743 118.305 129.06 117.556 129.359C113.365 131.043 109.176 132.727 104.987 134.409C104.339 134.667 103.506 134.674 102.705 134.492C101.702 134.266 100.748 133.743 100.275 133.061C100.087 132.79 100.092 132.593 100.233 132.426C100.281 132.369 100.343 132.315 100.417 132.267C100.772 132.028 101.15 131.818 101.525 131.612C108.657 127.632 113.562 125.344 120.7 121.382C122.258 120.518 123.347 119.396 123.342 117.491C123.338 114.733 120.75 112.829 118.128 113.71C117.473 113.93 116.852 114.275 116.243 114.613C107.933 119.233 101.854 122.17 93.5421 126.79C93.5312 126.796 93.5225 126.803 93.5116 126.807C92.9683 127.115 92.4447 127.619 91.7793 127.456C91.6854 127.434 91.5916 127.408 91.4935 127.378C90.7953 127.167 90.0819 126.785 89.8462 126.176C89.8419 126.167 89.8375 126.158 89.8353 126.152C89.5408 125.334 90.588 125.143 91.1204 124.806C91.1204 124.806 91.1269 124.802 91.1291 124.8C100.207 118.953 107.075 114.835 116.167 109.01C116.754 108.632 117.353 108.268 117.908 107.847C119.808 106.408 120.246 104.175 119.018 102.317C117.829 100.518 115.497 100.01 113.453 101.171C112.288 101.833 111.17 102.588 110.043 103.311C100.814 109.223 93.8192 113.439 84.597 119.348C84.189 119.611 83.7789 119.874 83.3731 120.134C83.1462 120.279 82.9062 120.407 82.6945 120.57C82.6029 120.642 82.5113 120.703 82.4196 120.752C81.632 121.186 80.9273 120.831 80.4539 120.18C80.1812 119.804 80.2597 119.537 80.4605 119.322C80.6764 119.09 81.0364 118.914 81.2524 118.732C81.6844 118.367 82.1164 118.001 82.5484 117.638C87.8565 113.153 90.9568 110.386 96.278 105.913C96.7689 105.499 97.2772 105.093 97.7027 104.615C99.0924 103.062 99.1273 100.883 97.8205 99.3311C96.5463 97.8121 94.2904 97.4388 92.5647 98.5868C91.452 99.3268 90.4506 100.236 89.423 101.1C84.2785 105.412 81.3484 108.012 76.2344 112.361C75.5428 112.949 74.849 113.541 74.1574 114.131C74.0025 114.264 73.8804 114.372 73.7822 114.455L72.351 113.409C72.015 112.825 72.3008 112.198 72.94 111.187C72.9706 111.139 73.0011 111.091 73.0338 111.039C73.0709 110.985 73.108 110.926 73.1473 110.868C73.2869 110.651 73.4418 110.416 73.6055 110.162C87.5358 88.8039 101.466 67.4498 115.401 46.0892C116.276 44.7459 116.282 44.7394 117.633 45.6096C133.269 55.6986 148.901 65.7962 164.557 75.8569C165.55 76.4971 165.664 76.955 165.011 77.951L165.013 77.9576Z"
                  fill="white"
                />
                <path
                  d="M127.415 58.626L114.802 77.9271L129.943 71.7704L140.85 78.8212L124.969 84.8216L125.274 103.15L113.687 95.6592L114.508 78.3785L106.326 90.9001L96.7832 84.7304L117.874 52.4563L127.417 58.626H127.415Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_5269_17640">
                  <rect width="213" height="562" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
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
            const el2 = document.querySelector(".info-big-text");
            // console.log(this.getOffsetTop(el) - 36);
            console.log(el, el2, this.getOffsetTop(el), this.getOffsetTop(el2));
            gsap.to(window, {
              scrollTo: {
                y: this.getOffsetTop(el2) - this.$helpers.getEmValue() * 3,
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
.info-big-text {
  opacity: 0;
  // display: none;
}
.is-info .info-big-text {
  opacity: 1;
  display: block;
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
.kimera-dude {
  width: 100%;
  display: flex;
  padding-top: 1rem;
}
</style>
