<template>
  <div class="messages-wrapper">
    <noDisplayName v-if="!this.$store.state.user.data.displayName" />
    <div class="messages-container" v-else>
      <ChatContainer />
      <sendMessage />
    </div>
  </div>
</template>

<script>
import noDisplayName from '@/components/GlobalChat/noDisplayName'
import ChatContainer from '@/components/GlobalChat/ChatContainer'
import sendMessage from '@/components/GlobalChat/sendMessage'

export default {
  name: 'GlobalChat',
  components: {
    noDisplayName,
    ChatContainer,
    sendMessage
  }
}
</script>
