<template>
  <div>
    <input v-model="emailAddress" type="email">
    <input v-model="password" type="password">
    <input type="button" value="Login" @click="signInWithEmail">
    <input type="button" value="LogOut" @click="signOutWithEmail">
  </div>
</template>

<script>
export default {
  data () {
    return {
      emailAddress: '',
      password: ''
    }
  },
  methods: {
    signOutWithEmail () {
      this.$store.dispatch('user/signOutWithEmail')
    },
    signInWithEmail () {
      const user = {
        email: this.emailAddress,
        password: this.password
      }
      this.$store.dispatch('user/signInWithEmail', user)
    }
  }
}
</script>
