<template>
  <div class="container">
    <AddPost class="cp-form" v-bind:userOptions="userOptions" />
  </div>
</template>

<script>
import AddPost from '../components/posts/AddPost.vue';

export default {
  components: {
    AddPost
  },
  data() {
    return {
      userOptions: {
        uidUser: this.$store.state.userOptions.user
      }
    };
  },
  computed: {
    uidUser() {
      return (this.userOptions.uidUser = this.$store.state.userOptions.user);
    }
  }
};
</script>