const fs = require("fs");

module.exports = (client) => {
  const folders = fs.readdirSync(process.cwd() + "/commands/");

  for (const files of folders) {
    const folder = fs.readdirSync(`${process.cwd()}/commands/${files}`)
    .filter(file => file.endsWith('.js'));

    for (const commands of folder) {
      const command = require(`../commands/${files}/${commands}`);
      client.commands.set(command.name, command);
    }
  }
}