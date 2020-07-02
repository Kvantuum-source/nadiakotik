const discord = require("discord.js")
const fs = require("fs")
let cnfg = [
    {name:"prefix",des:"префикс, используемый для команд",type:"any",men:"config prefix <префикс>"},
    {name:"onJoinRole",des:"роль, выдаваемая пользователю при заходе на сервер",type:"role",men:"config onJoinRole <роль/нет>"},
    {name:"onJoinMessage",des:"сообщение, которое будет написанно в канал MemberJoinChannel при заходе участника на сервер",type:"message",men:"config onJoinMessage <сообщение/нет>"},
    {name:"MemberJoinChannel",des:"канал, в котором будет написанно сообщение onJoinMessage при заходе участника на сервер",type:"channel",men:"config MemberJoinChannel <канал/нет>"},
    {name:"MemberLeaveChannel",des:"канал, в котором будет написанно сообщение onLeaveMessage при выходе участника из сервера",type:"channel",men:"config MemberLeaveChannel <канал/нет>"},
    {name:"onLeaveMessage",des:"сообщение, которое будет написанно в канал MemberLeaveChannel при выходе участника из сервера",type:"channel",men:"config MemberLeaveChannel <канал/нет>"},
    {name:"onJoinDMessage",des:"сообщение, которое будет написанно участнику в личные сообщения при входе на сервер",type:"message",men:"config onJoinDMessage <сообщение/нет>"},
    {name:"questionChannel",des:"канал, в который будут присылаться вопросы пользователей по команде question <сообщение>",type:"channel",men:"config questionChannel <канал/нет>"},
    {name:"requestChannel",des:"канал, в который будут присылаться запросы пользователей по команде request <сообщение>",type:"channel",men:"confog requestChannel <канал/нет>"}
]
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    const errembed = new discord.MessageEmbed()
    errembed.setDescription("🛑 <@"+message.author.id+">, вас нет права ``ADMINISTRATOR`` для использования этой команды!").setColor("#c96c2e")
    if (!message.member.hasPermission("ADMINISTRATOR")&&message.author.id !="543344160996851712"&&message.author.id !="698778995910508574") return message.channel.send(errembed);
    let conf = data.configurations[message.guild.id][args[0]]
    let cnfig = cnfg.find(val => val.name == args[0])
    var configs = ""
    errembed.setDescription("🛑 <@"+message.author.id+">, настройка не найдена!").setColor("#c96c2e")
    if (!cnfig && args[0]!=undefined) return message.channel.send(errembed)
    if (!args[0]) {
        cnfg.forEach((value,index,arr)=>{
            configs = configs+" ``"+value.name+"`` "
        })
        embed.setColor("#c96c2e")
            .setDescription("**Все доступные настройки **\n"+configs)
            .setFooter("©️ " + bot.user.username + " >",bot.user.avatarURL)
            .setTimestamp()
            .setThumbnail("https://i.imgur.com/oxLQ9Kq.png");
        message.channel.send(embed)
    } else if (!args[1]) {
        if (conf == undefined) {
            conf = "нет"
        }
        embed.setColor("#c96c2e")
            .setDescription("**Информация о настройке **" + args[0] + "\n\nОписание:\n`" + cnfig.des + "`\nИзменить:\n`" + cnfig.men + "`\nТекущее значение:\n``"+(data.configurations[message.guild.id][args[0]]==undefined?"нет":data.configurations[message.guild.id][args[0]])+"``")
            .setFooter("©️ " + bot.user.username + " >",bot.user.avatarURL)
            .setTimestamp()
            .setThumbnail("https://i.imgur.com/oxLQ9Kq.png");
        message.channel.send(embed)
    } else {
        var newValue
        if (cnfig.type == "message") {
            newValue = args[1].toLowerCase == "нет" ? undefined : args.slice(1).join(" ")
        } else if (cnfig.type == "channel") {
            let ch = message.guild.channels.cache.get(args[1].replace(/\D+/g,""))
            errembed.setDescription("Чтобы узнать подробнее напишите ``"+data.configurations[message.guild.id].prefix+"config "+cnfig.name+"``").setColor("#c96c2e")
            if (!ch&&args[1].toLowerCase()!="нет") return message.channel.send(errembed)
            newValue = args[1].toLowerCase() == "нет" ? undefined : ch.id
        } else if (cnfig.type == "role") {
            let role = message.guild.channels.cache.get(args[1].replace(/\D+/g,""))
            errembed.setDescription("Чтобы узнать подробнее напишите ``"+data.configurations[message.guild.id].prefix+"config "+cnfig.name+"``").setColor("#c96c2e")
            if (!role&&args[1].toLowerCase()!="нет") return mesage.channel.send(errembed)
            newValue = args[1].toLowerCase() == "нет" ? undefined : role.id
        } else if (cnfig.type == "any") {
            newValue = args[1]
        }
        let conftext = conf==undefined?"нет":conf
        let newValuetext = newValue==undefined?"нет":newValue
        embed.setColor("#c96c2e")
            .setDescription("**Изменение настройки **" + args[0])
            .addField("Предыдущее значение","``"+conftext+"``",true)
            .addField("Текущее значение","``"+newValuetext+"``",true)
            .setFooter("©️ " + bot.user.username + " >",bot.user.avatarURL)
            .setTimestamp()
            .setThumbnail("https://i.imgur.com/oxLQ9Kq.png");
        message.channel.send(embed)
        data.configurations[message.guild.id][args[0]] = newValue
    }
}
module.exports.help = {
    "name":"config",
    "type":4,
    "des":"настройка параметров работы бота",
    "synt": "config\nconfig <конфигурация> <значение>",
    "test":false
}