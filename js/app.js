const DiscordJS = require('discord.js');

global.client = new DiscordJS.Client();

function load() {
	document.getElementById('login-btn').onclick = function () {
		const token = document.getElementById('token-input').value;
		logInToDiscord(token);
	};
}

function logInToDiscord(token) {
	global.client.once('ready', () => {
		document.getElementById('invalid-token-label').style.visibility = 'hidden';
		bindKeyListener();
		setMessageListener();
		hideLoginMenu();
		loadGuildsToNavbar();
	});

	global.client.login(token).catch(() => {
		document.getElementById('invalid-token-label').style.visibility = 'visible';
	});
}

function logOutFromDiscord() {
	global.client.destroy();
	showLoginMenu();
}
