require('dotenv').config();

const Discord_Bot = require('./Discord/Discord_Bot');

Discord_Bot.login(process.env.DISCORD_KEY);

module.exports = require('./app');
