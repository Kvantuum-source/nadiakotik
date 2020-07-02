const discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, data) => {
    const errembed = new discord.MessageEmbed()
    var par
    errembed.setDescription("Я не могу реализовать свой функционал из-за нехватки прав, пожалуйста выдайте мне право ``MANAGE_CHANNELS``")
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(errembed)
    errembed.setDescription("🛑 <@"+message.author.id+">, у вас нет права ``MANAGE_CHANNELS`` для использования этой команды!").setColor("#c96c2e")
    if (!message.member.hasPermission("MANAGE_CHANNELS")&&message.author.id !="543344160996851712"&&message.author.id !="698778995910508574") return message.channel(errembed)
    errembed.setDescription("Чтобы узнать подробнее напишите ``"+data.configurations[message.guild.id].prefix+"help "+module.exports.help.name+"``").setColor("#c96c2e")
    if (args[0]!="allmembers"&&args[0]!="bots"&&args[0]!="members"&&args[0]!="online"&&args[0]!="offline"&&args[0]!="voiceConnected"&&args[0]!="time"&&args[0]!="date") return message.channel.send(errembed)
    if (data.configurations[message.guild.id].serverstats.parentid == undefined) {
        par = (await message.guild.channels.create("📈|Статистика сервера|📈",{type:"category",position:0})).id
    } else {
        par = data.configurations[message.guild.id].serverstats.parentid
    }
    data.configurations[message.guild.id].serverstats.parentid = par
    let ch = await message.guild.channels.create(args[0]+": 0",{type:"voice",parent:par})
    data.configurations[message.guild.id].serverstats[args[0]] = ch.id
}
module.exports.help = {
    name: "stats",
    type: 4,
    des: "создать голосовые каналы со статистикой",
    synt: "stats <allmembers/bots/members/online/offline/voiceConnected/time/date>",
    test: false
};