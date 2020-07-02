const discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, data) => {
    // const embed = new discord.MessageEmbed()
    // const errembed = new discord.MessageEmbed()
    // var list = ""
    // var i = 0
    // var maxpage = Math.ceil(data.playlists[message.author.id].length/10)
    // var page = 1
    // for (let pushed of data.playlists[message.author.id]) {
    //     i++
    //     if (i>page*10 || i<page*10-10) {
    //         list = list + i + ". " + pushed.title+ "\n"
    //     }
    // }
    // embed.setAuthor("Плейлист " + message.author.username, message.author.avatarURL())
    //     .setDescription("```"+list+"```**Страница "+page+"/"+maxpage+"**\n\nЧтобы добавить музыку напишите\n ``"+data.configurations[message.guild.id].prefix+"playlist add <url>``\n или напишите\n ``"+data.configurations[message.guild.id].prefix+"play <название>``\n и отреагируйте :heart: под моим сообщением")
    //     .



    // let botmsg = await message.channel.send(embed)
    // botmsg.react("🔼").then(()=>{
    //     botmsg.react("🔽")
    // })
    // let rcollectorup = botmsg.createReactionCollector((reaction,user)=>reaction.emoji.name === "🔽" && user.id == message.author.id, {time:120000})
    // let rcollectordown = botmsg.createReactionCollector((reaction,user)=>reaction.emoji.name === "🔼" && user.id == message.author.id, {time:120000})
    // rcollectorup.on("collect",(messagereaction,user)=>{
    //     messagereaction.users.remove(user)
    //     if (page >= maxpage) return;
    //     embed = new discord.MessageEmbed()
    //     page++
    //     i = 0
    //     for (let pushed of data.playlists[message.author.id]) {
    //         i++
    //         if (i>page*10 || i<page*10-10) {
    //             list = list + "{" + i + "} " + pushed.title+ "\n"
    //         }
    //     }
    //     embed.setAuthor("Плейлист " + message.author.username, message.author.avatarURL())
    //         .setDescription("```"+list+"```**Страница "+page+"/"+maxpage+"**\n\nЧтобы добавить музыку напишите\n ``"+data.configurations[message.guild.id].prefix+"playlist add <url>``\n или напишите\n ``"+data.configurations[message.guild.id].prefix+"play <название>``\n и отреагируйте :heart: под моим сообщением")
    //         .setColor("#c96c2e")
    //     botmsg.edit(embed)
    // })
    // rcollectordown.on("collect",(messagereaction,user)=>{
    //     messagereaction.users.remove(user)
    //     if (page < 2) return;
    //     embed = new discord.MessageEmbed()
    //     page--
    //     i = 0
    //     for (let inf of list) {
    //         i++
    //         allmembers = allmembers + inf.members
    //         if (i>page*10 || i<page*10-10) {} else {
    //             add = add+"{"+inf.number+"}** "+inf.name+" - **``"+inf.members+"``** котят **\n"
    //         }
    //     }
    //     embed.setAuthor("Плейлист " + message.author.username, message.author.avatarURL())
    //         .setDescription("```"+list+"```**Страница "+page+"/"+maxpage+"**\n\nЧтобы добавить музыку напишите\n ``"+data.configurations[message.guild.id].prefix+"playlist add <url>``\n или напишите\n ``"+data.configurations[message.guild.id].prefix+"play <название>``\n и отреагируйте :heart: под моим сообщением")
    //         .setColor("#c96c2e")
    //     botmsg.edit(embed)
    // })
}
module.exports.help = {
    name: "playlist",
    type: 2,
    des: "ваш плейлист",
    synt: "playlist < /номер/название песни/>",
    test: true
};