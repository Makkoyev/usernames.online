<template>
  <div>
    <div class="card-img">
      <div class="vote-counter">
        <div class="vote">
          <i class="fas fa-sort-up fa-lg"></i>
          <i class="fas fa-sort-down fa-lg"></i>
        </div>
        <span>{{post.score}}</span>
      </div>
      <div class="like">
        <span>{{post.likes}}</span>
        <i v-if="liked" @click="postLike" class="fas fa-heart fa-lg"></i>
        <i v-else class="fas fa-heart" style="color: white;"></i>
      </div>
      <div class="share-social">
        <i class="facebook fab fa-facebook fa-2x"></i>
      </div>
    </div>
    <h2 class="post-title">{{stringTruncate(post.title, 45)}}</h2>
    <div class="post-content" v-html="stringTruncate(post.post, 100)">{{post.post}}</div>
    <div class="post-data">
      <span class="post-author" v-if="!post.anonymous">
        <router-link v-bind:to="'/profile/' + post.uid">by {{post.displayName}}</router-link>
      </span>
      <span class="read-more">
        <router-link v-bind:to="'/post/' + post.postId">Read More</router-link>
      </span>
    </div>
  </div>
</template>

<script>
import { db } from "@/main";
import firebase from "firebase/app";
export default {
  props: ["post", "dbUser"],
  name: "Post",
  data() {
    return {
      user: this.$store.state.userOptions.user,
      liked: false // TO FIX DISABLING ONCE YOU LIKED A POST
    };
  },
  methods: {
    stringTruncate(str, length) {
      var dots = str.length > length ? ". . ." : "";
      return str.substring(0, length) + dots;
    },
    postLike() {
      let likeRef = db.collection("posts");
      likeRef
        .doc(this.post.postId)
        .update({
          likes: this.post.likes + 1
        })
        .then(() => {
          db.collection("users")
            .doc(this.user.uid)
            .update({
              liked: firebase.firestore.FieldValue.arrayUnion(this.post.postId)
            });
        });
    }
  },
  computed: {
    uidUser() {
      return (this.user = this.$store.state.userOptions.user);
    }
  }
};
</script>

<style>
</style>