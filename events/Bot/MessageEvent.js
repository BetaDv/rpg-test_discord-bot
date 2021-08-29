const Color = require('../../data/embeds.js');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const GuildCfg = require('../../utils/configManager.js');
module.exports = {
	name: 'message',
	async execute(message, client) {
		if (message.author.bot === true) return;

		let PREFIXES = GuildCfg.getSetting(message.guild.id, `Prefix`) || [
			client.config.Bot.Prefix
		];
		/*
		 * PREFIXES.push("<@827862647772020776>");
		 * PREFIXES.push("<@!827862647772020776>");
		 */

		let BOT_PREFIX;

		PREFIXES.forEach(thisPrefix => {
			if (!message.content.toLowerCase().startsWith(thisPrefix)) return;
			BOT_PREFIX = thisPrefix;
		});
		if (!BOT_PREFIX) return;
		BOT_PREFIX = BOT_PREFIX.toLowerCase();

		const args = message.content
			.slice(BOT_PREFIX.length)
			.trim()
			.split(' ');
		const commandName = args.shift().toLowerCase();
		const command =
			client.commands.get(commandName) ||
			client.commands.find(
				cmd => cmd.aliases && cmd.aliases.includes(commandName)
			);
		if (!command) return;
		if (command.guildOnly) {
			if (!message.guild) return;
		}
		if (command.devOnly) {
			if (
				message.author.id !==
				client.config.Main.Owners.find(element => element === message.author.id)
			) {
				let NoOwner = client.makeEmbed(
					{
						description: 'You Are not an Owner to be able to Run This Command.',
						color: Color.Error,
						title: 'ERROR...'
					},
					message
				);
				return message.channel.send(NoOwner);
			}
		}
		if (command.permissions) {
			let perms = client.makeEmbed(
				{
					title: 'ERROR...',
					color: Color.Error,
					descriptions: `You are Missing Required Permissions.\nRequired Permissions: **\`${command.permissions.join(
						'`**, **`'
					)}\`**`
				},
				message
			);
			let send = () => {
				message.channel.send(perms);
			};
			if (!message.member.hasPermission(command.permissions)) return send();
		}
		if (command.botPermissions) {
			let perms = client.makeEmbed(
				{
					title: 'ERROR...',
					color: Color.Error,
					descriptions: `The Bot is Missing Required Permissions.\nRequired Permissions: **\`${command.botPermissions.join(
						'`**, **`'
					)}\`**`
				},
				message
			);
			let send = () => {
				message.channel.send(perms);
			};
			if (!message.guild.me.hasPermission(command.permissions)) return send();
		}
		if (!message.guild.me.hasPermission('EMBED_LINKS'))
			return message.channel.send(
				'I Do Not have the Permission to Send Embeds. \nTo Avoid this Error Please grant me the **`EMBED_LINKS`** Permission.'
			);

		if (!command.cooldown) command.cooldown = '2s';
		const ms = require('ms');
		const now = Date.now();
		let cooldownAmount = ms(command.cooldown);

		if (client.db.has('Cooldown_' + command.name + '_' + message.author.id)) {
			const expirationTime =
				client.db.get('Cooldown_' + command.name + '_' + message.author.id) +
				cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = expirationTime - now;
				return message.channel.send(
					client.makeEmbed(
						{
							title: 'ERROR...',
							color: Color.Error,
							description: `Please wait ${ms(
								timeLeft,
								{ long: true,
								}
							)} before reusing the \`${command.name}\` command.`
						},
						message
					)
				);
			}
		}

		client.db.set('Cooldown_' + command.name + '_' + message.author.id, now);
		setTimeout(
			() =>
				client.db.delete('Cooldown_' + command.name + '_' + message.author.id),
			cooldownAmount
		);

		try {
			command.execute(client, message, args);
		} catch (error) {
			console.error(error);
			const errore = client.makeEmbed(
				{
					title: 'ERROR...',
					color: Color.Error,
					description: `Something went wrong whilst trying to Run "${
						command.name
					}".`
				},
				message
			);
			return message.channel.send(errore);
		}
	}
};
