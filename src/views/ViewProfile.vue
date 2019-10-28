<template>
  <div class="container">User with id {{userId}}</div>
</template>

<script>
import {db} from '@/main';

export default {
  data() {
    return {
      //id is name of the dynamic segment we created in router
      userId: this.$route.params.uid,
      profile: []
    };
  },
  created() {
    let self = this;
    db.collection("users").doc(this.userId)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          self.profile = doc.data();
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