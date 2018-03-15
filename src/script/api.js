import openSocket from 'socket.io-client';
// Socket
const socket = openSocket('http://localhost:8000');

function whatsTheChat(chat) {
	socket.on('chat', chat => cb(null, chat));
	socket.emit('chatter', 1000);
}
export { whatsTheChat };