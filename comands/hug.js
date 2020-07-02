const discord = require("discord.js");
const fs = require("fs");
const request = require('request');
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    const errembed = new discord.MessageEmbed()
    errembed.setDescription("🛑 <@" + message.author.id + ">, пользователь не найден!")
    let user = args[0] == undefined ? {user:{username:"всех"}} :message.guild.members.cache.get(args[0].replace(/\D+/g,""))
    if (!user) return message.channel.send(errembed)
    request("https://nekos.life/api/v2/img/hug", (err, res, body) => {
        let json = JSON.parse(body);
        embed.setTitle(message.author.username +" " +"обнимает" +" " +user.user.username +" " +"💕")
            .setColor("#c96c2e")
            .setFooter(message.guild.name)
            .setImage(json.url)
            .setTimestamp()
        message.channel.send(embed)
    })
}
module.exports.help = {
    name: "hug",
    type: 3,
    des: "обнять другого котика",
    synt: "hug <юзер>",
    test: false
};