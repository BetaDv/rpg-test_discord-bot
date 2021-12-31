module.exports = (client) => {
  ["Event", "Command", "Hosting"].forEach(file => {
    require("./" + file + "Handler.js")(client);
  });
}
