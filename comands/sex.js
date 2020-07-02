const discord = require("discord.js");
const fs = require("fs");
const sex = [
    "https://i.imgur.com/jHtaQgh.gif",
    "https://media.tenor.com/images/22f0756c67552ab86c28d0de5329a222/tenor.gif",
    "https://static.hentai-image.com/upload/20140303/2/1110/15.gif",
    "https://25.media.tumblr.com/c071337beed79bce638f5aa21b469605/tumblr_mpvfp7xJgG1su5sjdo1_500.gif",
]
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    const errembed = new discord.MessageEmbed()
    if (!args[0]) return message.channel.send(errembed)
    let user = message.guild.members.cache.get(args[0].replace(/\D+/g,""))
    embed.setTitle(message.author.username +" занялся любовью с " +user.user.username +" " +"👅")
        .setColor("#c96c2e")
        .setFooter(message.guild.name)
        .setImage(sex[Math.floor(Math.random()*sex.length)])
    message.channel.send(embed)
}
module.exports.help = {
    name: "sex",
    type: 3,
    des: "заняться любовью с другим котиком",
    synt: "sex <юзер>",
    test: true
};