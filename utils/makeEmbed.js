const { MessageEmbed } = require("discord.js");

module.exports = (embedData = {}, message) => {
  let e = embedData;
  let embed = new MessageEmbed().setFooter("Requested by " + message.author.tag + "!", message.author.displayAvatarURL({ format: "png", dynamic: true }));
  if(embedData.title) embed.setTitle(e.title)
  if(embedData.description) embed.setDescription(e.description);
  if(embedData.color) embed.setColor(e.color);
  if(embedData.thumbnail) embed.setThumbnail(e.thumbnail);
  if(embedData.image) embed.setImage(e.image)
  return embed;
}