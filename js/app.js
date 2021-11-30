const DiscordJS = require('discord.js');

global.client = new DiscordJS.Client();

function load() {
	if (localStorage.getItem('BOT_TOKEN') !== null) {
		logInToDiscord(localStorage.getItem('BOT_TOKEN'));
	} else {
		document.querySelector('.login-panel').style.visibility = 'visible';
	}

	document.getElementById('login-btn').onclick = function () {
		const token = document.getElementById('token-input').value;
		localStorage.setItem('BOT_TOKEN', token);
		logInToDiscord(token);
	};
}

function logInToDiscord(token) {
	global.client.once('ready', () => {
		document.getElementById('invalid-token-label').style.visibility = 'hidden';
		bindKeyListener();
		setMessageListener();
		setPresenceListener();
		hideLoginMenu();
		loadGuildsToNavbar();
	});

	global.client.login(token).catch(() => {
		document.querySelector('.login-panel').style.visibility = 'visible';
		document.getElementById('invalid-token-label').style.visibility = 'visible';
	});
}

function logOutFromDiscord() {
	global.client.destroy();
	showLoginMenu();
}
