const Color = require("../../data/embeds.js");
const {
	MessageEmbed
} = require("discord.js");

module.exports = {
	name: 'help',
	usage: '(Command)',
	aliases: ['commands'],
	description: "Shows Informations about a Specific Command / Sends a Command List.",
	category: 'Bot',
	cooldown: "3s",
	execute(client, message, args) {

		let items = client.commands.array()

		let commandsArray = items.reduce(function (r, item) {
			let current = r.hash[item.category];

			if (!current) {
				current = r.hash[item.category] = {
					category: item.category,
					items: []
				};

				r.arr.push(current);
			}

			current.items.push({
				item
			});

			return r;
		}, {
			hash: {},
			arr: []
		}).arr;

		const CommandsEmbed = client.makeEmbed({
			title: "Command List",
			color: Color.Success,
			thumbnail: client.user.displayAvatarURL({
				format: "png"
			})
		}, message);
		commandsArray.forEach(cmd => {
			let commandss = [];
			cmd.items.forEach(a => {
				commandss.push(a.item.name)
			});
			CommandsEmbed.addField(`**\`${cmd.category}\`** **[${cmd.items.length}]**`, `**\`${commandss.join("`**, **`")}\`**`)
		});
		if (args[0]) {
			let command = args[0];
			const GuildPrefix = client.db.get("Config_" + message.guild.id + ".Prefix") || ".";

			if (client.commands.has(command)) {
				let commandObject = client.commands.get(command);
				let infoText = `Category:** \`${
					commandObject.category
				}\`**`;
				let mainText = `Command:** \`${commandObject.name}\`**\nDescription:** \`${commandObject.description}\`**`;
				if (commandObject.aliases && commandObject.aliases.length !== 0)
					mainText =
					mainText +
					`\nAliases:** \`${commandObject.aliases.join('`**, **`')}\`**`;
				if (commandObject.permissions && commandObject.permissions.length !== 0)
					infoText =
					infoText +
					`\nRequired Permissions:** \`${commandObject.permissions.join('`**, **`')}\`**`;
				if (commandObject.botPermissions && commandObject.botPermissions.length !== 0)
					infoText =
					infoText +
					`\nRequired Permissions for Bot:** \`${commandObject.botPermissions.join('`**, **`')}\`**`;
				if (commandObject.devOnly && commandObject.devOnly)
					infoText =
					infoText +
					`\nIs Developer Only:** \`Yes\`**`;
				mainText = mainText + `\nUsage:** \`${GuildPrefix}${commandObject.name}${(
				commandObject.usage) ? " " + commandObject.usage : ""
			}\`**`
				infoText =
					infoText +
					`\nCommand Can be Used in DMs:** \`${(commandObject.guildOnly && commandObject.guildOnly === true) ? "No" : "Yes"}\`**`;
				let embed1 = client.makeEmbed({
					title: `Command Info - ${commandObject.name.toUpperCase()}`,
					description: mainText,
					color: Color.Success,
					thumbnail: client.user.displayAvatarURL({
						format: "png"
					}),
				}, message)
				embed1.addField("Other Info", infoText)
				return message.channel.send(embed1);
			} else
				return message.channel.send(client.makeEmbed({
					title: "ERROR...",
					color: Color.Error,
					description: "Specified Command was Not Found."
				}, message))

		}
		message.channel.send(CommandsEmbed);
	}
};