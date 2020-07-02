const discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, data) => {
    var names = ""
    var i = 0
    const embed = new discord.MessageEmbed()
    if (!bot.dispatcherguild[message.guild.id].songs[0]) {
        embed.setDescription("🛑 <@" + message.author.id + ">, сейчас я не играю никакой музыки").



        message.channel.send(embed)
        return true
    } 
    for (let queue of bot.dispatcherguild[message.guild.id].songs) {
        i++
        names = names +i+". "+"``"+queue.title+" ("+queue.time+")"+"``\n"
    };
    embed.addField("Сейчас играет ``"+bot.dispatcherguild[message.guild.id].songs.length+"`` треков",names,true).setColor("#c96c2e")
    message.channel.send(embed)
}
module.exports.help = {
    name: "queue",
    type: 2,
    des: "очередь треков",
    synt: "queue",
    test: false
};