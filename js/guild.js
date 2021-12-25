function loadGuildsToNavbar() {
	clearGuilds();

	document.getElementById('navbar').style.visibility = 'visible';
	global.client.guilds.cache.forEach((guild) => {
		let item = document.createElement('li');
		let guildIcon = document.createElement('img');

		item.onclick = function () {
			if (global.selectedGuild) {
				document.getElementById('guild=' + global.selectedGuild.id).firstChild.classList.remove('selected-guild');
			}

			global.selectedGuild = guild;
			global.selectedChannel = undefined;
			guildIcon.classList.add('selected-guild');
			clearMessages();
			loadChannelsFromGuild(guild);
			loadMembersFromGuild(guild);
		};

		item.className = 'guild-item';
		item.id = 'guild=' + guild.id;

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

	let item = document.createElement('li');
	let homeIcon = document.createElement('img');

	item.onclick = function () {
		if (global.selectedGuild) {
			document.getElementById('guild=' + global.selectedGuild.id).firstChild.classList.remove('selected-guild');
		}

		global.selectedGuild = undefined;
		global.selectedChannel = undefined;

		clearMessages();
		clearChannels();
		clearMembers();
		loadDMS();
	};

	item.classList.add('navbar-home');

	homeIcon.classList.add('navbar-home-icon');
	homeIcon.src = './assets/logo.png';
	homeIcon.alt = 'Home';

	item.appendChild(homeIcon);

	document.getElementById('navbar-guild-container').appendChild(item);
}
