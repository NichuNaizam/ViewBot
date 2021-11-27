function bindKeyListener() {
	const messageInput = document.getElementById('message-input');

	messageInput.onkeydown = function (e) {        
		if (global.selectedChannel && e.code === 'Enter' && messageInput.value !== '') {
			global.selectedChannel.send(messageInput.value);
            messageInput.value = '';
		}
	};
}
