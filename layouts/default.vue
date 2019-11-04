<template>
  <div>
    <div v-if="isLoaded">
      <Navigation />
      <div class="container">
        <nuxt />
      </div>
      <Footer />
    </div>
    <div v-else>{{ isLoaded }}</div>
  </div>
</template>

<script>
import { auth } from '@/plugins/initializeFirebase'
import User from '@/plugins/Classes/userDataClass'
import Navigation from '~/components/layout/Navigation.vue'
import Footer from '~/components/layout/Footer.vue'

export default {
  components: {
    Navigation,
    Footer
  },
  data () {
    return {
      isLoaded: false
    }
  },
  methods: {
    isReady (boolean) {
      this.isLoaded = boolean
    }
  },
  mounted () { // NEST LOGIC BASED ON PAGE WITH location.href.includes('PAGE NAME')
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('user/setUserAction', new User(user.uid, user.displayName, user.email, user.emailVerified, user.phoneNumber, user.photoURL, user.metadata))
          .then(() => {
            this.$store.dispatch('user/setUserDBAction', this.$store.state.user.data.uid)
            this.$store.dispatch('options/setAuthenticatedAction', true)
            this.isReady(true)
          })
      } else {
        this.$store.dispatch('user/setUserAction', null)
          .then(() => {
            this.$store.commit('user/setUserDB', null)
            this.$store.dispatch('options/setAuthenticatedAction', false)
            this.isReady(true)
          })
      }
    })
  }
}
</script>
