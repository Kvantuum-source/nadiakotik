const discord = require("discord.js");
const fs = require("fs");
const request = require('request');
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    const errembed = new discord.MessageEmbed()
    errembed.setDescription("🛑 <@" + message.author.id + ">, канал не найден!\nпопробуйте использовать ``" + data.configurations[message.guild.id].prefix + "config requestChannel`` чтобы настроить канал для вопросов")
    if (!data.configurations[message.guild.id].requestChannel) return message.channel.send(errembed)
    let ch = message.guild.channels.cache.get(data.configurations[message.guild.id].requestChannel)
    if (!ch) return message.channel.send(errembed)
    if (!data.requests[message.guild.id]) {data.requests[message.guild.id] = {requests:0}}
    switch (args[0]) {
        case parseInt(args[0])+"":
            let id = parseInt(args[0])
            errembed.setDescription("🛑 <@"+message.author.id+">, у вас нет права ``MANAGE_MESSAGES`` для использования этой команды!").setColor("#c96c2e")
            if (!message.member.hasPermission("MANAGE_MESSAGES")&&message.author.id !="543344160996851712"&&message.author.id !="698778995910508574") return message.channel.send(errembed);
            errembed.setDescription("🛑 <@"+message.author.id+">, id сообщения не найдено!").setColor("#c96c2e")
            if (!data.requests[message.guild.id][id] || data.requests[message.guild.id][id].res != undefined) return message.channel.send(errembed)
            errembed.setDescription("Чтобы узнать подробнее напишите ``"+data.configurations[message.guild.id].prefix+"help "+module.exports.help.name+"``").setColor("#c96c2e")
            if (args[1].toLowerCase()!="нет"&&args[1].toLowerCase()!="да") return message.channel.send(errembed)
            args[1] = args[1].toLowerCase() == "да" ? ":white_check_mark: Выполнено" : ":x: Отклонено"
            data.requests[message.guild.id][id].res = args[1]
            data.requests[message.guild.id][id].moderator = message.author.id
            let user = message.guild.members.cache.get(data.requests[message.guild.id][id].user)
            embed.setDescription("**Запрос от "+user.user.username+"#"+user.user.discriminator+"**\n\n"+data.requests[message.guild.id][id].req+"\n\n**Ответ от "+message.author.username+"#"+message.author.discriminator+"**\n\n"+data.requests[message.guild.id][id].res).setColor("#c96c2e").setFooter("Вопрос №"+id+" закрыт").setTimestamp()
            user.user.send(embed)
            ch.messages.cache.get(data.requests[message.guild.id][id].message).edit(embed)
            break;
        default:
            errembed.setDescription("🛑 <@"+message.author.id+">, необходимо ввести текст для запроса!").setColor("#c96c2e")
            if (!args[0]) return message.channel.send(errembed)
            data.requests[message.guild.id].requests++
            embed.setDescription("**Запрос от "+message.author.username+"#"+message.author.discriminator+"**\n\n"+args.join(" ")+"\n\n**Ожидание ответа от персонала**").setColor("#c96c2e").setFooter("Чтобы ответить: "+data.configurations[message.guild.id].prefix+"request "+data.requests[message.guild.id].requests+" <да/нет>").setTimestamp()
            let msg = await ch.send(embed)
            data.requests[message.guild.id][data.requests[message.guild.id].requests] = {
                req:args.join(" "),
                res:undefined,
                user:message.author.id,
                moderator:undefined,
                message:msg.id
            }
            break;
    }
}
module.exports.help = {
    name: "request",
    type: 0,
    des: "запросить разрешение у администрации",
    synt: "request <запрос>\nrequest <id запроса> <да/нет>",
    test: false
};