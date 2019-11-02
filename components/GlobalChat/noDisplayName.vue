<template>
  <div class="noDisplayName">
    {{ this.$store.state.user.data.displayName }}
    <input type="text" v-model="newDisplayName" @keyup.enter="setDisplayName" />
    <input type="button" value="Send" @click="setDisplayName" />
  </div>
</template>

<script>
import { db, auth } from '@/plugins/initializeFirebase'

export default {
  data () {
    return {
      newDisplayName: null
    }
  },
  methods: {
    setDisplayName () {
      const navigation = this.$router
      // POST NAME in ('users') collection
      db.collection('users')
        .doc(this.$store.state.user.data.uid)
        .update({
          displayName: this.newDisplayName
        })
        .then(() => {
          // Updating the Profile
          auth.currentUser
            .updateProfile({
              displayName: this.newDisplayName
            })
            .then(
              function () {
                console.log('Updated')
                navigation.go()
              },
              function (error) {
                console.log('Error happened', error)
              }
            )
        })
    }
  }
}
</script>
