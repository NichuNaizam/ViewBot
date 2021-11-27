function setMessageListener() {
	const messageList = document.getElementById('messages-menu-container');

	global.client.on('message', (msg) => {
		if (!global.selectedChannel || msg.channel !== global.selectedChannel) return;

		let message = document.createElement('li');
		let messageAvatar = document.createElement('img');
		let messageUsername = document.createElement('p');
		let messageContent = document.createElement('p');

		message.className = 'message';

		messageAvatar.className = 'message-avatar';
		messageAvatar.src = msg.author.displayAvatarURL();
		messageAvatar.alt = msg.author.username;

		messageUsername.className = 'message-author';
		messageUsername.innerHTML = msg.author.username;

		messageContent.className = 'message-content';
		messageContent.innerHTML = msg.content !== '' ? msg.content : 'Embeds are not supported yet!';

		message.appendChild(messageAvatar);
		message.appendChild(messageUsername);
		message.appendChild(messageContent);

		messageList.appendChild(message);
		message.scrollIntoView({ behavior: 'smooth' });
	});
}

function loadMessagesFromChannel(channel) {
	global.selectedChannel = channel;

	document.getElementById('messages-menu').style.visibility = 'visible';
	const messageList = document.getElementById('messages-menu-container');
	messageList.innerHTML = '';

	let lastMessageObject;

	channel.messages.fetch({ limit: 100 }).then((messages) => {
		messages
			.sort((message1, message2) => {
				return message1.createdTimestamp - message2.createdTimestamp;
			})
			.forEach((msg) => {
				let message = document.createElement('li');
				let messageAvatar = document.createElement('img');
				let messageUsername = document.createElement('p');
				let messageContent = document.createElement('p');

				message.className = 'message';

				messageAvatar.className = 'message-avatar';
				messageAvatar.src = msg.author.displayAvatarURL();
				messageAvatar.alt = msg.author.username;

				messageUsername.className = 'message-author';
				messageUsername.innerHTML = msg.author.username;

				messageContent.className = 'message-content';
				messageContent.innerHTML = msg.content !== '' ? msg.content : 'Embeds are not supported yet!';

				message.appendChild(messageAvatar);
				message.appendChild(messageUsername);
				message.appendChild(messageContent);

				lastMessageObject = message;
				messageList.appendChild(message);
			});

		lastMessageObject.scrollIntoView();
	});
}
