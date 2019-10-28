<template>
  <div class="container">
    <div v-if="loading">LOADING PAGE</div>
    <div v-else class="wall-wrapper">
      <div class="post-wrapper">
        <Post
          class="post animated bounceInUp fast"
          v-for="(post, index) in renderPosts(posts)"
          :key="index"
          :post="post"
          :dbUser="dbUser"
        />
      </div>
      <Pagination class="posts-navigation" v-bind:paginationOptions="paginationOptions" />
    </div>
  </div>
</template>

<script>
import Post from "@/components/wall/Post";
import Pagination from "@/components/wall/Pagination";
import { db } from "@/main";

export default {
  components: {
    Post,
    Pagination
  },
  data() {
    return {
      loading: true,
      posts: [],
      dbUser: [],
      user: this.$store.state.userOptions.user,
      paginationOptions: {
        totalPosts: undefined,
        currentPost: 0,
        maxPost: 8,
        currentPage: 1,
        visiblePosts: [],
        ceil: 0
      }
    };
  },
  methods: {
    readMessages() {
      db.collection("posts")
        .orderBy("createdAt")
        .onSnapshot(querySnapshot => {
          let allPosts = [];
          querySnapshot.forEach(doc => {
            allPosts.push(doc.data());
          });
          this.posts = allPosts.reverse();
          this.paginationOptions.totalPosts = allPosts.length;
          this.loading = false;
        });
    },
    renderPosts(posts) {
      let newPosts = posts.slice(
        this.paginationOptions.currentPost,
        this.paginationOptions.maxPost
      );
      return (this.paginationOptions.visiblePosts = newPosts);
    },
    loadDBUser() {
      return this.$store.dispatch("fetchFUser", this.$store.state.userOptions.user.uid);
    }
  },
  created() {
    this.readMessages();
  },
  computed: {
    userLoad() {
      return (this.user = this.$store.state.userOptions.user);
    }
  }
};
</script>