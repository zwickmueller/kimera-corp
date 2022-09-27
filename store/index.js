// import VuexPersistence from 'vuex-persist'

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })
//
// export const plugins = [vuexLocal.plugin]

export const state = () => ({
  isPageTransitioning: false
})

export const getters = {
  getIsPageTransitioning(state) {
    return state.isPageTransitioning
  }
}

export const mutations = {
  setIsPageTransitioning(state, bool) {
    state.isPageTransitioning = bool
  }
}