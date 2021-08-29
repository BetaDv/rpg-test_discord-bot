const Color = require("../../data/embeds.js");
const openables = require("../../data/openables.js");

module.exports = {
  name: 'daily',
  description: "Get a Loot Pouch every 12 Hours.",
  cooldown: "12h",
  category: "Gameplay",
  execute(client, message, args) {
    client.userManager.pushTo(message.author.id, "Inventory", openables.dailyPouch);

    return message.channel.send(client.makeEmbed({
      title: "Claimed Daily",
      color: Color.Success,
      description: "You just claimed your Daily free Loot Pouch!",
    }, message));
  }
};