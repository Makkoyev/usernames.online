import firebase from 'firebase'
const consola = require('consola')

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    consola.success('You are logged in!', user)
  } else {
    consola.error('You are not logged in!')
  }
})
