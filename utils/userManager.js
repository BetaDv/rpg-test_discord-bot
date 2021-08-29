const db = require("quick.db")
const defOps = {
    Inventory: [{
        name: "Free Pouch"
    }],
    Stage: 1,
    Coins: 25,
    TrainingPoints: 1,
    DungeonsCompleted: 0,
    BossesBeaten: 0,
}

const initUser = (user, defaults = defOps) => {
    db.set(`User_${user}`, defaults);
}

const editOpt = (user, setting, value) => {
    if (db.has(`User_${user}.${setting}`) === false) initUser(user);
    db.set(`User_${user}.${setting}`, value);
}

const pushTo = (user, setting, value) => {
    if (db.has(`User_${user}.${setting}`) === false) initUser(user);
    db.push(`User_${user}.${setting}`, value);
}


const getFull = (user) => {
    if (db.has(`User_${user}`) === false) initUser(user);
    return db.get(`User_${user}`);
}

const hasUser = (user) => {
    return (db.has(`User_${user}`)) ? true : false
}

const getOpt = (user, setting) => {
    if (db.has(`User_${user}.${setting}`) === false) initUser(user);
    return db.get(`User_${user}.${setting}`);
}

module.exports = {
    initUser,
    getOpt,
    editOpt,
    getFull,
    hasUser,
    pushTo,
    defOps
}