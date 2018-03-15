import React, {Component} from 'react';

import axios from 'axios';
import io from 'socket.io-client';

import ChatList from '../components/ChatList';
import ChatBox from '../components/ChatBox';

export default class Application extends Component {
	constructor (props) {
		super(props);

		this.state = {
			text: '',
			username: '',
			chats: [],
			activeUsers: [],
			userLeft: false,
		};

		// Socket address
		this.socket = io('localhost:8000');

		// Bindings
		this.handleTextChange = this.handleTextChange.bind(this);
		this.createMessage = this.createMessage.bind(this);
		this.userLeftChat = this.userLeftChat.bind(this);

		// Socket Listeners
		this.socket.on('RECEIVE_MESSAGE', data => {
			this.createMessage(data);
		});

		this.socket.on('LOG_USERNAME', data => {
			this.setState({activeUsers: [...this.state.activeUsers, data.activeUsers]})
		});

		this.socket.on('USER_LEFT', data => {
			this.userLeftChat();
		});
	}
	
	componentDidMount() {
		// Prompt for username as this will be the name show in chat
		const username = window.prompt('Username: ', 'Anonymous');
		this.setState({ username });
		this.socket.emit('SEND_USERNAME', {
			activeUsers: username,
		});
	}

	handleTextChange(e) {
		if (e.keyCode === 13) {
			// If enter key is pressed send message with username
			this.socket.emit('SEND_MESSAGE', {
				username: this.state.username,
				message: this.state.text
			});
			this.setState({ text: '' }); // Clear text after submission
		} else {
			this.setState({ text: e.target.value });
		}
	}

	createMessage(data){
		// Create message
		this.setState({ chats: [...this.state.chats, data] });
	}

	userLeftChat(){
		// Check if a user has left the chat room
		this.setState({
			userLeft: true,
			activeUsers: []
		}, () => {
			setTimeout(() => {
				this.setState({userLeft: false});
			}, 700);
		})
	}

	render () {
		return (
			<div className="container">
				<ChatList chats={this.state.chats} />

				{this.state.activeUsers.length ?
					<div>
						<strong>Users who have recently joined chat: </strong>
						{this.state.activeUsers.map( (user, index) => {
							return <span key={index}> {user} </span>
						})}
					</div>
					:
					null
				}
				
				<ChatBox
					text={this.state.text}
					username={this.state.username}
					handleTextChange={this.handleTextChange}
				/>

				{this.state.userLeft && 
					<h2>A User Left the chat :(</h2>
				}
			</div>
		);
	}
}