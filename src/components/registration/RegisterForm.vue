<template>
  <div>
    <input type="email" v-model="userOptions.email" />
    <input type="password" v-model="userOptions.password" />
    <input type="button" value="Register" @click="createUser" />
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      userOptions: {
        email: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    createUser() {
      const user = {
        email: this.userOptions.email,
        password: this.userOptions.password
      };
      this.$store.dispatch("signUpAction", user);
      this.$router.replace("/");
    }
  }
};
</script>

<style>
</style>