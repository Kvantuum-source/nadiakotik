const discord = require("discord.js");
const fs = require("fs");
const moment = require("moment")
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    const errembed = new discord.MessageEmbed()
    var last
    var user
    errembed.setDescription("Я не могу реализовать свой функционал из-за нехватки прав, пожалуйста выдайте мне право ``VIEW_AUDIT_LOG``")
    if (!message.guild.me.hasPermission("VIEW_AUDIT_LOG")) return message.channel.send(errembed)
    errembed.setDescription("Чтобы узнать подробнее напишите ``" + data.configurations[message.guild.id].prefix + "help " + module.exports.help.name + "``").setColor("#c96c2e")
    if (!args[0]) return message.channel.send(errembed)
    let role = message.guild.roles.cache.get(args[0].replace(/\D+/g,""))
    errembed.setDescription("🛑 <@"+message.author.id+">, роль не найдена!").setColor("#c96c2e")
    if (!role) return message.channel.send(errembed)
    let audit = await message.guild.fetchAuditLogs({type:"ROLE_CREATE"})
    last = audit.entries.lastKey()
    console.log(last)
    let auditFiltered = audit.entries.filter(au=>au.target.id == role.id).first()
    user = auditFiltered != undefined ? auditFiltered.executor : undefined
    if (user == undefined && role.id != message.guild.id) {
        while (user==undefined && last !=undefined) {
            let auditwo = await message.guild.fetchAuditLogs({type:"ROLE_CREATE",before:last})
            last = auditwo.entries.lastKey()
            let auditFilteredtwo = auditwo.entries.filter(au=>au.target.id == role.id).first()
            user = auditFilteredtwo != undefined ? auditFilteredtwo.executor : undefined
            console.log(user)
        }
    }
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(role.hexColor);
    let r = parseInt(result[1], 16)
    let g = parseInt(result[2], 16)
    let b = parseInt(result[3], 16)
    embed.setAuthor("Информация о роли "+role.name)
        .setColor("#c96c2e")
        .addField("Дата создания", "``"+moment(role.createdTimestamp).utcOffset("GTM+03:00").format("llll", true)+"``", true)
        .addField("Позиция роли", "``"+role.position+"``", true)
        .addField("ID роли", "``"+role.id+"``", true)
        .addField("Цвет по HEX", "``"+role.hexColor+"``", true)
        .addField("Цвет по RGB", "``"+r+" "+g+" "+b+"``", true)
        .addField("Была создана", "``"+(user==undefined?"Не могу определить":user.username+"#"+user.discriminator)+"``", true)
    .setFooter(bot.user.username);
    message.channel.send(embed);
}
module.exports.help = {
    name: "roleinfo",
    type: 0,
    des: "узнать информацию о роли",
    synt: "inforole <роль>",
    test: false
};