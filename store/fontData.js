import Vue from "vue";
// import Waldenburg from '../scripts/fontData/waldenburg.js'
// import Melange from '../scripts/fontData/melange.js'
import FontData from "../assets/data/fontData.json";

export const state = () => ({
  // fontData: [Waldenburg, Melange],
  fontData: FontData,
  // fontData: [],
  // test: {}
});

export const getters = {
  getFontData(state) {
    return state.fontData;
  },
  getFontDataByName: (state) => (name) => {
    return state.fontData.find(
      (el) => el.name.toLowerCase() == name.toLowerCase()
    );
  },
  getFontWeightAsReadable: (state) => (style) => {
    // console.log(style);
    const { fontWeight, fontStretch, fontStyle, fontFamily } = style;
    const fontData = getters.getFontDataByName(state)(fontFamily);
    if (!fontData) {
      console.error("No Font Data Found: ", fontFamily, fontWeight);
      return;
    }
    const family = fontData.fontFamilies.find(
      (el) =>
        el.weight == fontWeight &&
        el.fontStyle == fontStyle &&
        el.fontStretch == fontStretch
    );
    if (!family) {
      console.error(
        "No Font Properties Found: ",
        fontFamily,
        fontWeight,
        fontStretch,
        fontStyle,
        fontFamily
      );
      return;
    }
    return family.weightReadable;
  },
};

export const mutations = {
  initiateFontData(state, fontData) {
    state.fontData = fontData;
  },
};
