const discord = require("discord.js");
const fs = require("fs");
const request = require('request');
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    const errembed = new discord.MessageEmbed()
    errembed.setDescription("Чтобы узнать подробнее напишите ``" + data.configurations[message.guild.id].prefix + "help " + module.exports.help.name + "``")
    if (!args[0]) return message.channel.send(errembed)
    let user = message.guild.members.cache.get(args[0].replace(/\D+/g,""))
    if (!user) return message.channel.send(errembed)
    request("https://nekos.life/api/v2/img/pat", (err, res, body) => {
        let json = JSON.parse(body);
        embed.setTitle(message.author.username +" " +"погладил(а)" +" " +user.user.username +" " +":relaxed:")
            .setFooter(message.guild.name)
            .setColor("#c96c2e")
            .setImage(json.url);
        message.channel.send(embed)
    })
}
module.exports.help = {
    name: "pat",
    type: 3,
    des: "погладить другого котика",
    synt: "pat <юзер>",
    test: false
};