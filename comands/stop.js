const discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, data) => {
    const errembed = new discord.MessageEmbed()
    const embed = new discord.MessageEmbed()
    if (!bot.dispatcherguild[message.guild.id].songs[0]) {
        errembed.setDescription("🛑 <@" + message.author.id + ">, сейчас я не играю никакой музыки").setColor("#c96c2e")
        return message.channel.send(errembed)
    } else {
        bot.dispatcherguild[message.guild.id].songs = []
        bot.dispatcherguild[message.guild.id].dispatcher.end()
        embed.setDescription("🎵 Проигрывание треков было остановлено").setColor("#c96c2e")
        message.channel.send(embed)
    }
}
module.exports.help = {
    name: "stop",
    type: 2,
    des: "остановить проигрывание музыки",
    synt: "stop",
    test: false
};
