<template>
  <div>
    <input type="email" v-model="userOptions.email" />
    <input type="password" v-model="userOptions.password" />
    <input type="button" value="Login" @click="loginUser" />
    <ForgotPassword />
  </div>
</template>

<script>
import ForgotPassword from './ForgotPassword';

export default {
  name: 'LoginForm',
  components: {
      ForgotPassword
  },
  data() {
    return {
      userOptions: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    loginUser() {
      const user = {
        email: this.userOptions.email,
        password: this.userOptions.password
      }
      this.$store.dispatch('signInAction', user)
      this.$router.replace('/')
    }
  }
};
</script>

<style>
</style>