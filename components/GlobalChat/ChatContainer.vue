<template>
  <div class="messages">
    <div class="message" v-for="(message, index) in messages" :key="index">
      {{ message.message }}
    </div>
  </div>
</template>

<script>
import { db } from '@/plugins/initializeFirebase'
export default {
  data () {
    return {
      messages: []
    }
  },
  methods: {
    loadMessages () {
      db.collection('globalChat')
        .orderBy('createdAt')
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const allMessages = []
            querySnapshot.forEach((doc) => {
              allMessages.push(doc.data())
            })
            this.messages = allMessages
          })
        })
    }
  },
  created () {
    this.loadMessages()
  }
}
</script>
