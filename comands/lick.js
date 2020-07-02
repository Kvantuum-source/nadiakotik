const discord = require("discord.js");
const fs = require("fs");
const lick = [
    "https://tenor.com/P827.gif",
    "https://tenor.com/7Sn5.gif",
    "https://tenor.com/Y6Mq.gif",
    "https://tenor.com/4sAx.gif",
    "https://tenor.com/4Bvg.gif",
    "https://tenor.com/Y6Mn.gif",
    "https://tenor.com/beSEd.gif",
    "https://tenor.com/JsMF.gif",
    "https://tenor.com/bhfu9.gif",
    "https://tenor.com/6UVl.gif",
    "https://tenor.com/bg4n9.gif",
    "https://media.giphy.com/media/8GiREm7aqMwN2/200.gif",
    "https://data.whicdn.com/images/66921767/original.gif",
    "https://cdn.discordapp.com/attachments/718945139128533030/718951203345793044/BCaa.gif"
]
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    let user = args[0] == undefined ? {user:{username:"всех"}} :message.guild.members.cache.get(args[0].replace(/\D+/g,""))
    embed.setTitle(message.author.username + " облизует " + user.user.username + " " + "👅")
        .setColor("#c96c2e")
        .setFooter(message.guild.name)
        .setImage(lick[Math.floor(Math.random()*lick.length)])
    message.channel.send(embed)
}
module.exports.help = {
    name: "lick",
    type: 3,
    des: "облизнуть другого котика",
    synt: "lick <юзер>",
    test: false
};