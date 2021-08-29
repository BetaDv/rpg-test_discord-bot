const Color = require("../../data/embeds.js");
const {
	MessageEmbed
} = require("discord.js");

module.exports = {
	name: 'invite',
	aliases: ['invite-bot'],
	description: "Shows the Invite Link for BITT.",
	category: 'Bot',
	cooldown: "3s",
	execute(client, message, args) {
			return message.channel.send(client.makeEmbed({
				title: "Invite Me!",
				color: Color.Success,
				description: `To Invite me You May [Click Here](${client.config.Main.InviteURL})!`
			}, message));
		
	}
};