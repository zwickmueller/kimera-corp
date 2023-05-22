export { default as ShopOverlayContent } from '../..\\shop\\components\\ShopOverlayContent.vue'
export { default as CustomText } from '../..\\components\\storyblok\\CustomText.vue'
export { default as CustomVideo } from '../..\\components\\storyblok\\CustomVideo.vue'
export { default as ImageContainer } from '../..\\components\\storyblok\\ImageContainer.vue'
export { default as KimeraButton } from '../..\\components\\storyblok\\KimeraButton.vue'
export { default as KimeraBuySection } from '../..\\components\\storyblok\\kimeraBuySection.vue'
export { default as KimeraDocumentation } from '../..\\components\\storyblok\\kimeraDocumentation.vue'
export { default as KimeraDocumentationElement } from '../..\\components\\storyblok\\kimeraDocumentationElement.vue'
export { default as KimeraFontFeature } from '../..\\components\\storyblok\\kimeraFontFeature.vue'
export { default as KimeraFontFeatureWrapper } from '../..\\components\\storyblok\\kimeraFontFeatureWrapper.vue'
export { default as KimeraGlyphSet } from '../..\\components\\storyblok\\KimeraGlyphSet.vue'
export { default as KimeraGlyphWrapper } from '../..\\components\\storyblok\\KimeraGlyphWrapper.vue'
export { default as KimeraGrid } from '../..\\components\\storyblok\\KimeraGrid.vue'
export { default as KimeraImage } from '../..\\components\\storyblok\\KimeraImage.vue'
export { default as KimeraIndex } from '../..\\components\\storyblok\\KimeraIndex.vue'
export { default as KimeraProduct } from '../..\\components\\storyblok\\kimeraProduct.vue'
export { default as KimeraProject } from '../..\\components\\storyblok\\KimeraProject.vue'
export { default as KimeraProjectPreview } from '../..\\components\\storyblok\\KimeraProjectPreview.vue'
export { default as KimeraSlideshow } from '../..\\components\\storyblok\\KimeraSlideshow.vue'
export { default as KimeraSpecimen } from '../..\\components\\storyblok\\KimeraSpecimen.vue'
export { default as KimeraTable } from '../..\\components\\storyblok\\kimeraTable.vue'
export { default as KimeraTableWrapper } from '../..\\components\\storyblok\\kimeraTableWrapper.vue'
export { default as KimeraText } from '../..\\components\\storyblok\\KimeraText.vue'
export { default as KimeraTypeInUse } from '../..\\components\\storyblok\\KimeraTypeInUse.vue'
export { default as Page } from '../..\\components\\storyblok\\Page.vue'
export { default as UniversalContainer } from '../..\\components\\storyblok\\UniversalContainer.vue'
export { default as KimeraFooter } from '../..\\components\\layout\\KimeraFooter.vue'
export { default as KimeraNavigation } from '../..\\components\\layout\\KimeraNavigation.vue'
export { default as KimeraOutline } from '../..\\components\\layout\\KimeraOutline.vue'
export { default as LandingPageGallery } from '../..\\components\\layout\\landingPageGallery.vue'
export { default as ProjectGrid } from '../..\\components\\layout\\projectGrid.vue'
export { default as CloseButton } from '../..\\components\\generic\\closeButton.vue'
export { default as CloseIcon } from '../..\\components\\generic\\closeIcon.vue'
export { default as DarkModeToggle } from '../..\\components\\generic\\darkModeToggle.vue'
export { default as KimeraLogo } from '../..\\components\\generic\\kimeraLogo.vue'
export { default as KimeraSlider } from '../..\\components\\generic\\kimeraSlider.vue'
export { default as SingleGlyph } from '../..\\components\\generic\\singleGlyph.vue'
export { default as SingleGrid } from '../..\\components\\generic\\singleGrid.vue'
export { default as SingleGridItem } from '../..\\components\\generic\\singleGridItem.vue'
export { default as TagButton } from '../..\\components\\generic\\tagButton.vue'
export { default as KimeraCustomTypetests } from '../..\\components\\typetester\\KimeraCustomTypetests.vue'
export { default as KimeraTypetester } from '../..\\components\\typetester\\KimeraTypetester.vue'
export { default as KimeraTypetesterPreview } from '../..\\components\\typetester\\KimeraTypetesterPreview.vue'
export { default as KimeraTypetesterPreviewWrapper } from '../..\\components\\typetester\\KimeraTypetesterPreviewWrapper.vue'
export { default as KimeraTypetesterSliders } from '../..\\components\\typetester\\KimeraTypetesterSliders.vue'
export { default as KimeraVariableTypetester } from '../..\\components\\typetester\\KimeraVariableTypetester.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
