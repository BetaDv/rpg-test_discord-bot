const Color = require("../../data/embeds");

module.exports = {
	name: 'train',
	description: "Train yourself and get 1 point.",
	cooldown: "15m",
  category: "Gameplay",
	execute(client, message, args) {
        const currentTrainingPoints = client.userManager.getOpt(message.author.id, "TrainingPoints")
        const trainPoints = Math.floor(Math.random() * 3 + 1);
			message.channel.send(client.makeEmbed({
				title: "You Trained!",
				color: Color.Success,
				description: `You have Recieved ${trainPoints} Training Points!`
			}, message));
		return client.userManager.editOpt(message.author.id, "TrainingPoints", trainPoints + currentTrainingPoints);
	}
};