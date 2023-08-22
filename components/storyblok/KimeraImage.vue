<template>
  <nuxt-picture
    v-editable="blok"
    :src="blok.src.filename"
    legacyFormat="jpg"
    class="image kimera-image"
    :loading="shouldPreload ? null : 'lazy'"
    quality="80"
    :style="backgroundStyles"
    :class="blok.hideOnMobile ? 'hide-on-mobile' : ''"
    :imgAttrs="{ style: overrideStyles, alt: blok.src.alt }"
    @load="imageLoaded"
  />
</template>

<script>
export default {
  data() {
    return {
      shouldPreload: true,
    };
  },
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  methods: {
    transformImage(image, option) {
      return this.$helpers.transformImage(image, option);
    },
    imageLoaded() {
      this.$el.classList.add("image-loaded");
      setTimeout(() => {
        this.$el.classList.add("disable-background");
      }, 500);
    },
    hasParentWithClass(element, className) {
      let parent = element.parentElement;

      while (parent) {
        if (parent.classList.contains(className)) {
          return true;
        }
        parent = parent.parentElement;
      }

      return false;
    },
  },
  computed: {
    overrideStyles() {
      return {
        aspectRatio: this.extractImageData.aspectRatio,

        objectFit:
          this.blok.overrideObjectfit == "none"
            ? ""
            : this.blok.overrideObjectfit,
        padding:
          this.blok.overridePadding == "0em" ? "" : this.blok.overridePadding,
        background: this.blok.overrideBackground
          ? this.blok.overrideBackground
          : "",
      };
    },
    backgroundStyles() {
      const filename = this.blok.src.filename;
      const imgUrl = this.$img(filename, {
        width: ~~(this.extractImageData.width / 100),
        height: ~~(this.extractImageData.height / 100),
        format: "webp",
        filters: { blur: "10" },
      });
      return {
        backgroundImage: filename.includes(".jpg") ? `url('${imgUrl}')` : "",
      };
    },
    extractImageData() {
      const imageUrl = this.blok.src.filename;
      // Get the part of the URL containing the dimensions
      const dimensionString = imageUrl.match(/\/\d+x\d+\//)[0];
      // Remove the slashes from the dimensions
      const dimensions = dimensionString.slice(1, -1);
      // Split the dimensions by 'x'
      const [width, height] = dimensions.split("x").map(Number);
      // Calculate the aspect ratio
      const aspectRatio = width / height;
      return {
        aspectRatio: aspectRatio,
        width: width,
        height: height,
      };
    },
  },
  mounted() {
    this.shouldPreload = this.hasParentWithClass(this.$el, "preload-helper");
  },
};
</script>
<style lang="scss">
picture {
  background-size: cover;
  img {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
}
picture.disable-background {
  background-image: none !important;
}
picture.image-loaded {
  img {
    opacity: 1;
  }
}
img.image {
  width: 100%;
  // height: auto;
}
main .project .image-container:first-child {
  img {
    transition: none;
  }
}
</style>
