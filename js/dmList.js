isDMMessageListenerLoaded = false;

function bindDMListener() {
	if (isDMMessageListenerLoaded) return;
	global.DMList = [];
	isDMMessageListenerLoaded = true;

	global.client.on('message', (message) => {
		if (message.channel.type !== 'dm' || message.author.id === global.client.user.id) return;

		if (!document.getElementById(`dm=${message.author.id}`)) {
			addDMChannel(message.author);
		}
	});
}

function loadDMS() {
	clearMembers();
	clearChannels();
	clearMessages();

	if (global.selectedGuild) {
		document.getElementById('guild=' + global.selectedGuild.id).firstChild.classList.remove('selected-guild');
	}

	global.selectedGuild = undefined;
	global.selectedChannel = undefined;

	global.DMList.forEach(value => {		
		addDMChannel(value.user);
	});

	document.getElementById('channels-menu').style.visibility = 'visible';
}