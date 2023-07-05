// import VuexPersistence from 'vuex-persist'

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })
//
// export const plugins = [vuexLocal.plugin]
import Tags from "../assets/data/tags.json";

// const showedDisclaimer = false;

export const state = () => ({
  isPageTransitioning: false,
  windowWidth: 1024,
  tags: Tags,
  infoContent: null,
  infoContentMobileState: "info",
  showShopDisclaimer: false,
  showedDisclaimer: false,
});

export const getters = {
  getIsPageTransitioning(state) {
    return state.isPageTransitioning;
  },
  getWindowWidth(state) {
    return state.windowWidth;
  },
  isMobile(state) {
    return state.windowWidth < 769;
  },
  getTags(state) {
    return state.tags;
  },
  getInfoContent(state) {
    return state.infoContent;
  },
  getInfoMobileState(state) {
    return state.infoContentMobileState;
  },
  getShowShopDisclaimer(state) {
    return state.showShopDisclaimer;
  },
};

export const mutations = {
  setIsPageTransitioning(state, bool) {
    state.isPageTransitioning = bool;
  },
  setWindowWidth(state, windowWidth) {
    state.windowWidth = windowWidth;
  },
  setTags(state, tags) {
    state.tags = tags;
  },
  setInfoContent(state, story) {
    state.infoContent = story;
  },
  setInfoMobileState(state, stateName) {
    state.infoContentMobileState = stateName;
  },
  setShowShopDisclaimer(state, bool) {
    if (state.showedDisclaimer) return;
    state.showShopDisclaimer = bool;
    if (!bool) state.showedDisclaimer = true;
  },
};

export const actions = {
  async nuxtServerInit({ commit }) {
    // console.log("nuxtServerInit");
    // let fontData = await this.$axios.$get("/api/fontData.json");
    // let tags = await this.$axios.$get("/api/tags.json");
    // // let fontData = await this.$axios.$get(
    // //   "https://zwickmueller.github.io/kimera-corp-json-store/fontData.json"
    // // );
    // // let tags = await this.$axios.$get(
    // //   "https://zwickmueller.github.io/kimera-corp-json-store/tags.json"
    // // );
    // commit("setTags", tags);
    // commit("fontData/initiateFontData", fontData);
  },
};
