import React from 'react';

export default ({ chats }) => (
	<ul>
		{chats.map( (chat, index) => {
			return (
				<div className="chatMessage" key={index} >
					<div className="box">
						<strong>{chat.username}</strong>
						<p>{chat.message}</p>
					</div>
				</div>
			);
		})}
	</ul>
);
