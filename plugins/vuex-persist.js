import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    /* your options */
    key: 'Kimera',
    modules: ['typetester', 'fontData']
    // modules: ['typetester', 'fontData']
  }).plugin(store);
}