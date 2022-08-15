<template>
<!-- <div  class="project-preview"> -->

<!-- <nuxt-link :to="'/' + blok.project.full_slug" v-editable="blok" class="grid-item project-preview" @click.native="wasClicked = true" :class="[wasClicked ? 'clicked' : '', `project-width-${width}`]" :data-original-width="`project-width-${width}`"
  data-new-width="null"> -->
<nuxt-link :to="'/' + blok.project.full_slug" ref="link" v-editable="blok" class="grid-item project-preview" @click.native="handleClick" :data-original-width="`project-width-${width}`" data-new-width="null">
  <!-- <nuxt-link :to="'/' + blok.project.full_slug" v-editable="blok" class="grid-item project-preview" :style="`flex-basis: calc(100%/8*${width} - 8px);width: 100%`" @click.native="wasClicked = true" :class="wasClicked ? 'clicked' : ''"> -->
  <!-- <nuxt-link :to="'/' + blok.project.full_slug" v-editable="blok" class="grid-item project-preview" :style="` width: calc(100%/8*${width} - 8px)`" @click.native="wasClicked = true" :class="wasClicked ? 'clicked' : ''"> -->
  <!-- <nuxt-link :to="'/' + blok.project.full_slug" v-editable="blok" class="grid-item project-preview" :style="`grid-column: span ${width}`" @click.native="wasClicked = true" :class="wasClicked ? 'clicked' : ''"> -->
  <div class="grid-item-tags kimera-text-filter-tags">
    <span v-if="project" v-for="(tag, index) in tags">{{tag}}{{index < project.tags.length -1 ? ', ': ''}} </span>
    <span v-else> ~</span>
  </div>
  <div class="grid-item-inner center-all relative kimera-text-kacheln" :class="checkProjectType" :title="project ? project.name : '~storyblok bug, changes are visible after save~'" :target-height="checkTargetHeight">
    <!-- project.name -->
    <div class="grid-item-overlay overlay-foreground h-w-100p fixed-reset absolute "></div>
    <kimera-image :blok="blok"></kimera-image>
    <div class="grid-item-overlay overlay-background h-w-100p fixed-reset absolute "> </div>
  </div>
</nuxt-link>

<!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      wasClicked: false
    }
  },
  props: {
    blok: {
      type: Object,
      required: true
    },
  },
  methods: {
    handleClick() {
      this.$refs.link.$el.classList.add("clicked")
    },
    stringExists(arr, val) {
      const result = arr.findIndex(item => val.toUpperCase() === item.toUpperCase());
      if (result !== -1) {
        return true;
      }
      return false;
    }
  },
  destroyed() {
    this.wasClicked = false
  },
  computed: {
    project() {
      return this.blok.project.content
    },
    width() {
      return this.blok.width
    },
    tags() {
      return this.project && this.project.tags ? this.project.tags : ['~']
    },
    checkTargetHeight() {
      if (!this.project) return ''
      if (!this.project.body) return ''
      const body = this.project.body[0]
      if (body.component == "image-container" && body.height) return body.height
      else return '100vh'
    },
    checkProjectType() {
      if (this.tags[0] == '~') return ''
      if (this.stringExists(this.project.tags, 'services')) return 'services'
      if (this.stringExists(this.project.tags, 'typefaces')) return 'typefaces'
      if (this.stringExists(this.project.tags, 'products')) return 'products'
      return ''
    }
  },
  mounted() {
    this.$refs.link.$el.classList.add(this.$refs.link.$el.dataset.originalWidth)
    // console.log(this.project);
  }
}
</script>

<style lang="scss" >
.project {
    .kimera-grid {
        grid-row-gap: 8px;
    }
    .grid-item-tags {
        display: none;
    }
}
.grid-item-inner.is-transitioning {
    // z-index: 10;
    // position: fixed;
    // height: 80vh !important;
    // width: 100vw;
    // top: 0;
    // left: 0;

}
.grid-item {
    min-height: 30em;
    height: 33vh;
    position: relative;
    .kimera-image {
        z-index: 1;
    }
}
.grid-item-tags {
    padding: 2px 0;
}
.grid-item-overlay.overlay-background {
    z-index: 0;
    background: transparent;
}
.grid-item-overlay.overlay-foreground {
    mix-blend-mode: lighten;
    z-index: 2;
    background: transparent;
}

.grid-item-overlay {
    transition: background 0.35s cubic-bezier(0.055, 0.315, 0.355, 1.020);
    border-radius: var(--kimera-border-radius);
    overflow: hidden;

}
.grid-item-inner {
    overflow: hidden;
    border-radius: var(--kimera-border-radius);
    background: var(--kimera-white);
    height: 100%;
    &:not(.is-transitioning):before {
        content: attr(title);
        // width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute;
        z-index: 3;
        display: flex;
        align-items: center;
        transform: translateX(-100%);
        transition: transform 0.37s cubic-bezier(0.000, 1.650, 0.475, 1.005);
    }
    &:not(.is-transitioning):hover {
        &:before {
            transform: translateX(0%);
        }
        .grid-item-overlay {
            background: #c4c4c4;

        }
        .grid-item-overlay.overlay-background {

            background: #f7f7f7;

        }

        .grid-item-overlay {}
        .kimera-image img {
            filter: grayscale(100%) contrast(0.6) brightness(1.4);
            mix-blend-mode: multiply;
            opacity: 0.2;
            // filter: grayscale(100%) contrast(0.6) brightness(1.6);
            // mix-blend-mode: multiply;
            // opacity: 0.4;
        }
    }
    &:not(.is-transitioning):hover {
        .grid-item-overlay.overlay-background {
            background: #fff;
        }
    }
    .kimera-image img {
        border-radius: var(--kimera-border-radius);
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.055, 0.315, 0.355, 1.020);
        z-index: 1;
        opacity: 1;
    }
    picture {
        height: 100%;
        width: 100%;
    }
    &.products {

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            padding: 4em;
        }
    }

    &.services img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    &.typefaces img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        padding: 6em;
    }
}
</style>
