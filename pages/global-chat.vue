<template>
  <div>{{ messages }}</div>
</template>

<script>
import { db } from '@/plugins/initializeFirebase'
export default {
  name: 'GlobalChat',
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
            this.messages.push(doc.data())
          })
        })
    }
  },
  created () {
    this.loadMessages()
  }
}
</script>
