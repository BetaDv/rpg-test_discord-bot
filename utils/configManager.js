const db = require("quick.db");
const Config = require("../data/config.js");
const initGuild = (defaults = Config.Server, guild) => {
  if(db.has(`Config_${guild}`)) return;
  db.set(`Config_${guild}`, defaults);
}

const editSetting = (guild, setting, value) => {
  if(db.has(`Config_${guild}.${setting}`) === false) initGuild(Config.Server, guild);
  db.set(`Config_${guild}.${setting}`, value);
}

const getSetting = (guild, setting) => {
  if(db.has(`Config_${guild}.${setting}`) === false) initGuild(Config.Server, guild);
  return db.get(`Config_${guild}.${setting}`);
}

module.exports = { initGuild, getSetting, editSetting }