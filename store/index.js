// import VuexPersistence from 'vuex-persist'

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })
//
// export const plugins = [vuexLocal.plugin]

export const state = () => ({
  isPageTransitioning: false,
  windowWidth: 1024,
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
};

export const mutations = {
  setIsPageTransitioning(state, bool) {
    state.isPageTransitioning = bool;
  },
  setWindowWidth(state, windowWidth) {
    state.windowWidth = windowWidth;
  },
};
