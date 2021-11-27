function loadChannelsFromGuild(guild) {
	document.getElementById('channels-menu').style.visibility = 'visible';
	document.getElementById('channels-menu-container').innerHTML = '';

	const channelList = document.getElementById('channels-menu-container');

	guild.channels.cache
		.filter((c) => c.type === 'text')
		.forEach((channel) => {
			let channelItem = document.createElement('li');
			channelItem.className = 'channel';
			channelItem.id = channel.id;
			channelItem.innerHTML = channel.name;

			channelItem.onclick = function () {
				loadMessagesFromChannel(channel);
			}

			channelList.appendChild(channelItem);
		});
}
