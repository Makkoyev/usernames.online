<template>
  <div>
    Password forgot?
    <input type="text" v-model="forgotPassword.email" />
    <input type="button" value="Reset Password" @click="resetPassword" />
  </div>
</template>

<script>
import {auto} from '@/main';

export default {
  name: "ForgotPassword",
  data() {
      return {
          forgotPassword: {
              email: ""
          }
      }
  },
  methods: {
    resetPassword() {
      auth
        .sendPasswordResetEmail(this.forgotPassword.email)
        .then(function() {
          // Email sent.
          console.log("email sent");
        })
        .catch(function(error) {
          // An error happened.
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>