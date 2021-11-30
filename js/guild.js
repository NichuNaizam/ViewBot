function loadGuildsToNavbar() {
	clearGuilds();

	document.getElementById('navbar').style.visibility = 'visible';
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

		let guildImage = guild.iconURL() !== null ? guild.iconURL() : './assets/default_guild.png'; 

		guildIcon.className = 'guild-icon';
		guildIcon.src = guildImage;
		guildIcon.alt = guild.name;

		item.appendChild(guildIcon);

		document.getElementById('navbar-guild-container').appendChild(item);
	});
}

function clearGuilds() {
	document.getElementById('navbar').style.visibility = 'hidden';
	document.getElementById('navbar-guild-container').innerHTML = '';
}
