<template>
	<client-only>
		<chat-window
			height="calc(100vh - 20px)"
			:current-user-id="currentUserId"
			:rooms="rooms"
			:rooms-loaded="true"
			:messages="messages"
			:messages-loaded="messagesLoaded"
			@send-message="sendMessage"
			@fetch-messages="fetchMessages"
		/>
	</client-only>
</template>

<script lang="ts">
import Vue from 'vue'

import { Message, Messages, Rooms } from 'vue-advanced-chat'
import 'vue-advanced-chat/dist/vue-advanced-chat.css'

const importChat = () => {
	if (process.client) {
		return { ChatWindow: () => import('vue-advanced-chat') }
	}
	return {}
}

export default Vue.extend({
	name: 'Chat',
	components: importChat(),
	data() {
		return {
			currentUserId: 1234,
			rooms: [
				{
					roomId: 1,
					roomName: 'Room 1',
					// avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
					users: [
						{ _id: 1234, username: 'John Doe' },
						{ _id: 4321, username: 'John Snow' }
					]
				}
			] as Rooms,
			messages: [] as Messages,
			messagesLoaded: false
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
		addMessages(reset = false) {
			const messages = []
			for (let i = 0; i < 30; i++) {
				messages.push({
					_id: reset ? i : this.messages.length + i,
					content: `${reset ? '' : 'paginated'} message ${i + 1}`,
					senderId: 4321,
					username: 'John Doe',
					date: '13 November',
					timestamp: '10:20'
				})
			}
			return messages
		},
		sendMessage(message: Message) {
			this.messages = [
				...this.messages,
				{
					_id: this.messages.length,
					content: message.content,
					senderId: this.currentUserId,
					timestamp: new Date().toString().substring(16, 21),
					date: new Date().toDateString()
				}
			]
		},
		addNewMessage() {
			setTimeout(() => {
				this.messages = [
					...this.messages,
					{
						_id: this.messages.length,
						content: 'NEW MESSAGE',
						senderId: 4321,
						timestamp: new Date().toString().substring(16, 21),
						date: new Date().toDateString()
					}
				]
			}, 2000)
		}
	}
})
</script>

<style></style>
