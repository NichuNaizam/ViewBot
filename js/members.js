function loadMembersFromGuild(guild) {
    document.getElementById('members-menu').style.visibility = 'visible';
    document.getElementById('members-menu-container').innerHTML = '';

    guild.members.cache.forEach(member => {
        let memberItem = document.createElement('li');
        let memberAvatar = document.createElement('img');
        let memberUsername = document.createElement('p');

        memberItem.className = 'member';
        memberAvatar.className = 'member-avatar';
        memberUsername.className = 'member-username';

        memberAvatar.src = member.user.displayAvatarURL();
        memberAvatar.alt = member.user.tag;

        memberUsername.innerHTML = member.user.tag;

        memberItem.appendChild(memberAvatar);
        memberItem.appendChild(memberUsername);

        document.getElementById('members-menu-container').appendChild(memberItem);
    })
}