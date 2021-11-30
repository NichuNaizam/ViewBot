function loadMembersFromGuild(guild) {
	clearMembers();
	document.getElementById('members-menu').style.visibility = 'visible';

	const membersList = document.getElementById('members-menu-container');

	guild.roles.cache
		.sort((r1, r2) => r2.position - r1.position)
		.forEach((role) => {
			let roleItem = document.createElement('li');
			roleItem.innerHTML = role.name;
			roleItem.className = 'role';
			roleItem.id = role.id;

			roleItem.style.color = role.hexColor;

			membersList.appendChild(roleItem);
		});

	// Offline List
	let roleItem = document.createElement('li');
	roleItem.innerHTML = 'Offline';
	roleItem.className = 'role';
	roleItem.id = 'offline';

	roleItem.style.color = '#808080';

	membersList.appendChild(roleItem);

	guild.members.cache
		.sort((m1, m2) => m2.roles.highest.position - m1.roles.highest.position)
		.forEach((member) => {
			if (member.user.presence.status === 'offline') {
				addMembers(member, true);
			} else {
				addMembers(member);
			}
		});

	removeEmptyRoles();
}

function addMembers(member, offline = false) {
	let memberItem = document.createElement('li');
	let memberAvatar = document.createElement('img');
	let memberUsername = document.createElement('p');
	let memberStatus = document.createElement('p');

	memberItem.className = 'member';
	memberAvatar.className = 'member-avatar';
	memberUsername.className = 'member-username';
	memberStatus.className = 'member-status';

	memberAvatar.src = member.user.displayAvatarURL();
	memberAvatar.alt = member.user.tag;
	memberAvatar.onclick = function () {
		document.getElementById('message-input').value += ` <@${member.user.id}>`
	}

	let status = member.user.presence.status;
	let color;

	if (status === 'online') {
		color = '#00FF00';
	} else if (status === 'idle') {
		color = '#FFFF00';
	} else if (status === 'dnd') {
		status = 'do not disturb';
		color = '#FF0000';
	}

	if (offline) {
		status = 'Offline';
		color = '#808080'
	}

	memberStatus.innerHTML = status;
	memberStatus.style.color = color;

	memberUsername.innerHTML = member.user.tag;

	memberItem.appendChild(memberAvatar);
	memberItem.appendChild(memberUsername);
	memberItem.appendChild(memberStatus);

	if (offline) {
		document.getElementById('offline').appendChild(memberItem);
	}
	else if (member.roles.cache.size > 0) {
		document.getElementById(member.roles.highest.id).appendChild(memberItem);
	} else {
		membersList.appendChild(memberItem);
	}
}

async function removeEmptyRoles() {
	const membersList = document.querySelector('#members-menu-container');

	membersList.childNodes.forEach((node) => {
		if (node.childNodes.length === 1) {
			node.innerHTML = '';
		}
	});
}

function clearMembers() {
	document.getElementById('members-menu-container').innerHTML = '';
	document.getElementById('members-menu').style.visibility = 'hidden';
}
