const Config = require("./data/config.js");
const db = require("quick.db");
const Discord = require("discord.js");

const client = new Discord.Client({
    disableMentions: "everyone"
});

client.commands = new Discord.Collection();
client.config = Config;
client.makeEmbed = require("./utils/makeEmbed.js");
client.db = db;
client.userManager = require("./utils/userManager.js");
client.configManager = require("./utils/configManager.js");

require('./handlers/Main.js')(client);

client.login(Config.Bot.Token);