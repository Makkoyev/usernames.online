<template>
  <div class="container">Post id {{postId}}</div>
</template>

<script>
import { db } from "@/main";

export default {
  data() {
    return {
      //id is name of the dynamic segment we created in router
      postId: this.$route.params.id,
      post: []
    };
  },
  created() {
    let self = this;
    db.collection("posts")
      .doc(this.postId)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          self.post = doc.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }
};
</script>

<style>
</style>