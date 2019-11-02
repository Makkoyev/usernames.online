<template>
  <div class="sendMessage">
    <input type="text" v-model="composedMessage" @keyup.enter="sendMessage" />
    <input type="button" value="Send" @click="sendMessage" />
  </div>
</template>

<script>
import { db } from '@/plugins/initializeFirebase'
export default {
  data () {
    return {
      composedMessage: null
    }
  },
  methods: {
    sendMessage () {
      db.collection('globalChat').add({
        message: this.composedMessage,
        createdAt: new Date(),
        displayName: this.$store.state.user.data.displayName,
        uid: this.$store.state.user.data.uid
      })
      this.composedMessage = null
    }
  }
}
</script>
