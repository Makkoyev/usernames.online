<template>
  <nav id="nav-bar">
    <div class="logo">
      Usernames.Online
    </div>
    <ul>
      <li>
        <nuxt-link to="/">
          Home
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/explore">
          Explore
        </nuxt-link>
      </li>
      <li v-if="!isAuth">
        <nuxt-link to="/login">
          Login
        </nuxt-link>
      </li>
      <li v-if="!isAuth">
        <nuxt-link to="/register">
          Register
        </nuxt-link>
      </li>
      <li v-if="isAuth">
        <nuxt-link to="/create">
          <i class="fas fa-plus-circle fa-lg" />
        </nuxt-link>
      </li>
      <li v-if="isAuth">
        <nuxt-link to="/private-chat">
          <i class="fas fa-comment-alt fa-lg" />
        </nuxt-link>
      </li>
      <li v-if="isAuth">
        <nuxt-link to="/friends">
          <i class="fas fa-user-friends fa-lg" />
        </nuxt-link>
      </li>
      <li v-if="isAuth">
        <nuxt-link to="/private-chat">
          <i class="fas fa-user-circle fa-lg" />
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  props: ['isAuth']
}
</script>
