const discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    const errembed = new discord.MessageEmbed()
    const errembed1 = new discord.MessageEmbed()
    errembed1.setDescription("🛑 <@"+message.author.id+">, громкость музыки может быть от ``0`` до ``10``").setColor("#c96c2e")
    errembed.setDescription("🛑 <@"+message.author.id+">, сейчас я не играю никакой музыки").setColor("#c96c2e")
    if (!args[0]) {
        embed.setDescription("🎵 Громкость проигрывателя - ``"+bot.dispatcherguild[message.guild.id].volume+"``").setColor("#c96c2e")
        return message.channel.send(embed)
    } else {
        if (parseInt(args[0]) < 0 || parseInt(args[0]) > 10 || isNaN(parseInt(args[0])) == true) return message.channel.send(errembed1)
        if (!bot.dispatcherguild[message.guild.id].songs[0]) {
            return message.channel.send(errembed)
        } else {
            bot.dispatcherguild[message.guild.id].volume = parseInt(args[0])
            bot.dispatcherguild[message.guild.id].dispatcher.setVolumeLogarithmic(parseInt(args[0]) / 5);
            embed.setDescription("🎵 Громкость проигрывателя установлена на ``"+bot.dispatcherguild[message.guild.id].volume+"``").setColor("#c96c2e")
            return message.channel.send(embed)
        }
    }
}
module.exports.help = {
    name: "volume",
    type: 2,
    des: "установить громкость проигрывателя",
    synt: "volume <0-10>",
    test: false
};