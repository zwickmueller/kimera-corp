<template >
<div class="nav-wrapper fixed fixed-reset">
  <nav>
    <!-- <tag-button>Services</tag-button>
    <tag-button>Typefaces</tag-button>
    <tag-button>Objects</tag-button>
    <tag-button>Garmets</tag-button> -->
    <!-- <transition-group name="list-complete" tag="nav" mode="in-out"> -->
    <tag-button v-for="(tag,i) in tags" :key="tag.name" v-show="tag.show" @click.native="handleTagClick(tag, i)" class="tag" :data-index="i" :class="!tag.isMainTag && !tag.active ? 'subtag' : ''"
      :style="`order: ${tag.active && tag.subTags ? 0 : i}`">
      {{tag.name}}{{tag.active ? ' x' : ''}}
    </tag-button>
  </nav>
  <!-- </transition-group> -->

</div>
</template>

<script>
import {
  gsap
} from "gsap";

// circle button width = height = 2.65em

const tags = [{
    name: 'Services',
    isMainTag: true,
    subTags: ['Branding', 'Editorial', 'Digital'],
    show: true,
  },
  {
    name: 'Typefaces',
    isMainTag: true,
    subTags: ['Sans-serif', 'Serif', 'Monospace'],
    show: true,
  },
  {
    name: 'Objects',
    isMainTag: true,

    show: true,
  },
  {
    name: 'Garmets',
    isMainTag: true,
    show: true,
  },

  ///SUB TAGS
  {
    name: 'Branding',
    subTags: ['asd', 'qwe', 'ert'],
  },
  {
    name: 'asd',
  },
  {
    name: 'qwe',
  },
  {
    name: 'ert',
  },
  {
    name: 'Book',
  },
  {
    name: 'Magazine',
  },
  {
    name: 'Catalogue',
  },
  {
    name: 'Sans-serif',
  },
  {
    name: 'Serif',
  },
  {
    name: 'Monospace',
  },
  {
    name: 'Editorial',
    subTags: ['Book', 'Magazine', 'Catalogue'],
  },
  {
    name: 'Digital',
  },
]

for (var i = 0; i < tags.length; i++) {
  tags[i].active = false
  if (!tags[i].show) tags[i].show = false
}
tags.sort((a, b) => Number('subTags' in b) - Number('subTags' in a));
// console.log(trueFirst);
//  1. Was passiert wenn "Objects" zuerst angeklickt wird? (animation / links & rechts)
//  2. Was passiert wenn "Services > Branding (0 subtags) > Editorial (3 Subtags)" angeklickt wird?
//  3. Services hat kleinteilige (2 Ebenen) filter (Editorial, 3 subTags), typography/garmets vermutlich nur eine Ebene.
//    > Einheitliche Tiefe entscheiden!
//
//

export default {
  data() {
    return {
      activeTags: [],
      subTags: [],
      tags,
    }
  },
  methods: {
    handleTagClick(tag, i) {
      tag.active = !tag.active
      const lastAddedTag = this.activeTagsComputed[this.activeTagsComputed.length - 1]
      // console.log(lastAddedTag.name);
      const allMainTags = this.tags.filter(el => el.isMainTag)
      if (tag.isMainTag) {
        for (var i = 0; i < allMainTags.length; i++) {
          if (tag.name != allMainTags[i].name) {
            allMainTags[i].show = false
            allMainTags[i].active = false
          }
        }

      }
      if (tag.isMainTag && !tag.active) {
        for (var u = 0; u < allMainTags.length; u++) {
          allMainTags[u].show = true
          allMainTags[u].active = false

        }
      }
      // tag.show = true

      // this.subTags = []
      // console.log("tag.name ", tag.name);
      // const activeSubTags = this.subTags
      if (tag.subTags) {

        const test = this.tags.filter(tag => !tag.isMainTag && tag.active && !tag.subTags)
        if (test) test.map(tag => {
          tag.show = false
          tag.active = false
        })
        for (var i = 0; i < this.tags.length; i++) {
          const _tag = this.tags[i]
          let _subTag
          const subTag = tag.subTags.find(el => {
            let check = el === _tag.name
            _subTag = check ? _tag : false
            return check ? _tag : false
          })
          // console.log(_tag.name, subTag);
          if (!_tag.active && !_tag.isMainTag) _tag.show = false
          if (_subTag) _subTag.show = tag.active
          if (_subTag && !tag.active) _subTag.active = false
        }
        // console.log(lastAddedTag);
        if (lastAddedTag && lastAddedTag.subTags) {
          for (var i = 0; i < lastAddedTag.subTags.length; i++) {
            let subTag = this.tags.find(el => el.name == lastAddedTag.subTags[i])
            subTag.show = true
          }

        }
        // for (var i = 0; i < tag.subTags.length; i++) {
        //   const subTag = this.tags.find(el => el.name == tag.subTags[i])
        //   if (subTag) subTag.show = tag.active
        //   if (!tag.active) subTag.active = false
        // }

        // const otherSubTags = this.tags.filter(el => !el.isMainTag && el.name != tag.name)
        // for (var o = 0; o < otherSubTags.length; o++) {
        //   otherSubTags[o].active = false
        //   otherSubTags[o].show = false
        // }


        // this.subTags = activeSubTags

        let lastActiveTagWithSubTags = [...this.activeTagsComputed].reverse().find(el => el.subTags)
        if (lastActiveTagWithSubTags && !tag.active) {
          // console.log("lastActiveTagWithSubTags ", lastActiveTagWithSubTags, [...this.activeTagsComputed].reverse());
          for (var i = 0; i < lastActiveTagWithSubTags.subTags.length; i++) {
            let subTag = this.tags.find(el => el.name == lastActiveTagWithSubTags.subTags[i])
            if (subTag) {
              subTag.active = false
              subTag.show = true
            }
          }
        }
      }


      // else if (this.activeTagsComputed) {
      //   const lastAddedTag = this.activeTagsComputed[this.activeTagsComputed.length - 1]
      //   console.log("lastAddedTag ", lastAddedTag);
      //   if (lastAddedTag && lastAddedTag.subTags) {
      //     for (var i = 0; i < lastAddedTag.subTags.length; i++) {
      //       const b = this.tags.find(el => el.name == lastAddedTag.subTags[i])
      //       if (b) {
      //         b.show = true
      //         // activeSubTags.push(b)
      //       } else {
      //         b.show = false
      //       }
      //     }
      //     // this.subTags = activeSubTags
      //   }
      //
      // } else {
      //   console.log("ELLSEEEE");
      // }
    },
  },
  computed: {
    activeTagsComputed() {
      return this.tags.filter(tag => tag.active)
    },
    subTagsComputed() {
      return this.subTags.filter(tag => !tag.active)
    },
    getTags() {
      return this.activeTagsComputed.length == 0 ? this.tags.filter(tag => tag.isMainTag) : [...this.activeTagsComputed, ...this.subTagsComputed]
    }
  },
  mounted() {}

}
</script>

<style lang="scss" scoped>
// .tag {
//     transition: all 1s;
//
// }
// /* .list-complete-leave-active below version 2.1.8 */
// .list-complete-enter,
// .list-complete-leave-to {
//     // width: 0;
//     opacity: 0;
//     // transform: translateY(30px);
// }
// .list-complete-leave-active {
//     position: absolute;
// }
// .flip-list-move {
//     transition: all 1s;
// }
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
