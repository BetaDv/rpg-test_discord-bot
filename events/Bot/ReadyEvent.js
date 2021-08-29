module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log('---------------------');
		console.log(`Bot Online at ${client.user.tag},`);
		console.log(`In ${client.guilds.cache.size} Servers.`);
		console.log('---------------------');
	}
}