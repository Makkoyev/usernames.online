<template>
  <nav id="nav-bar">
    <div class="logo">Usernames.Online</div>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li v-if="this.$store.state.userOptions.user">
        <router-link to="/chat">Chat</router-link>
      </li>
      <li>
        <router-link to="/wall">Wall</router-link>
      </li>
      <li v-if="this.$store.state.userOptions.user">
        <router-link to="/create-post">Create Post</router-link>
      </li>
      <li v-if="this.$store.state.userOptions.user" class="nav-profile">
        <router-link to="/profile">Profile</router-link>
      </li>
      <li v-if="!this.$store.state.userOptions.user">
        <router-link to="/login">Login</router-link>
      </li>
      <li v-if="!this.$store.state.userOptions.user">
        <router-link to="/register">Register</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navigation"
};
</script>

<style>
</style>