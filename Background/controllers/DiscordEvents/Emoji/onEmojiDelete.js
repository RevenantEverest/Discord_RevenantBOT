const Discord = require('discord.js');
const logSettingsController = require('../../logSettingsController');

module.exports = async (bot, emoji) => {
    logSettingsController.getLogSettings(emoji.guild.id, handleLogEmbed);

    async function handleLogEmbed(settings) {
        if(!settings.enabled) return;
        
        let permissions = new Discord.Permissions(bot.channels.get(settings.channel_id).permissionsFor(bot.user).bitfield);
        if(!permissions.has("SEND_MESSAGES")) return;
        if(!permissions.has("VIEW_AUDIT_LOG")) return;

        let audit = await bot.guilds.get(emoji.guild.id).fetchAuditLogs();
        let executor = audit.entries.array()[0].executor;

        let embed = new Discord.RichEmbed();
        embed
        .setColor(0xff0000)
        .setAuthor(`Emoji Deleted by ${executor.username}#${executor.discriminator}`, executor.avatarURL ? executor.avatarURL : "https://i.imgur.com/CBCTbyK.png")
        .setDescription(`**Name**: ${emoji.name}`)
        .setFooter(`Emoji ID: ${emoji.id}`)

        bot.channels.get(settings.channel_id).send(embed);
    };
};