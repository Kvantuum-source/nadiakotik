const discord = require("discord.js")
module.exports.run = (bot, message, args, data) => {
    var text
    var res
    const errembed = new discord.MessageEmbed()
    const embed = new discord.MessageEmbed()
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
    let status = Math.floor(Math.random() * 101)
    if (status < 98 && status > 2) {
        text = `\`\`\`css\n『${status - 3}』『${status - 2}』『${status - 1}』 [${status}] 『${status + 1}』『${status + 2}』『${status + 3}』\`\`\``
    } else if (status == 98) {
        text = `\`\`\`css\n『${status - 4}』『${status - 3}』『${status - 2}』『${status - 1}』 [${status}] 『${status + 1}』『${status + 2}』\`\`\``
    } else if (status == 99) {
        text = `\`\`\`css\n『${status - 5}』『${status - 4}』『${status - 3}』『${status - 2}』『${status - 1}』 [${status}] 『${status + 1}』\`\`\``
    } else if (status == 100) {
        text = `\`\`\`css\n『${status - 6}』『${status - 5}』『${status - 4}』『${status - 3}』『${status - 2}』『${status - 1}』 [${status}]\`\`\``
    } else if (status == 2) {
        text = `\`\`\`css\n『${status - 2}』『${status - 1}』 [${status}] 『${status + 1}』『${status + 2}』『${status + 3}』『${status + 4}』\`\`\``
    } else if (status == 1) {
        text = `\`\`\`css\n『${status - 1}』 [${status}] 『${status + 1}』『${status + 2}』『${status + 3}』『${status + 4}』『${status + 5}』\`\`\``
    } else if (status == 0) {
        text = `\`\`\`css\n[${status}] 『${status + 1}』『${status + 2}』『${status + 3}』『${status + 4}』『${status + 5}』『${status + 6}』\`\`\``
    }
    if (status >= 70 && status < 90) {
        res = 2
        data.moneys[message.guild.id][message.author.id].karman = data.moneys[message.guild.id][message.author.id].karman + (Math.floor(bet * 2))
    } else if (status >= 90 && status != 100) {
        res = 4
        data.moneys[message.guild.id][message.author.id].karman = data.moneys[message.guild.id][message.author.id].karman + (Math.floor(bet * 4))
    } else if (status == 100) {
        res = 10
        data.moneys[message.guild.id][message.author.id].karman = data.moneys[message.guild.id][message.author.id].karman + (Math.floor(bet * 10))
    }
    data.moneys[message.guild.id][message.author.id].karman = data.moneys[message.guild.id][message.author.id].karman - bet
    if (status < 70) {
        embed.setTitle("**" + message.author.username + "#" + message.author.discriminator + "** Может повезет в следующий раз").setDescription("\n\n" + text).setFooter(bot.user.username).setTimestamp().setColor("#c96c2e")
    } else if (status >= 70) {
        embed.setTitle(message.author.username + "#" + message.author.discriminator + " выиграл(а): " + Math.floor(bet * res) + " 💵").setDescription("\n\n" + text).setFooter(bot.user.username).setTimestamp().setColor("#c96c2e")
    }
    message.channel.send(embed)
}
module.exports.help = {
    name: "br",
    type: 5,
    des: "Бот выдаёт случайное число от 0 до 100. Если выпадает число больше 70, ваша ставка умножится на 2, если больше 90, то на 4, если выпадает число 100, то ставка умножается на 10",
    synt: "br <ставка>",
    test: false
};