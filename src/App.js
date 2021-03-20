import React from 'react';
import reactifyWc from 'reactify-wc';
import 'vue-advanced-chat/dist/vue-advanced-chat.min.js';

import './App.css';

const ChatWindow = reactifyWc('vue-advanced-chat');

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentUserId: 1234,
			roomId: 1,
			rooms: [
				{
					roomId: 1,
					roomName: 'Room 1',
					avatar: 'https://66.media.tumblr.com/avatar_c6a8eae4303e_512.pnj',
					users: [
						{ _id: 1234, username: 'John Doe' },
						{ _id: 4321, username: 'John Snow' }
					]
				}
			],
			messages: []
		};

		this.element = React.createRef();
	}

	componentDidMount() {
		this.element.current.addEventListener('fetch-messages', ev => {
			setTimeout(() => {
				this.setState({
					messages: [
						{
							_id: this.state.messages.length + 1,
							content: 'Hello World!',
							senderId: 1234,
							timestamp: new Date().toString().substring(16, 21),
							date: new Date().toDateString()
						}
					]
				});
			});
		});

		this.element.current.addEventListener('send-message', ev => {
			const message = ev.detail[0];

			this.setState({
				messages: [
					...this.state.messages,
					{
						_id: this.state.messages.length + 1,
						content: message.content,
						senderId: this.state.currentUserId,
						timestamp: new Date().toString().substring(16, 21),
						date: new Date().toDateString()
					}
				]
			});
		});
	}

	render() {
		return (
			<ChatWindow
				ref={this.element}
				height="calc(100vh - 20px)"
				current-user-id={this.state.currentUserId}
				load-first-room={true}
				room-id={this.roomId}
				rooms={this.state.rooms}
				rooms-loaded={true}
				show-footer={true}
				messages={this.state.messages}
				messages-loaded={true}
				on-fetch-messages
				on-send-message
			/>
		);
	}
}

export default App;
