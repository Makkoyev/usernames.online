const mutations = {
  setUser (state, payload) {
    state.data = payload
  },
  setUserDB (state, payload) {
    state.dataDB = payload
  },
  setAuthenticated (state, payload) {
    state.isAuth = payload
  }
}

export default mutations
