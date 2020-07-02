const discord = require("discord.js");
module.exports.run = async (bot, message, args, data) => {
    const errembed = new discord.MessageEmbed()
    const embed = new discord.MessageEmbed()
    var roulettebet = [
        "『1.5』", "『1.7』", "『2.4』", "『0.2』", "『1.2』", "『0.1』", "『0.3』", "『0.5』"
    ]
    var simbol = [
        "↖", "↑", "↗", "←", "→", "↙", "↓", "↘"
    ]
    errembed.setDescription("Чтобы узнать подробнее напишите ``" + data.configurations[message.guild.id].prefix + "help " + module.exports.help.name + "``").setColor("#c96c2e")
    if (!args[0]) return message.channel.send(errembed)
    if (args[0] == "all") { args[0] = data.moneys[message.guild.id][message.author.id].karman }
    let bet = Number(args[0])
    errembed.setDescription("🛑 <@" + message.author.id + ">, ставка должна быть положительным числом!").setColor("#c96c2e")
    if (!bet || isNaN(bet) == true) return message.channel.send(errembed)
    errembed.setDescription("🛑 <@" + message.author.id + ">, минимальная ставка равна 100 💵!").setColor("#c96c2e")
    if (bet < 100) return message.channel.send(errembed)
    errembed.setDescription("🛑 <@" + message.author.id + ">, у вас недостаточно денег на счету!").setColor("#c96c2e")
    if (data.moneys[message.guild.id][message.author.id].karman < bet) return message.channel.send(errembed)
    let status = Math.floor(Math.random() * roulettebet.length)
    let factor = Number(roulettebet[status].replace(/[『』]/g, ""))
    data.moneys[message.guild.id][message.author.id].karman = data.moneys[message.guild.id][message.author.id].karman - bet
    data.moneys[message.guild.id][message.author.id].karman = data.moneys[message.guild.id][message.author.id].karman + (Math.floor(bet * factor))
    embed.setTitle(message.author.username + "#" + message.author.discriminator + " выиграл(а): " + Math.floor(bet * factor) + " 💵").setDescription("```『1.5』 『1.7』 『2.4』\n\n『0.2』   " + simbol[status] + "    『1.2』\n\n『0.1』 『0.3』 『0.5』```").setFooter(bot.user.username).setTimestamp().setColor("#c96c2e")
    message.channel.send(embed)
}
module.exports.help = {
    name: "well",
    type: 5,
    des: "играть в колесо фортуны",
    synt: "well <ставка/all>",
    test: false
};