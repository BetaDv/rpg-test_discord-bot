const {
    MessageEmbed
} = require("discord.js");
const Color = require("../../data/embeds.js");

module.exports = {
    name: 'eval',
    description: 'Evaluates Node.JS Code.',
    aliases: ["evaluate"],
    category: "Developer",
    usage: '[Code]',
    devOnly: true,
    permissions: [],
    guildOnly: true,
    execute(client, message, args) {
            try {
                function clean(text) {
                    if (typeof (text) === "string")
                        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                    else
                        return text;
                }
                if (!args) {
                    let error = client.makeEmbed({
                        title: "Error...",
                        color: Color.Error,
                        description: "No code to evaluate specified.",
                }, message)
                return message.channel.send(error);
            }

                const code = args.join(" ");
                let evaled = eval(code);

                if (typeof evaled !== "string")
                    evaled = require("util").inspect(evaled);
                let result = client.makeEmbed({
                    title: "Code Evaluated",
                    color: Color.Success,
                    description: clean(evaled),
            }, message)
                message.channel.send(result);
            } catch (err) {
                let embed = client.makeEmbed({
                    title: "Error...",
                    color: Color.Error,
                    description: ` \`\`\`xl\n${clean(err)}\n\`\`\``,
            }, message)
                console.log(clean(err))
                return message.channel.send(embed);
                
            }
    }
}