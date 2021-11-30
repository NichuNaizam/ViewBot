function loadUserMenu() {
	hideUserMenu();
	const userMenu = document.getElementById('user-menu');
	userMenu.style.visibility = 'visible';

	const avatar = document.createElement('img');
	const username = document.createElement('p');
	const logout = document.createElement('button');

	avatar.src = global.client.user.displayAvatarURL();
	avatar.alt = 'Avatar';

	username.innerHTML = global.client.user.username;

	logout.innerHTML = 'Log out';
    logout.onclick = function () {
        logOutFromDiscord();
    }

	userMenu.appendChild(avatar);
	userMenu.appendChild(username);
	userMenu.appendChild(logout);
}

function hideUserMenu() {
	const userMenu = document.getElementById('user-menu');
	userMenu.style.visibility = 'hidden';
	userMenu.innerHTML = '';
}