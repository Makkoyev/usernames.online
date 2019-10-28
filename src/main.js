import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll);
Vue.use(require('vue-moment'));
require('./assets/css/styles.css');
require('./assets/css/layout.css');
require('./plugins/initializeFirebase');

Vue.config.productionTip = false

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

auth.onAuthStateChanged(function(user) {
  if (user) {
    const data = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        displayName: user.displayName,
        metadata: user.metadata
    };
    console.log("You are logged in", user.providerData[0]);
    store.commit('setUser', data);
    store.commit('setStatus', 'success');
    store.commit('setError', null);
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  } else {
    console.log("You are not logged in");
    store.commit('setUser', null);
    store.commit('setStatus', 'Not Logged');
    if(location.href.includes('chat') || location.href.includes('profile') || location.href.includes('add-username') || location.href.includes('add-post')){
      location.href = '/';
    } else {
      new Vue({
        router,
        store,
        render: h => h(App),
      }).$mount('#app')
    }
  }
});
