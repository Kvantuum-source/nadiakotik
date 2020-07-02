const discord = require("discord.js")
module.exports.run = (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    const errembed = new discord.MessageEmbed()
    errembed.setDescription("Чтобы узнать подробнее напишите ``" + data.configurations[message.guild.id].prefix + "help " + module.exports.help.name + "``").setColor("#c96c2e")
    if (!args[0] || !args[1]) return message.channel.send(errembed)
    var user = message.guild.members.cache.get(args[0].replace(/\D+/g, ""))
    var money = parseInt(args[1])
    errembed.setDescription("🛑 <@" + message.author.id + ">, ставка должна быть положительным числом!").setColor("#c96c2e")
    if (!money || isNaN(money) == true) return message.channel.send(errembed)
    errembed.setDescription("🛑 <@" + message.author.id + ">, пользователь не найден!").setColor("#c96c2e")
    if (!user) return message.channel.send(errembed)
    errembed.setDescription("🛑 <@" + message.author.id + ">, у вас недостаточно денег на счету!").setColor("#c96c2e")
    if (data.moneys[message.guild.id][message.author.id].karman < money) return message.channel.send(errembed)
    embed.setAuthor(message.author.username, message.author.avatarURL()).setDescription("").setFooter(bot.user.username).setTimestamp().setColor("#c96c2e")
    message.channel.send(embed)
}
module.exports.help = {
    name: "pay",
    type: 5,
    des: "передать участнику монетки",
    synt: "pay <@юзер> <монетки/all>",
    test: true
};