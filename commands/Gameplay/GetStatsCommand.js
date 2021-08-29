const Color = require('../../data/embeds.js');

module.exports = {
	name: 'stats',
	description: 'Get Statistics of Yourself or of Another player!',
	cooldown: '3s',
	usage: '(User Mention)',
	category: 'Gameplay',
	execute(client, message, args) {
		let user = message.mentions.users.first() || message.author;
     
    if(user.bot === true) return message.channel.send(client.makeEmbed(
			{
				title: "ERROR...",

				color: Color.Error,
				description: "That is a Bot. Bots don't have any Stats on our Bot!"
			},
			message
		))
     
		let stat = client.userManager.hasUser(user.id);
		if (stat === true) stat = client.userManager.getFull(user.id);
		else stat = client.userManager.defOps;
		const stats = `Coins: ${stat.Coins},
Training Points: ${stat.TrainingPoints},
Stage: ${stat.Stage}.
`;

		let statsTitle =
			message.mentions.users.first() && user.id !== message.author.id
				? user.username + "'s Statistics"
				: 'Your Statistics';

		let Embed = client.makeEmbed(
			{
				title: statsTitle,

				color: Color.Success,
				description: stats
			},
			message
		);

		return message.channel.send(Embed);
	}
};
