<template>
  <div>
    <input class="cp-title" type="text" v-model="postData.title" />
    <textarea class="cp-content" v-model="postData.post" cols="30" rows="10"></textarea>
    <select class="cp-select" v-model="postData.type">
      <option value="Question">Question</option>
      <option value="Post">Post</option>
      <option value="Confession">Confession</option>
    </select>
    <label class="cp-anonymous" v-if="postData.type === 'Confession'">
      <input type="checkbox" value="anonymous" v-model="postData.anonymous" />Anonymous
    </label>
    <input class="cp-create" type="button" value="Create post" @click="createPost" :disabled="false" />
  </div>
</template>

<script>
import { db } from "@/main";
import firebase from "firebase/app";

export default {
  props: ["userOptions"],
  name: "AddPost",
  data() {
    return {
      postData: {
        title: null,
        post: null,
        type: null,
        anonymous: false,
        tags: null,
        category: null,
        score: 0,
        likes: 0
      }
    };
  },
  methods: {
    createPost() {
      let aRed = db.collection("posts");
      let docId = aRed.doc().id;
      console.log(docId);
      aRed.doc(docId)
        .set({
          title: this.postData.title,
          post: this.postData.post,
          createdAt: new Date(),
          displayName: this.userOptions.uidUser.displayName,
          uid: this.userOptions.uidUser.uid,
          type: this.postData.type,
          anonymous: this.postData.anonymous,
          tags: this.postData.tags,
          category: this.postData.category,
          postId: docId,
          score: this.postData.likes,
          likes: this.postData.score
        })
        .then(() => {
          db.collection("users")
            .doc(this.userOptions.uidUser.uid)
            .update({
              posts: firebase.firestore.FieldValue.arrayUnion(docId)
            });
        });
      this.postData.title = null;
      this.postData.post = null;
      this.postData.type = null;
      this.postData.anonymous = false;
      this.postData.tags = null;
      this.postData.category = null;
    }
  }
};
</script>

<style>
</style>