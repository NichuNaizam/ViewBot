function loadGuildsToNavbar() {
	document.getElementById('navbar-guild-container').innerHTML = '';

	global.client.guilds.cache.forEach((guild) => {
		let item = document.createElement('li');
		let guildIcon = document.createElement('img');

		item.onclick = function () {
			global.selectedGuild = guild;
			global.selectedChannel = undefined;
			clearMessages();
			loadChannelsFromGuild(guild);
			loadMembersFromGuild(guild);
		};

		item.className = 'guild-item';

		guildIcon.className = 'guild-icon';
		guildIcon.src = guild.iconURL();
		guildIcon.alt = guild.name;

		item.appendChild(guildIcon);

		document.getElementById('navbar-guild-container').appendChild(item);
	});
}
