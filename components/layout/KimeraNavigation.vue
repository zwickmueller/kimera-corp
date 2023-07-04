<template>
  <header class="nav-wrapper fixed fixed-reset">
    <!-- <nav> -->
    <!-- <transition-group tag="nav" @before-enter="onBeforeEnter" @enter="onEnter" @after-enter="onAfterEnter" @enter-cancelled="onEnterCancelled" @before-leave="onBeforeLeave" @leave="onLeave" @after-leave="onAfterLeave"
    @leave-cancelled="onLeaveCancelled"> -->
    <transition-group tag="nav" :css="false" @enter="onEnter" @leave="onLeave">
      <tag-button
        v-for="(tag, i) in visibleTags"
        :key="tag.name + tag.active"
        v-if="tag.show"
        ref="tags"
        @click.native="handleTagClick(tag, i)"
        class="tag"
        :data-index="i"
        :data-sub-index="!tag.isMainTag ? i - activeTagsComputed.length : null"
        :class="[
          !tag.isMainTag && !tag.active && !tag.isTitle ? 'subtag' : '',
          tag.active ? 'active' : '',
          tag.isTitle ? 'title' : '',
        ]"
        :style="`order: ${tag.active && tag.subTags ? 0 : i}`"
      >
        {{ !tag.isTitle ? tag.name : "" }}

        <kimera-logo v-if="tag.isTitle"></kimera-logo>

        <span class="close-icon-wrapper" v-if="tag.active">
          <close-icon></close-icon>
        </span>
      </tag-button>
    </transition-group>
    <!-- <kimera-outline></kimera-outline> -->
    <transition name="fade" mode="out-in">
      <kimera-outline v-if="shouldRenderOutline"></kimera-outline>
      <div class="" v-else></div>
    </transition>

    <div class="flex-spacer"></div>
    <!-- </nav> -->
  </header>
</template>

