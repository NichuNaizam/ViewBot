function setPresenceListener() {
	global.client.on('presenceUpdate', () => {
		if (!global.selectedGuild) return;

		loadMembersFromGuild(global.selectedGuild);
	});
}
