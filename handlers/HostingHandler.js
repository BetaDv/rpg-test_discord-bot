const express = require("express");

module.exports = (client) => {
 const app = express();
 app.listen();
 app.get("/", (req, res) => {
   res.json({ success: true, botOnline: true})
 })
}