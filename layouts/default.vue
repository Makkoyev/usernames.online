<template>
  <div>
    <div v-if="!loading">
      <Navigation :isAuth="isAuth" />
      <div class="container">
        <nuxt />
      </div>
      <Footer />
    </div>
    <div v-else>LOADING</div>
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
      loading: true,
      isAuth: false
    }
  },
  mounted () {
    auth.onAuthStateChanged((user) => {
      this.loading = true
      if (user) {
        const u = user
        this.$store.dispatch('user/setUserAction', new User(u.uid, u.displayName, u.email, u.emailVerified, u.phoneNumber, u.photoURL, u.metadata))
        if (this.$store.state.user.data) {
          this.$store.dispatch('user/setUserDBAction', this.$store.state.user.data.uid)
        }
        this.loading = false
        this.isAuth = true
      } else {
        this.$store.dispatch('user/setUserAction', null)
        this.$store.commit('user/setUserDB', null)
        this.loading = false
        this.isAuth = false
      }
    })
  }
}
</script>
