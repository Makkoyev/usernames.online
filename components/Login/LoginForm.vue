<template>
  <div>
    <input v-model="emailAddress" type="email">
    <input v-model="password" type="password">
    <input type="button" value="Login" @click="loginMethod">
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
    loginMethod () {
      const user = {
        email: this.emailAddress,
        password: this.password
      }
      this.$store.dispatch('signInAction', user)
    }
  }
}
</script>
