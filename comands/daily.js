const discord = require("discord.js");
const ms = require("parse-ms")
module.exports.run = async (_bot, message, _args, data) => {
    const errembed = new discord.MessageEmbed()
    const embed = new discord.MessageEmbed()
    let timeout = 86400000
    let award = 4000
    if (data.moneys[message.guild.id][message.author.id].daily != undefined && timeout - (Date.now() - data.moneys[message.guild.id][message.author.id].daily) > 0) {
        let time = ms(timeout - (Date.now() - data.moneys[message.guild.id][message.author.id].daily));
        let timefix = time.hours == 0 ? time.minutes + "м " + time.seconds + "с" : time.hours + "ч " + time.minutes + "м " + time.seconds + "с"
        errembed.setDescription("🛑 <@" + message.author.id + ">, вы уже забрали ежедневную награду!\nСоберите следующую через " + timefix).setColor("#c96c2e")
        return message.channel.send(errembed)
    } else {
        data.moneys[message.guild.id][message.author.id].daily = Date.now()
        data.moneys[message.guild.id][message.author.id].karman = data.moneys[message.guild.id][message.author.id].karman + award
        embed.setDescription("<a:Yes:721315330496135278> Вы собрали вашу ежедневную награду в размере " + award + " 💵").setColor("#c96c2e")
    }
    message.channel.send(embed)
}
module.exports.help = {
    name: "daily",
    type: 5,
    des: "забрать ежедневную награду",
    synt: "daily",
    test: false
};