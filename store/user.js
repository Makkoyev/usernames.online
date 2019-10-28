import { db, auth } from '@/plugins/initializeFirebase'
import User from '@/plugins/Classes/userDataClass'

const store = () => ({
  state: {
    userOptions: {
      user: null,
      status: null,
      error: null
    }
  },
  mutations: {
    setUser (state, payload) {
      state.userOptions.user = payload
    },
    removeUser (state) {
      state.userOptions.user = null
    },
    setStatus (state, payload) {
      state.userOptions.status = payload
    },
    setError (state, payload) {
      state.userOptions.error = payload
    }
  },
  actions: {
    signUpAction ({ commit }, payload) {
      commit('setStatus', 'loading')
      auth
        .createUserWithEmailAndPassword(
          payload.email,
          payload.password
        ).then((response) => {
          const ru = response.user
          const userData = new User(ru.uid, ru.displayName, ru.email, ru.emailVerified, ru.phoneNumber, ru.photoURL, ru.metadata)
          // CREATE PROFILE ON SERVER
          db.collection('users').doc(ru.uid).set({
            uid: ru.uid,
            email: ru.email
          })
          auth.currentUser.sendEmailVerification()
          commit('setUser', userData)
          commit('setStatus', 'success')
          commit('setError', null)
        })
        .catch(function (error) {
          commit('setError', error.message)
          commit('setStatus', 'failure')
        })
    },
    signInAction ({ commit }, payload) {
      auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          const ru = response.user
          const userData = new User(ru.uid, ru.displayName, ru.email, ru.emailVerified, ru.phoneNumber, ru.photoURL, ru.metadata)
          commit('setUser', userData)
          commit('setStatus', 'success')
          commit('setError', null)
        })
        .catch(function (error) {
          commit('setError', error.message)
          commit('setStatus', 'failure')
        })
    }
  }
})

export default store
