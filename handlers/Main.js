module.exports = (client) => {
  ["Event", "Command", "Hosting"].forEach(e => {
    require("./" + e + "Handler.js")(client);
  });
}