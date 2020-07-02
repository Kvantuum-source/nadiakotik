const discord = require("discord.js");
const fs = require("fs");
const request = require('request');
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    const errembed = new discord.MessageEmbed()
    errembed.setDescription("🛑 <@" + message.author.id + ">, канал не найден!\nпопробуйте использовать ``" + data.configurations[message.guild.id].prefix + "config questionChannel`` чтобы настроить канал для вопросов")
    if (!data.configurations[message.guild.id].questionChannel) return message.channel.send(errembed)
    let ch = message.guild.channels.cache.get(data.configurations[message.guild.id].questionChannel)
    if (!ch) return message.channel.send(errembed)
    if (!data.questions[message.guild.id]) {data.questions[message.guild.id] = {questions:0}}
    switch (args[0]) {
        case parseInt(args[0])+"":
            let id = parseInt(args[0])
            errembed.setDescription("🛑 <@"+message.author.id+">, у вас нет права ``MANAGE_MESSAGES`` для использования этой команды!").setColor("#c96c2e")
            if (!message.member.hasPermission("MANAGE_MESSAGES")&&message.author.id !="543344160996851712"&&message.author.id !="698778995910508574") return message.channel.send(errembed);
            errembed.setDescription("🛑 <@"+message.author.id+">, id сообщения не найдено!").setColor("#c96c2e")
            if (!data.questions[message.guild.id][id] || data.questions[message.guild.id][id].res != undefined) return message.channel.send(errembed)
            data.questions[message.guild.id][id].res = args.slice(1).join(" ")
            data.questions[message.guild.id][id].moderator = message.author.id
            let user = message.guild.members.cache.get(data.questions[message.guild.id][id].user)
            embed.setDescription("**Вопрос от "+user.user.username+"#"+user.user.discriminator+"**\n\n"+data.questions[message.guild.id][id].req+"\n\n**Ответ от "+message.author.username+"#"+message.author.discriminator+"**\n\n"+data.questions[message.guild.id][id].res).setColor("#c96c2e").setFooter("Вопрос №"+id+" закрыт").setTimestamp()
            user.user.send(embed)
            ch.messages.cache.get(data.questions[message.guild.id][id].message).edit(embed)
            break;
        default:
            var attachments
            errembed.setDescription("🛑 <@" + message.author.id + ">, необходимо ввести текст для вопроса!").setColor("#c96c2e")
            if (!args[0]) return message.channel.send(errembed)
            data.questions[message.guild.id].questions++
            embed.setDescription("**Вопрос от " + message.author.username + "#" + message.author.discriminator + "**\n\n" + args.join(" ") + "\n\n**Ожидание ответа от персонала**").setColor("#c96c2e").setFooter("Чтобы ответить: " + data.configurations[message.guild.id].prefix + "question " + data.questions[message.guild.id].questions + " <сообщение>").setTimestamp()
            if (message.attachments.first() != undefined) {
                message.attachments.forEach((attachment) => {
                    attachments += "\n"+attachment.url
                })
                embed.addField("Прикреплённые файлы", message.attachments)
            }
            let msg = await ch.send(embed)
            data.questions[message.guild.id][data.questions[message.guild.id].questions] = {
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
    name: "question",
    type: 0,
    des: "задать вопрос администрации",
    synt: "question <вопрос>\nquestion <id вопроса> <сообщение>",
    test: false
};