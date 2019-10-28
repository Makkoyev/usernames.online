const mutations = {
  setUser (state, payload) {
    state.data = payload
  },
  setUserDB (state, payload) {
    state.dataDB = payload
  }
}

export default mutations
