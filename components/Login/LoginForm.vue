<template>
  <div>
    <input v-model="emailAddress" type="email">
    <input v-model="password" type="password">
    <input type="button" value="Login" @click="signInWithEmail">
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
