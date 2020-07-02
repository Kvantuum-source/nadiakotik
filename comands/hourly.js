const discord = require("discord.js");
const ms = require("parse-ms")
module.exports.run = async (_bot, message, _args, data) => {
    const errembed = new discord.MessageEmbed()
    const embed = new discord.MessageEmbed()
    let timeout = 3600000
    let award = 200
    if (data.moneys[message.guild.id][message.author.id].hourly != undefined && timeout - (Date.now() - data.moneys[message.guild.id][message.author.id].hourly) > 0) {
        let time = ms(timeout - (Date.now() - data.moneys[message.guild.id][message.author.id].hourly));
        let timefix = time.hours == 0 ? time.minutes + "м " + time.seconds + "с" : time.hours + "ч " + time.minutes + "м " + time.seconds + "с"
        errembed.setDescription("🛑 <@" + message.author.id + ">, вы уже забрали часовую награду!\nСоберите следующую через " + timefix).setColor("#c96c2e")
        return message.channel.send(errembed)
    } else {
        data.moneys[message.guild.id][message.author.id].hourly = Date.now()
        data.moneys[message.guild.id][message.author.id].karman = data.moneys[message.guild.id][message.author.id].karman + award
        embed.setDescription("<a:Yes:721315330496135278> Вы собрали вашу часовую награду в размере " + award + " 💵").setColor("#c96c2e")   
    }
    message.channel.send(embed)
}
module.exports.help = {
    name: "hourly",
    type: 5,
    des: "забрать часовую награду",
    synt: "hourly",
    test: false
};