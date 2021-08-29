const {
	MessageEmbed
} = require('discord.js');
const Color = require('../../data/embeds.js');
const GuildCfg = require('../../utils/configManager.js');

const propertyObj = {
	"prefix [New Prefix / Reset]": "Changes the Guild's Prefix",
};

const props = {
  prefix: null
}
let propertyList = [];
Object.keys(propertyObj).forEach(key => {
	return propertyList.push(`**\`${key}\`** - **\`${propertyObj[key]}\`**`);
});
propertList = propertyList.join(",\n");

module.exports = {
	name: 'edit-config',
	description: 'Changes Bot Configuration for the Specfic Guild the Command was Used In.',
	category: 'Guild',
	usage: '(Property) [Value]',
	aliases: [],
	cooldown: "3s",
	guildOnly: true,
	permissions: ['MANAGE_SERVER'],
	execute(client, message, args) {
		let property;
		if (args[0]) {
			property = args[0].toLowerCase();
		}
		const properties = client.makeEmbed({
				title: 'Available Properties',
				color: Color.Success,
				description: propertyList
			},
			message
		);
		if (!property) return message.channel.send(properties);
		if (props[property] === undefined) {
			const err = client.makeEmbed({
					title: 'ERROR...',
					color: Color.Error,
					description: 'Unknown Property.\nUse **`edit-config`** Command without any Arguments for a List of Properties.'
				},
				message
			);
			return message.channel.send(err);
		}
		if (property === 'prefix') {
			let params = args;
			params = params.slice(1, args.length);
			if (!params[0])
				return message.channel.send(
					client.makeEmbed({
							color: Color.Error,
							title: 'ERROR...',
							description: "New Prefix wasn't Specified."
						},
						message
					)
				);

			if (params.length > 1)
				return message.channel.send(
					client.makeEmbed({
							color: Color.Error,
							title: 'ERROR...',
							description: 'Prefix May not Contain Spaces.'
						},
						message
					)
				);
			let OldPrefix = GuildCfg.getSetting(message.guild.id, 'Prefix')[0] || [client.config.Bot.Prefix];

			OldPrefix = OldPrefix.toLowerCase();
			if (
				params[0] === OldPrefix ||
				(params[0] === 'reset' && OldPrefix === client.config.Bot.Prefix)
			)
				return message.channel.send(
					client.makeEmbed({
							color: Color.Error,
							title: 'ERROR...',
							description: 'Prefix May not be The Same as the Current One.'
						},
						message
					)
				);
			if (params[0].toLowerCase() === 'reset' || params[0] === client.config.Bot.Prefix) {
				GuildCfg.editSetting(message.guild.id, 'Prefix', [client.config.Bot.Prefix]);
				return message.channel.send(
					client.makeEmbed({
							title: 'Prefix Reset',
							color: Color.Success,
							description: 'The Prefix Has been Reset Back to Normal. It now is "**`?`**".'
						},
						message
					)
				);
			}
			if (params[0].length > 5)
				return message.channel.send(
					client.makeEmbed({
							color: Color.Error,
							title: 'ERROR...',
							description: 'Prefix Can be At Max 5 Charaters.'
						},
						message
					)
				);
			else {
				GuildCfg.editSetting(message.guild.id, 'Prefix', [params[0]]);
				return message.channel.send(
					client.makeEmbed({
							title: 'Prefix Changed',
							color: Color.Success,
							description: 'The Prefix Has been Changed from "**`' +
								OldPrefix +
								'`**" to "**`' +
								params[0].toLowerCase() +
								'`**".'
						},
						message
					)
				);
			}
		}
	}
};