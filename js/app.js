const DiscordJS = require('discord.js');

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
	global.client = new DiscordJS.Client();

	console.log('Loggining in');
	global.client.once('ready', () => {
		console.log('Binding listenrs');
		document.getElementById('invalid-token-label').style.visibility = 'hidden';
		bindKeyListener();
		bindDMListener();
		loadUserMenu();
		setMessageListener();
		setPresenceListener();
		hideLoginMenu();
		loadGuildsToNavbar();
	});

	global.client.login(token).catch(() => {
		console.log('Invalid token');
		document.querySelector('.login-panel').style.visibility = 'visible';
		document.getElementById('invalid-token-label').style.visibility = 'visible';
	});
}

function logOutFromDiscord() {
	clearChannels();
	clearMessages();
	clearGuilds();
	clearMembers();
	hideUserMenu();

	localStorage.removeItem('BOT_TOKEN');

	global.client.destroy();
	showLoginMenu();
}
