<template>
	<div>
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
	</div>
</template>

<script>
import ChatWindow from 'vue-advanced-chat'
import 'vue-advanced-chat/dist/vue-advanced-chat.css'
// import ChatWindow from '../../vue-advanced-chat/src/ChatWindow'

export default {
	name: 'Chat',

	components: {
		ChatWindow
	},

	data() {
		return {
			currentUserId: 1234,
			rooms: [],
			messages: [],
			messagesLoaded: false
		}
	},

	mounted() {
		this.rooms = [
			{
				roomId: 1,
				roomName: 'Room 1',
				avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
				users: [
					{ _id: 1234, username: 'John Doe' },
					{ _id: 4321, username: 'John Snow' }
				]
			}
		]
	},

	methods: {
		fetchMessages() {
			setTimeout(() => {
				const messages = []

				for (let i = 0; i < 30; i++) {
					messages.push({
						_id: i,
						content: 'message 1',
						senderId: 1234,
						username: 'John Doe',
						date: '13 November',
						timestamp: '10:20'
					})
				}

				this.messages = messages
				this.messagesLoaded = true
			}, 500)

			setTimeout(() => {
				this.messages.push({
					_id: this.messages.length,
					content: 'NEW',
					senderId: 't',
					timestamp: new Date().toString().substring(16, 21),
					date: new Date().toDateString()
				})
			}, 2000)
		},

		sendMessage(message) {
			this.messages.push({
				_id: this.messages.length,
				content: message.content,
				senderId: this.currentUserId,
				timestamp: new Date().toString().substring(16, 21),
				date: new Date().toDateString()
			})
		}
	}
}
</script>

<style lang="scss">
body {
	font-family: 'Quicksand', sans-serif;
}
</style>
