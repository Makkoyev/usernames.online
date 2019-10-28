import Vue from 'vue'
import Vuex from 'vuex'
import {db} from './main'
import {auth} from './main'
import User from './plugins/userDataClass'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userOptions: {
      user: null,
      status: null,
      error: null,
      fUser: null
    }
  },
  mutations: {
    setUser(state, payload) {
      state.userOptions.user = payload
    },
    removeUser(state) {
      state.userOptions.user = null
    },
    setStatus(state, payload) {
      state.userOptions.status = payload
    },
    setError(state, payload) {
      state.userOptions.error = payload
    },
    firebaseUser(state, payload) {
      state.userOptions.fUser = payload
    }
  },
  actions: {
    /////// SIGN UP
    signUpAction({ commit }, payload) {
      commit('setStatus', 'loading')
      auth
        .createUserWithEmailAndPassword(
          payload.email,
          payload.password
        ).then((response) => {
          const ru = response.user;
          const userData = new User(ru.uid,ru.displayName, ru.email, ru.emailVerified, ru.phoneNumber, ru.photoURL, ru.metadata);
          // CREATE PROFILE ON SERVER
          db.collection("users").doc(ru.uid).set({
            uid: ru.uid,
            email: ru.email
          });
          // END PROFILE ON SERVER
          auth.currentUser.sendEmailVerification();
          commit('setUser', userData)
          commit('setStatus', 'success')
          commit('setError', null)
        })
        .catch(function (error) {
          commit('setError', error.message)
          commit('setStatus', 'failure')
        });
    },
    /////// SIGN IN
    signInAction({ commit }, payload) {
      auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          const ru = response.user;
          const userData = new User(ru.uid,ru.displayName, ru.email, ru.emailVerified, ru.phoneNumber, ru.photoURL, ru.metadata);
          commit('setUser', userData)
          commit('setStatus', 'success')
          commit('setError', null)
        })
        .catch(function (error) {
          commit('setError', error.message)
          commit('setStatus', 'failure')
        });
    },
    /// FETCH LIKED POSTS
    fetchFUser({ commit }, payload) {
      db.collection("users")
      .doc(payload)
      .get()
      .then(doc => {
        if (doc.exists) {
          commit('firebaseUser', doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
    }
  }
})

export default store;