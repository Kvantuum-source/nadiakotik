const discord = require("discord.js")
const fs = require("fs")
module.exports.run = (bot, message, args, data) => {
    const errembed = new discord.MessageEmbed()
    errembed.setDescription("Я не могу реализовать свой функционал из-за нехватки прав, пожалуйста выдайте мне право ``MANAGE_ROLES``")
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(errembed)
    errembed.setDescription("🛑 <@" + message.author.id + ">, вас нет права ``ADMINISTRATOR`` для использования этой команды!")
    if (!message.member.hasPermission("ADMINISTRATOR") && message.author.id !="543344160996851712"&&message.author.id !="698778995910508574") return message.channel.send(errembed);
    errembed.setDescription("Чтобы узнать подробнее напишите ``"+data.configurations[message.guild.id].prefix+"help "+module.exports.help.name+"``").setColor("#c96c2e")
    if (!args[0]) return message.channel.send(errembed);
    if (!args[1]) return message.channel.send(errembed);
    if (!args[2]) return message.channel.send(errembed);
    message.guild.channels.cache.filter(ch => ch.type === "text").forEach(async el => {
        var mess
        errembed.setDescription("🛑 <@"+message.author.id+">, сообщение не найдено!").setColor("#c96c2e")
        mess = await el.messages.fetch(args[0]).catch(err=>{})
        if (mess != undefined) {
            if (!mess) return message.channel.send(errembed)
            let role = message.guild.roles.cache.get(args[1].replace(/\D+/g,""))
            errembed.setDescription("🛑 <@"+message.author.id+">, роль не найдена!").setColor("#c96c2e")
            if (!role) return message.channel.send(errembed)
            var encode
            args[2] = message.guild.emojis.cache.filter(emo => emo.name == args[2].replace(/:/g, "")).first() != undefined ? message.guild.emojis.cache.filter(emo => emo.name == args[2].replace(/\:/g, "")).first() : args[2].replace("<", "").replace(">", "").split(":")[args[2].replace("<", "").replace(">").split(":").length - 1]
            let emojiraw = await mess.react(args[2])
            let emoji = await emojiraw.fetch(args[2])
            if (args[2].includes(":") == true) {
                encode = emoji._emoji.identifier
            } else {
                encode = encodeURIComponent(emoji._emoji.name)
            }
            errembed.setDescription("🛑 <@"+message.author.id+">, эмодзи не найдено!").setColor("#c96c2e")
            if (!emoji) return message.channel.send(errembed)
            if (!data.rfr[message.guild.id]) {
                data.rfr[message.guild.id] = {}
            }
            if (!data.rfr[message.guild.id][mess.id]) {
                data.rfr[message.guild.id][mess.id] = {}
            }
            if (!data.rfr[message.guild.id][mess.id][encode]) {
                data.rfr[message.guild.id][mess.id][encode] = role.id
            }
        }
    });
}
module.exports.help = {
    name: "emojimanager",
    type: 4,
    des: "добавить при нажатии на эмодзи авто-выдачу роли участнику",
    synt: "emojimanager <id сообщения> <роль> <:эмодзи:>",
    test: false
};