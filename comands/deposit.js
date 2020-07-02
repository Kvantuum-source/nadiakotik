const discord = require("discord.js")
module.exports.run = (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    if (args[0] == "all") { args[0] = data.moneys[message.guild.id][message.author.id].karman }
    let money = parseInt(args[0])
    if (money <= 0 || money == NaN) return message.channel.send(errembed)
    embed.setAuthor(message.author.username, message.author.avatarURL()).setDescription("Личное хранилище").addField("В кармане", money.karman + " 💵", true).addField("Депозит", money.bank + " 💵", true).addField("В сокровищнице", money.global + " 💵", true).setFooter(bot.user.username).setTimestamp()
    message.channel.send(embed)
}
module.exports.help = {
    name: "deposit",
    type: 5,
    des: "положить под дипозит монетки",
    synt: "deposit <монеты/all>",
    test: true
};