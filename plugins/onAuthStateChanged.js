import firebase from 'firebase'
const consola = require('consola')

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    consola.success('You are logged in!')
  } else {
    consola.info('You are not logged in!')
  }
})
