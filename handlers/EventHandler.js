const fs = require("fs");

module.exports = (client) => {
  const folders = fs.readdirSync(process.cwd() + "/events/");

  for (const files of folders) {
    const folder = fs.readdirSync(`${process.cwd()}/events/${files}`)
      .filter(file => file.endsWith('.js'));

    for (const events of folder) {
      const event = require(`../events/${files}/${events}`);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client))
      } else {
        client.on(event.name, (...args) => event.execute(...args, client))
      }
    }
  }
}