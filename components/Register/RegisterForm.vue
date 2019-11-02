<template>
  <div>
    <input v-model="emailAddress" type="email">
    <input v-model="password" type="password">
    <input type="button" value="Signup" @click="signUpWithEmail">
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
    signUpWithEmail () {
      const user = {
        email: this.emailAddress,
        password: this.password
      }
      this.$store.dispatch('user/signUpWithEmail', user)
    }
  }
}
</script>
