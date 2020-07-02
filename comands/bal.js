const discord = require("discord.js")
module.exports.run = (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    let money = data.moneys[message.guild.id][message.author.id]
    var user = args[0] != undefined ? message.guild.members.cache.get(args[0].replace(/\D+/g, "")) : { username: message.author.username }
    embed.setAuthor(message.author.username, message.author.avatarURL()).setDescription("Личное хранилище ").addField("В кармане", money.karman + " 💵", true).addField("Депозит", money.bank + " 💵", true).addField("В сокровищнице", money.global + " 💵", true).setFooter(bot.user.username).setTimestamp()
    message.channel.send(embed)
}
module.exports.help = {
    name: "bal",
    type: 5,
    des: "узнать баланс участника",
    synt: "bal <@юзер>",
    test: true
};