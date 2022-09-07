<template>
  <client-only>
    <vue-advanced-chat
      height="calc(100vh - 20px)"
      :current-user-id="currentUserId"
      :rooms="JSON.stringify(rooms)"
      :rooms-loaded="true"
      :messages="JSON.stringify(messages)"
      :messages-loaded="messagesLoaded"
      @send-message="sendMessage($event.detail[0])"
      @fetch-messages="fetchMessages($event.detail[0])"
    />
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue'
import { register } from 'vue-advanced-chat/dist/vue-advanced-chat.es.js'
register()

interface Message {
  _id: string
  content: string
  senderId: string
  username?: string
  timestamp: string
  date: string
}

export default Vue.extend({
  name: 'Chat',

  data() {
    return {
      currentUserId: '1234',
      rooms: [
        {
          roomId: '1',
          roomName: 'Room 1',
          avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
          users: [
            { _id: '1234', username: 'John Doe' },
            { _id: '4321', username: 'John Snow' },
          ],
        },
      ],
      messages: [] as Message[],
      messagesLoaded: false,
    }
  },

  methods: {
    fetchMessages({ options = { reset: false } }) {
      setTimeout(() => {
        if (options.reset) {
          this.messages = this.addMessages(true)
        } else {
          this.messages = [...this.addMessages(), ...this.messages]
          this.messagesLoaded = true
        }
        // this.addNewMessage()
      })
    },
    addMessages(reset = false): Message[] {
      const messages: Message[] = []
      for (let i = 0; i < 30; i++) {
        messages.push({
          _id: (reset ? i : this.messages.length + i).toString(),
          content: `${reset ? '' : 'paginated'} message ${i + 1}`,
          senderId: '4321',
          username: 'John Doe',
          date: '13 November',
          timestamp: '10:20',
        })
      }
      return messages
    },
    sendMessage(message: Message): void {
      this.messages = [
        ...this.messages,
        {
          _id: this.messages.length.toString(),
          content: message.content,
          senderId: this.currentUserId,
          timestamp: new Date().toString().substring(16, 21),
          date: new Date().toDateString(),
        },
      ]
    },
    addNewMessage(): void {
      setTimeout(() => {
        this.messages = [
          ...this.messages,
          {
            _id: this.messages.length.toString(),
            content: 'NEW MESSAGE',
            senderId: '1234',
            timestamp: new Date().toString().substring(16, 21),
            date: new Date().toDateString(),
          },
        ]
      }, 2000)
    },
  },
})
</script>

<style lang="scss">
body {
  font-family: 'Quicksand', sans-serif;
}
</style>
