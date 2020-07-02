const discord = require("discord.js");
const ms = require("parse-ms")
module.exports.run = async (_bot, message, _args, data) => {
    const errembed = new discord.MessageEmbed()
    const embed = new discord.MessageEmbed()
    let timeout = 180000
    let award = Math.round(Math.random() * 50)
    if (data.moneys[message.guild.id][message.author.id].beg != undefined && timeout - (Date.now() - data.moneys[message.guild.id][message.author.id].beg) > 0) {
        let time = ms(timeout - (Date.now() - data.moneys[message.guild.id][message.author.id].beg));
        let timefix = time.hours == 0 ? time.minutes + "м " + time.seconds + "с" : time.hours + "ч " + time.minutes + "м " + time.seconds + "с"
        errembed.setDescription("🛑 <@" + message.author.id + ">, вы уже выпрашивали награду!\nВыпросите следующую через " + timefix).setColor("#c96c2e")
        return message.channel.send(errembed)
    } else {
        data.moneys[message.guild.id][message.author.id].beg = Date.now()
        data.moneys[message.guild.id][message.author.id].karman = data.moneys[message.guild.id][message.author.id].karman + award
        embed.setDescription("<a:Yes:721315330496135278> Вы выпросили награду в размере " + award + " 💵").setColor("#c96c2e")
    }
    message.channel.send(embed)
}
module.exports.help = {
    name: "beg",
    type: 5,
    des: "выпросить награду",
    synt: "beg",
    test: false
};