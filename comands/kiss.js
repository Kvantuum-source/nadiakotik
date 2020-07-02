const discord = require("discord.js");
const fs = require("fs");
const request = require('request');
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    const errembed = new discord.MessageEmbed()
    errembed.setDescription("Чтобы узнать подробнее напишите ``" + data.configurations[message.guild.id].prefix + "help " + module.exports.help.name + "``")
    if (!args[0]) return message.channel.send(errembed)
    errembed.setDescription("🛑 <@"+message.author.id+">, пользователь не найден!").setColor("#c96c2e")
    let user = message.guild.members.cache.get(args[0].replace(/\D+/g,""))
    if (!user) return message.channel.send(errembed)
    request("https://nekos.life/api/v2/img/kiss", (err, res, body) => {
        let json = JSON.parse(body)
        embed.setTitle(message.author.username +" " +"целует" +" " +user.user.username +" " +":heart:")
            .setColor("#c96c2e")
            .setFooter(message.guild.name)
            .setImage(json.url)
        message.channel.send(embed)
    })
}
module.exports.help = {
    name: "kiss",
    type: 3,
    des: "поцеловать другого котика",
    synt: "kiss <юзер>",
    test: false
};
