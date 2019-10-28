import consola from 'consola'
import { auth, db } from '@/plugins/initializeFirebase'
import User from '@/plugins/Classes/userDataClass'

const actions = {
  signUpWithEmail ({ commit }, payload) {
    auth
      .createUserWithEmailAndPassword(
        payload.email,
        payload.password
      ).then((response) => {
        const ru = response.user
        const userData = new User(ru.uid, ru.displayName, ru.email, ru.emailVerified, ru.phoneNumber, ru.photoURL, ru.metadata)
        db.collection('users').doc(ru.uid).set({
          uid: ru.uid,
          email: ru.email
        })
        auth.currentUser.sendEmailVerification()
        commit('setUser', userData)
      })
      .catch(function (error) {
        consola.error(error.message)
      })
  },
  signInWithEmail ({ commit }, payload) {
    auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        const ru = response.user
        const userData = new User(ru.uid, ru.displayName, ru.email, ru.emailVerified, ru.phoneNumber, ru.photoURL, ru.metadata)
        commit('setUser', userData)
      })
      .catch(function (error) {
        consola.error(error.message)
      })
  },
  signOutWithEmail ({ commit }) {
    auth.signOut().then(() => {
      consola.success('Logged out from Usernames.Online')
      commit('setUser', null)
    }).catch((error) => {
      consola.error(error.message)
    })
  },
  setUserAction ({ commit }, payload) {
    commit('setUser', payload)
  },
  setUserDBAction ({ commit }, payload) {
    consola.success(payload)
    db.collection('users').doc(payload)
      .get()
      .then((doc) => {
        if (doc.exists) {
          commit('setUserDB', doc.data())
        } else {
          consola.error(`There is no document: ${doc.data()}`)
        }
      })
      .catch((error) => {
        consola.error('Error getting document:', error)
      })
  }
}

export default actions
