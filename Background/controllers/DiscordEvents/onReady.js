const Discord = require('discord.js');
const chalk = require('chalk');
const moment = require('moment');

const guildsController = require('../guildsController');

module.exports = async (bot) => {

    guildsController.checkGuilds(bot);

    if(process.env.ENVIRONMENT === "DEV") 
        return console.log(chalk.hex('#00ff00')('[LOG]') +' Background Processes Ready');

    let embed = new Discord.RichEmbed();
    embed.setColor(0xff9900).setTitle("Background Processes Ready").setFooter(moment().format("LLLL") + " EST");

    bot.channels.get("543862697742172179").send(embed);
};