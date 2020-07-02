const discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, data) => {
    const errembed = new discord.MessageEmbed()
    const embed = new discord.MessageEmbed()
    if (!bot.dispatcherguild[message.guild.id].songs[0]) {
        errembed.setDescription("🛑 <@" + message.author.id + ">, сейчас я не играю никакой музыки").setColor("#c96c2e")



        return message.channel.send(errembed)
    } else {
        embed.setDescription("🎵 Был пропущен трек ``"+bot.dispatcherguild[message.guild.id].songs[0].title+"``, заказанный "+bot.dispatcherguild[message.guild.id].songs[0].by).setColor("#c96c2e")
        bot.dispatcherguild[message.guild.id].dispatcher.end()
        message.channel.send(embed)
    }
}
module.exports.help = {
    name: "skip",
    type: 2,
    des: "пропустить трек",
    synt: "skip",
    test: false
};
