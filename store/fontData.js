import Vue from "vue";
import Waldenburg from '../scripts/fontData/waldenburg.js'
import Melange from '../scripts/fontData/melange.js'

export const state = () => ({
  fontData: [Waldenburg, Melange]
})

export const getters = {
  getFontData(state) {
    return state.fontData
  },
  getFontDataByName: (state) => (name) => {
    // console.log("asdafadasd", name, state);
    return state.fontData.find(el => el.name.toLowerCase() == name.toLowerCase())
  },
  getFontWeightAsReadable: (state) => (name, weight) => {
    const fontData = getters.getFontDataByName(state)(name)
    if (!fontData) {
      console.error("No Font Data Found: ", name, weight);
      return
    }
    const family = fontData.fontFamilies.find(el => el.weight == weight)
    // console.log("FROM FONTDATA ", family, weight, fontData);
    return family.weightReadable
  }
}

export const mutations = {
  // setIsTypetesterOpen(state, bool) {
  //   state.isTypetesterOpen = bool
  // },

}