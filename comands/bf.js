const discord = require("discord.js")
module.exports.run = (bot, message, args, data) => {
    const errembed = new discord.MessageEmbed()
    const embed = new discord.MessageEmbed()
    let betlist = [{
        action:"h",
        url:"https://cdn.glitch.com/24d4d2ad-fc58-4607-8a22-71d1474495a0%2F35c4f669-1d24-4d7d-b9c7-2471cc01b79b.image.png"
    },
    {
        action:"t",
        url:"https://cdn.glitch.com/24d4d2ad-fc58-4607-8a22-71d1474495a0%2Fc4522b2c-64e2-4057-9274-9278d1bc39c5.image.png"
    }]
    errembed.setDescription("Чтобы узнать подробнее напишите ``" + data.configurations[message.guild.id].prefix + "help " + module.exports.help.name + "``").setColor("#c96c2e")
    if (!args[0] || !args[1]) return message.channel.send(errembed)
    if (args[1] != "t" && args[1] != "h") return message.channel.send(errembed)
    if (args[0] == "all") { args[0] = data.moneys[message.guild.id][message.author.id].karman }
    let bet = Number(args[0])
    errembed.setDescription("🛑 <@" + message.author.id + ">, ставка должна быть положительным числом!").setColor("#c96c2e")
    if (!bet || isNaN(bet) == true) return message.channel.send(errembed)
    errembed.setDescription("🛑 <@" + message.author.id + ">, минимальная ставка равна 100 💵!").setColor("#c96c2e")
    if (bet < 100) return message.channel.send(errembed)
    errembed.setDescription("🛑 <@" + message.author.id + ">, у вас недостаточно денег на счету!").setColor("#c96c2e")
    if (data.moneys[message.guild.id][message.author.id].karman < bet) return message.channel.send(errembed)
    let status = Math.floor(Math.random() * betlist.length)
    let truefalse = betlist[status].action == args[1] ? true : false
    data.moneys[message.guild.id][message.author.id].karman = data.moneys[message.guild.id][message.author.id].karman - bet
    switch (truefalse) {
        case true:
            embed.setDescription("**" + message.author.username + "#" + message.author.discriminator + "** Вы угадали, ваша награда - " + Math.floor(bet * 2) + " 💵").setImage(betlist[status].url).setFooter(bot.user.username).setTimestamp().setColor("#c96c2e")
            message.channel.send(embed)
            break;
        case false:
            embed.setDescription("**" + message.author.username + "#" + message.author.discriminator + "** Может повезет в следующий раз").setImage(betlist[status].url).setFooter(bot.user.username).setTimestamp().setColor("#c96c2e")
            message.channel.send(embed)
            break;
    }
}
module.exports.help = {
    name: "bf",
    type: 5,
    des: "бросить монету со ставкой",
    synt: "bf <ставка> <t/h>",
    test: false
};