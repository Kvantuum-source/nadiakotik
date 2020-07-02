const discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    const dndembed = new discord.MessageEmbed()
    const errembed = new discord.MessageEmbed()
    errembed.setDescription("Чтобы узнать подробнее напишите ``" + data.configurations[message.guild.id].prefix + "help " + module.exports.help.name + "``")
    if (!args[0]) return message.channel.send(errembed)
    let user = message.guild.members.cache.get(args[0].replace(/\D+/g,""))
    if (!user) return message.channel.send(errembed)
    errembed.setDescription("🛑 Данный пользователь не подавал вам заявку").setColor("#c96c2e")
    if (!data.marrymodule[message.guild.id][user.id+"||"+message.author.id]) return message.channel.send(errembed)
    embed.setDescription("💔Вы отклонили запрос "+user.user.username)
        .setAuthor("Заявка на женитьбу",message.author.avatarURL())
        .setColor("#c96c2e")
    message.author.send(embed)
    dndembed.setDescription("💔Сожалею... но "+message.author.username+"#"+message.author.discriminator+"отклонил(а) ваш запрос 3:")
        .setAuthor("Заявка на женитьбу",message.author.avatarURL())
        .setColor("#c96c2e")
    user.user.send(dndembed)
    delete(data.marrymodule[message.guild.id][user.id+"||"+message.author.id])
}
module.exports.help = {
    name: "no",
    type: 2,
    des: "отклонить запрос на заняшивание",
    synt: "no <юзер>",
    test: true
};