function loadChannelsFromGuild(guild) {
	clearChannels();
	document.getElementById('channels-menu').style.visibility = 'visible';

	const channelList = document.getElementById('channels-menu-container');

	guild.channels.cache
		.sort((c1, c2) => c1.position - c2.position)
		.filter((c) => c.type === 'category')
		.forEach((channel) => {
			let channelItem = document.createElement('li');
			channelItem.className = 'category';
			channelItem.id = channel.id;
			channelItem.innerHTML = channel.name;

			channelList.appendChild(channelItem);
		});

	guild.channels.cache
		.sort((c1, c2) => c1.rawPosition - c2.rawPosition)
		.filter((c) => c.type === 'text' || c.type === 'news')
		.forEach((channel) => {
			let channelItem = document.createElement('li');
			channelItem.className = 'channel';
			channelItem.id = channel.id;
			channelItem.innerHTML = channel.name;

			channelItem.onclick = function () {
				loadMessagesFromChannel(channel);
			};

			if (channel.parentID) {
				document.getElementById(channel.parentID).appendChild(channelItem);
			} else {
				channelList.appendChild(channelItem);
			}
		});

	guild.channels.cache
		.sort((c1, c2) => c1.rawPosition - c2.rawPosition)
		.filter((c) => c.type === 'voice')
		.forEach((channel) => {
			let channelItem = document.createElement('li');
			channelItem.className = 'voice-channel';
			channelItem.id = channel.id;
			channelItem.innerHTML = channel.name;

			if (channel.parentID) {
				document.getElementById(channel.parentID).appendChild(channelItem);
			} else {
				channelList.appendChild(channelItem);
			}
		});
}

async function addDMChannel(author) {
	document.getElementById('channels-menu').style.visibility = 'visible';

	let channel = null;
	global.DMList.forEach((value) => {
		if (value.user.id === author.id) {
			channel = value.channel;
		}
	});

	if (channel === null) {
		channel = await author.createDM();
		global.DMList.push({ user: author, channel: channel });
	}

	if (global.selectedGuild !== undefined) return;
	const channelList = document.getElementById('channels-menu-container');

	let channelItem = document.createElement('li');
	channelItem.className = 'channel';
	channelItem.id = 'dm=' + author.id;
	channelItem.innerHTML = author.username;

	channelItem.onclick = function () {
		loadMessagesFromChannel(channel);
	};

	channelList.appendChild(channelItem);

	return channel;
}

function clearChannels() {
	document.getElementById('channels-menu-container').innerHTML = '';
	document.getElementById('channels-menu').style.visibility = 'hidden';
}
