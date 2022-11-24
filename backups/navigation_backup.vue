<template >
<div class="nav-wrapper fixed fixed-reset">
  <nav>
    <!-- <tag-button>Services</tag-button>
    <tag-button>Typefaces</tag-button>
    <tag-button>Objects</tag-button>
    <tag-button>Garmets</tag-button> -->
    <tag-button v-for="(tag,i) in getTags" :key="tag.name" @click.native="handleTagClick(tag, i)" class="tag" :data-index="i" :class="tag.isSubTag && !tag.active ? 'subtag' : ''">{{tag.name}}{{tag.active ? ' x' : ''}}</tag-button>
  </nav>
</div>
</template>

<script>
import {
  gsap
} from "gsap";

// circle button width = height = 2.65em

const tags = [{
    name: 'Services',
    active: false,
    show: true,
    subTags: [{
        name: 'Branding',
        active: false,
        subTags: [{
            name: 'Book',
            active: false,
          },
          {
            name: 'Magazine',
            active: false
          },
          {
            name: 'Catalogue',
            active: false
          },
        ]
      },
      {
        name: 'Editorial',
        active: false
      },
      {
        name: 'Digital',
        active: false
      },
    ]
  },
  {
    name: 'Typefaces',
    active: false,
    show: true,
  },
  {
    name: 'Objects',
    active: false,
    show: true,
  },
  {
    name: 'Garmets',
    active: false,
    show: true,
  },
]
for (var i = 0; i < tags.length; i++) {
  const currentTag = tags[i]
  currentTag.isMainTag = true
  if ('subTags' in currentTag) {
    for (var o = 0; o < currentTag.subTags.length; o++) {
      const currentSubTag = currentTag.subTags[o]
      currentSubTag.isSubTag = true
      if ('subTags' in currentSubTag) {
        for (var u = 0; u < currentSubTag.subTags.length; u++) {
          currentSubTag.subTags[u].isSubTag = true
        }
      }
    }
  }
}

export default {
  data() {
    return {
      activeTags: [],
      tags
    }
  },
  methods: {
    handleTagClick(tag, i) {

      // if (tag.isSubTag && !tag.subTags) {
      //   tag.active = !tag.active
      //   return
      // }
      // console.log();
      let tagDom = document.querySelector(`.tag[data-index="${i}"]`)
      console.log(tagDom.style.width);
      let otherTagsDom = document.querySelectorAll(`.tag:not([data-index="${i}"])`)


      gsap.to(otherTagsDom, {
        width: "2.65em",
        color: 'transparent',
        onStart: () => {
          tag.active = !tag.active

        },
        x: function(index, target, targets) {
          let gridGap = 0.5 * 2;
          let a = gsap.utils.unitize(() => index * (-2.65 - gridGap), "em")
          console.log(a());
          return a()
        },
        stagger: 0.1,
        onComplete: () => {
          console.log("tag.active", tag.active);
          if (tag.active && tag.subTags) {
            // for (var i = 0; i < tag.subTags.length; i++) {
            //   tag.subTags[i].isSubTag = true
            // }

            // this.activeTags = [tag, ...tag.subTags]
            console.log("ACTIVE TAGS: ", this.tags.filter(el => el.active));
            this.activeTags = [...this.tags.filter(el => el.active), ...tag.subTags]
          } else if (!this.activeTags.some(el => el.active)) this.activeTags = this.tags

          this.$nextTick(() => {

            let otherTagsDom = document.querySelectorAll(`.tag:not([data-index="${i}"])`)
            console.log(tagDom, otherTagsDom);
            gsap.fromTo(otherTagsDom, {
              width: "2.65em",
              color: 'transparent',
            }, {
              width: 'auto',
              color: 'white',
              stagger: 0.05,
            })
          })
        }
      })
      // for (var i = 0; i < this.tags.length; i++) {
      //   this.tags[i].show = !this.tags[i].show
      // }
      // tag.show = true
    }
  },
  computed: {
    getTags() {

      return this.activeTags.length == 0 ? this.tags : this.activeTags
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.nav-wrapper {
    padding: 0.5rem 0.5rem 0.5rem 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
}
nav {
    padding-left: var(--kimera-side-padding);
    list-style: none;
    margin: 0;
    // padding: 0;
    display: flex;
    grid-gap: 0.5rem;
}
</style>