<script>
import { gsap } from "gsap";
import clonedeep from "lodash.clonedeep";
// for (var i = 0; i < tags.length; i++) {
//   tags[i].active = false;
//   if (!tags[i].show) tags[i].show = false;
// }
// tags.sort((a, b) => Number("subTags" in b) - Number("subTags" in a));
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      tags: [],
      activeTagsIncreased: false,
      navAnimDuration: 0.55,
      navAnimDurationIn: 0.3,
      navAnimHoldDuration: 0.115,
      test: null,
    };
  },
  methods: {
    onEnter(el, done) {
      let width = el.getBoundingClientRect().width + "px";
      this.$nextTick(() => {
        gsap.set(el, {
          x: 0,
          opacity: 0,
          width: el.getBoundingClientRect().height + "px",
          position: "absolute",
        });
        const tl = gsap.timeline();
        tl.set(el, {
          opacity: 1,
          position: "relative",
          delay: this.navAnimDurationIn + this.navAnimHoldDuration,
          width: el.getBoundingClientRect().height + "px",
        });
        tl.fromTo(
          el,
          {
            width: el.getBoundingClientRect().height + "px",
          },
          {
            x: 0,
            width: width,
            duration: this.navAnimDuration,
            onComplete: done,
            ease: "elastic.out(1.2, 0.90)",
          }
        );
      });
    },

    onLeave(el, done) {
      // let gridGap = 0.5 * 2;
      const tl = gsap.timeline();
      this.$nextTick(() => {
        const style = getComputedStyle(el);
        const padding = parseFloat(style.fontSize);
        const letterSpacing = parseFloat(style.letterSpacing);

        tl.to(el, {
          onStart: function () {
            el.classList.add("is-transitioning");
          },
          onComplete: function () {
            el.classList.remove("is-transitioning");
          },
          duration: this.navAnimDurationIn,
          x:
            (-el.getBoundingClientRect().height - (padding - letterSpacing)) *
            (Number(el.dataset.index) -
              this.activeTagsComputed.length +
              Number(this.activeTagsIncreased)),
          color: el.classList.contains("subtag")
            ? "rgba(0,0,0,0)"
            : "rgba(255,255,255,0)",
          background: "black",
          width: el.getBoundingClientRect().height + "px",
          ease: "power2.inOut",
        });
        tl.set(el, {
          onComplete: done,
          delay: this.navAnimHoldDuration,
        });
      });
    },
    handleTagClick(tag, i) {
      if (tag.isTitle) {
        this.$router.push("/");
        return;
      }
      tag.active = !tag.active;

      const lastAddedTag =
        this.activeTagsComputed[this.activeTagsComputed.length - 1];
      const allMainTags = this.tags.filter((el) => el.isMainTag);
      if (tag.isMainTag) {
        for (var i = 0; i < allMainTags.length; i++) {
          if (tag.name != allMainTags[i].name) {
            allMainTags[i].show = false;
            allMainTags[i].active = false;
          }
        }
      }
      if (tag.isMainTag && !tag.active) {
        for (var u = 0; u < allMainTags.length; u++) {
          allMainTags[u].show = true;
          allMainTags[u].active = false;
        }
      }

      if (tag.subTags) {
        for (var i = 0; i < this.tags.length; i++) {
          const _tag = this.tags[i];
          let _subTag;
          const subTag = tag.subTags.find((el) => {
            let check = el === _tag.name;
            _subTag = check ? _tag : false;
            return check ? _tag : false;
          });
          if (!_tag.active && !_tag.isMainTag) _tag.show = false;
          if (_subTag) _subTag.show = tag.active;
          if (_subTag && !tag.active) _subTag.active = false;
        }
        if (lastAddedTag && lastAddedTag.subTags) {
          for (var i = 0; i < lastAddedTag.subTags.length; i++) {
            let subTag = this.tags.find(
              (el) => el.name == lastAddedTag.subTags[i]
            );
            subTag.show = true;
          }
        }
      } else {
        const test = this.tags.filter(
          (tag) => !tag.isMainTag && tag.show && !tag.subTags
        );
        test.forEach((el) => {
          if (!el.active) {
            el.active = false;
            el.show = false;
          }
        });
      }
      let lastActiveTagWithSubTags = [...this.activeTagsComputed]
        .reverse()
        .find((el) => el.subTags);
      if (lastActiveTagWithSubTags && !tag.active) {
        for (var i = 0; i < lastActiveTagWithSubTags.subTags.length; i++) {
          let subTag = this.tags.find(
            (el) => el.name == lastActiveTagWithSubTags.subTags[i]
          );
          if (subTag) {
            subTag.active = false;
            subTag.show = true;
          }
        }
      }

      const visibleMainTags = this.visibleTags.filter((el) => el.isMainTag);
      if (
        visibleMainTags.length >=
        this.tags.filter((tag) => tag.isMainTag).length
      ) {
        this.tags.forEach((el) => (el.show = el.isMainTag));
        this.tags.forEach((el) => (el.active = false));
      }
      this.$root.$emit("activeTags", this.activeTagsComputed);
    },
    async fetchTags() {
      if (this._tags) {
        let tags = clonedeep(this._tags);
        for (var i = 0; i < tags.length; i++) {
          tags[i].active = false;
          if (!tags[i].show) tags[i].show = false;
        }
        tags.sort((a, b) => Number("subTags" in b) - Number("subTags" in a));
        this.tags = tags;
        return;
      }
      let tags = await this.$axios.$get("/api/tags.json");
      // let tags = await this.$axios.$get(
      //   "https://zwickmueller.github.io/kimera-corp-json-store/tags.json"
      // );

      for (var i = 0; i < tags.length; i++) {
        tags[i].active = false;
        if (!tags[i].show) tags[i].show = false;
      }
      tags.sort((a, b) => Number("subTags" in b) - Number("subTags" in a));

      this.tags = tags;
    },
  },
  computed: {
    ...mapGetters({
      _tags: "getTags",
    }),
    visibleTags() {
      if (!this.tags) return;

      return this.tags.filter((tag) => tag.show);
    },
    activeTagsComputed() {
      if (!this.tags) return;

      return this.tags.filter((tag) => tag.active);
    },
    shouldRenderOutline() {
      return (
        this.$route.name !== "index" &&
        this.$route.name !== "products-all" &&
        !this.isPageTransitioning
      );
    },
    isPageTransitioning() {
      return this.$store.state.isPageTransitioning;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler: async function (old, _new) {
        // console.log(this.tags, this.tags.length);
        if (this.tags.length == 0) {
          await this.fetchTags();
          // return;
        }
        if (old.name == "index") {
          this.tags.forEach((el) => (el.show = el.isMainTag));
        } else if (old.name !== "index") {
          this.tags.forEach((el) => (el.show = el.isTitle));
          this.tags.forEach((el) => (el.active = false));
        }
        // console.log(old, _new);
      },
    },
    activeTagsComputed: function (a, b) {
      this.activeTagsIncreased = a.length - b.length > 0 ? true : false;
    },
  },
  fetchKey: "kimera-tags",
  async fetch() {
    await this.fetchTags();
  },
  mounted() {
    const nav = document.querySelector("nav");
    console.log(nav);
    gsap.set(nav, { x: -nav.getBoundingClientRect().width * 1.2 + "px" });
    let animPlayed = false;
    const anim = gsap.to(nav, {
      x: 0,
      duration: 1.15,
      paused: true,
      // ease: "circ.out",

      ease: "elastic.out(1, 1.25)",
      delay: -0.35,
      onComplete: () => {
        animPlayed = true;
      },
    });

    this.$root.$on("intro-animation-complete", () => {
      anim.play();
    });
    setTimeout(() => {
      if (!animPlayed) {
        anim.play();
      }
    }, 3000);
    // nav.style.transform = `translateX(-${nav.getBoundingClientRect().width}px)`;
    // nav.style.transition = "transform 0.375s ease-out";
    // this.$root.$on("intro-animation-complete", () => {
    //   nav.style.transform = `translateX(0px)`;
    // });
    if (this.$route.name !== "index") {
      this.tags.forEach((el) => (el.show = el.isTitle));
      this.tags.forEach((el) => (el.active = false));
    }
  },
};
</script>

<style lang="scss">
.tag.active:hover {
  span svg {
    rect {
      fill: var(--kimera-white) !important;
    }
    path {
      fill: var(--black);
      stroke: var(--black);
    }
  }
}
.tag.active {
  @include until($tablet) {
    span svg {
      rect {
        fill: var(--kimera-white) !important;
      }
      path {
        fill: var(--black);
        stroke: var(--black);
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.tag.title {
  text-transform: lowercase;
}
.close-icon-wrapper {
  margin-right: 4px;
  width: 8px;
  display: block;
  @include until($tablet) {
    margin-right: 0px;
    width: 8px;
    height: 4px;
    svg {
      position: absolute;
      top: 7px;
      right: 4px;
    }
  }
}
.is-transitioning .close-icon {
  opacity: 0;
}

.nav-wrapper {
  padding: var(--kimera-small-gap) var(--kimera-side-padding);
  // padding: 0.5rem var(--kimera-side-padding);
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 100;
}
nav {
  flex-grow: 1;
  flex-basis: 0;
  // padding-left: var(--kimera-side-padding);
  list-style: none;
  margin: 0;
  // padding: 0;
  display: flex;
  grid-gap: 0.5rem;
}
</style>
