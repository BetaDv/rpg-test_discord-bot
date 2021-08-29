const express = require("express");

module.exports = (client) => {
 const app = express();
 app.listen();
 app.get("/", (req, res) => {
   res.json({ success: true, botOnline: true})
 })
}

// THIS WILL BE USEFUL ONLY IF YOU WILL HOST YOUR BOT ON WEBSITES SUCH AS REPL.IT / GLITCH WHICH MAY REQUIRE PINGERS FOR IT TO BE 24/7
