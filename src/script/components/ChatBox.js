import React from 'react';

export default ({ text, username, handleTextChange }) => (
	<div>
		<div className="chat">
			<div className="col-xs-5 col-xs-offset-3">
				<input
					type="text"
					value={text}
					placeholder="chat here..."
					className="form-control u-full-width"
					onChange={handleTextChange}
					onKeyDown={handleTextChange}
				/>
			</div>

			<h4 className="greetings">Hello, {username}</h4>
		</div>
	</div>
);