<template>
  <div>
    <div v-if="!loading">
      <Navigation :isAuth='isAuth' />
      <div class="container">
        <nuxt />
      </div>
      <Footer />
    </div>
    <div v-else>LOADING</div>
  </div>
</template>

<script>
import consola from 'consola'
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
        consola.success('You are logged in!', user)
        this.$store.dispatch('user/setUserAction', new User(u.uid, u.displayName, u.email, u.emailVerified, u.phoneNumber, u.photoURL, u.metadata))
        if (this.$store.state.user.data) {
          this.loading = false
          this.isAuth = true
        }
      } else {
        consola.error('You are not logged in!', null)
        this.loading = false
        this.isAuth = false
      }
    })
  }
}
</script>
