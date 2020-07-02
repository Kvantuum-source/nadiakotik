const discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, data) => {
    const gis = require("g-i-s")
    const embed = new discord.MessageEmbed()
    const errembed = new discord.MessageEmbed()
    var page = 0
    if(message.guild.me.hasPermission("MANAGE_MESSAGES")) {message.delete()}
    gis(args.join(" "), async (err, res) => {
        errembed.setDescription("🛑 <@" + message.author.id + ">, по вашему запросу не найдено ни одной картинки")
        if (!res[0]) return message.channel.send(errembed)
        embed.setImage(res[page].url).setDescription("Страница " + (page + 1) + "/" + res.length).setAuthor(message.author.username+"#"+message.author.discriminator,message.author.avatarURL()).setColor("#c96c2e")
        let botmsg = await message.channel.send(embed)
        botmsg.react("◀️").then(() => {
            botmsg.react("▶️")
        })
        let backward = botmsg.createReactionCollector((reaction, user) => reaction.emoji.name == "◀️" && user.id == message.author.id, { time: 60000 * 10 })
        let forward = botmsg.createReactionCollector((reaction, user) => reaction.emoji.name == "▶️" && user.id == message.author.id, { time: 60000 * 10 })
        forward.on("collect", async (reaction, user) => {
            reaction.users.remove(user)
            if (!res[page + 1]) return;
            page++
            embed.setImage(res[page].url).setDescription("Страница " + (page + 1) + "/" + res.length).setAuthor(message.author.username + "#" + message.author.discriminator, message.author.avatarURL()).setColor("#c96c2e")
            botmsg.edit(embed)
        })
        backward.on("collect", async (reaction, user) => {
            reaction.users.remove(user)
            if (!res[page - 1]) return;
            page--
            embed.setImage(res[page].url).setDescription("Страница " + (page + 1) + "/" + res.length).setAuthor(message.author.username + "#" + message.author.discriminator, message.author.avatarURL()).setColor("#c96c2e")
            botmsg.edit(embed)
        })
    })
}
module.exports.help = {
    name: "search",
    type: 3,
    des: "поиск картинок",
    synt: "search <текст>",
    test: false
};