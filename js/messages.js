const { ipcRenderer } = require('electron');

let isChannelMessageListenderLoaded = false;

function setMessageListener() {
	if (isChannelMessageListenderLoaded) return;
	isChannelMessageListenderLoaded = true;

	const messageList = document.getElementById('messages-menu-container');

	global.client.on('message', (msg) => {
		const value = {
			authorName: msg.author.username,
			messageContent: msg.content,
		};

		if (msg.author.id !== global.client.user.id) {
			ipcRenderer.send('message-notification', value);
		}

		if (!global.selectedChannel || msg.channel !== global.selectedChannel) return;

		addMessageToScreen(msg, true, msg.channel.type === 'dm');
	});

	global.client.on('messageDelete', (msg) => {
		if (!global.selectedChannel || msg.channel !== global.selectedChannel) return;

		document.getElementById(msg.id).remove();
	});
}

function loadMessagesFromChannel(channel, dm = false) {
	global.selectedChannel = channel;

	clearMessages();

	document.getElementById('messages-menu').style.visibility = 'visible';
	const messageList = document.getElementById('messages-menu-container');

	if (dm === true || channel.type === 'dm') {
		channel.messages.cache
			.sort((message1, message2) => {
				return message1.createdTimestamp - message2.createdTimestamp;
			})
			.forEach((msg) => {
				addMessageToScreen(msg, false, true);
			});
	} else if (channel.type === 'text') {
		channel.messages.fetch({ limit: 100 }).then((messages) => {
			messages
				.sort((message1, message2) => {
					return message1.createdTimestamp - message2.createdTimestamp;
				})
				.forEach((msg) => {
					addMessageToScreen(msg, false);
				});
		});
	}
}

function addMessageToScreen(msg, smooth = true, dm = false) {
	const messageList = document.getElementById('messages-menu-container');

	let message = document.createElement('li');
	let messageAvatar = document.createElement('img');
	let messageUsername = document.createElement('p');
	let messageContent = document.createElement('p');

	let attachmentList = [];

	message.className = 'message';
	message.id = msg.id;

	messageAvatar.className = 'message-avatar';
	messageAvatar.src = msg.author.displayAvatarURL();
	messageAvatar.alt = msg.author.username;

	messageUsername.className = 'message-author';
	messageUsername.innerHTML = dm ? msg.author.username : msg.member.displayName;
	if (msg.member) messageUsername.style.color = msg.member.roles.highest.hexColor;

	messageContent.className = 'message-content';
	messageContent.innerHTML = msg.content !== '' ? msg.content : 'Embeds are not supported yet!';

	if (msg.attachments) {
		msg.attachments.forEach((attachment) => {
			let img = document.createElement('img');
			img.src = attachment.proxyURL;
			img.alt = 'Failed to load this attachment!';
			img.width = '200';

			attachmentList.push(img);
		});
	}

	message.appendChild(messageAvatar);
	message.appendChild(messageUsername);
	message.appendChild(messageContent);

	if (attachmentList.length > 0) {
		attachmentList.forEach((element) => {
			message.appendChild(element);
		});
	}

	messageList.appendChild(message);

	message.scrollIntoView(smooth ? { behavior: 'smooth' } : {});
}

function clearMessages() {
	const messageMenu = document.getElementById('messages-menu');
	const messageList = document.getElementById('messages-menu-container');

	messageMenu.style.visibility = 'hidden';
	messageList.innerHTML = '';
}
