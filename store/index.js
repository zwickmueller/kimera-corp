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