import Vue from "vue";

export const state = () => ({
  isTypetesterOpen: false,
  currentTypetesterOptions: {},
  customTypetests: {},
});

export const getters = {
  getIsTypetesterOpen(state) {
    return state.isTypetesterOpen;
  },
  getCurrentTypetesterOptions(state) {
    return state.currentTypetesterOptions;
  },
  getCustomTypetests(state) {
    return state.customTypetests;
  },
  getCustomTypetestsByPath: (state) => (path) => {
    return path in state.customTypetests ? state.customTypetests[path] : [];
  },
  getCustomTypetestByTimestamp: (state) => (path, timestamp) => {
    return path in state.customTypetests
      ? state.customTypetests[path].find((el) => {
          console.log(el, el.timestamp, timestamp);
          return String(el.timestamp) == String(timestamp);
        })
      : [];
  },
};

export const mutations = {
  setIsTypetesterOpen(state, bool) {
    state.isTypetesterOpen = bool;
  },
  setCurrentTypetesterOptions(state, optionsObject) {
    state.currentTypetesterOptions = optionsObject;
  },
  updateCustomTypetestValue(state, payload) {
    const { path, timestamp, key, value } = payload;
    const typetester = getters.getCustomTypetestByTimestamp(state)(
      path,
      timestamp
    );
    if (typetester) typetester[key] = value;
  },
  updateCustomTypetest(state, newTypetester) {
    const { path, timestamp } = newTypetester;
    const typetester = getters.getCustomTypetestByTimestamp(state)(
      path,
      timestamp
    );
    if (typetester) {
      Object.assign(typetester, newTypetester);
      typetester.timestamp = String(new Date());
    } else {
      console.error("typetest not found: ", newTypetester);
    }
  },
  addCustomTypetest(state, { options }) {
    if (!(options.path in state.customTypetests)) {
      Vue.set(state.customTypetests, options.path, []);
    }
    state.customTypetests[options.path].push(options);
    // if (!(font in state.customTypetests) && (state.customTypetests[font] = [])) {
    //   state.customTypetests[font].push(options)
    // }
  },
  removeCustomTypetest(state, typetester) {
    // console.log(customTypetests, typetester);
    // const customTypetest = customTypetests.find(
    //   (el) => el.timestamp == typetester.timestamp
    // );
    const { path, timestamp } = typetester;
    const customTypetests = state.customTypetests[path];
    const customTypetest = getters.getCustomTypetestByTimestamp(state)(
      path,
      timestamp
    );
    console.log(customTypetest, customTypetests);
    if (customTypetest) {
      customTypetests.splice(customTypetests.indexOf(customTypetest), 1);
    } else {
      console.error("typetest not found: ", customTypetest);
    }
  },
};
