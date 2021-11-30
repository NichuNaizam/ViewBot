function bindKeyListener() {
	const messageInput = document.getElementById('message-input');

	messageInput.onkeyup = function (e) {
		console.log(messageInput.value);
		if (messageInput.value === '') {
			global.selectedChannel.stopTyping(true);
		} else {
			global.selectedChannel.startTyping();
		}
	}

	messageInput.onkeydown = function (e) {        
		if (global.selectedChannel && e.code === 'Enter' && messageInput.value !== '') {
			global.selectedChannel.send(messageInput.value);
            messageInput.value = '';
		}
	};
}
