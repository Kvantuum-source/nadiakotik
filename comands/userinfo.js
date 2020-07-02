const discord = require("discord.js");
const fs = require("fs");
const moment = require("moment")
module.exports.run = async (bot, message, args, data) => {
    let errembed = new discord.MessageEmbed()
    let embed = new discord.MessageEmbed()
    var user
    if (!args[0]) {
        user = message.author
    } else {
        user = message.guild.members.cache.get(args[0].replace(/\D+/g,"")).user
    }
    errembed.setDescription("🛑 <@"+message.author.id+">, пользователь не найден!").setColor("#c96c2e")
    if (!user) return message.channel.send(errembed)
    if (user.presence.clientStatus) {
        if (user.presence.clientStatus.web) {
            stat = "Компьютер"
        } else if (user.presence.clientStatus.mobile) {
            stat = "Телефон"
        } else {
            stat = "Компьютер"
        }
    } else {stat = "Не в сети"}
    errembed.setDescription("Чтобы узнать подробнее напишите ``"+data.configurations[message.guild.id].prefix+"help "+module.exports.help.name+"``").setColor("#c96c2e")
    if (!user) return message.channel.send(errembed)
    var presence
    if (user.presence.activities.filter(activity=>activity.type === "PLAYING")[0]) {
        presence = "**"+user.presence.activities.filter(activity=>activity.type === "PLAYING")[0].name + "**\n``" + user.presence.activities.filter(activity=>activity.type === "PLAYING")[0].details + "``\n"
    } else if (user.presence.activities.filter(activity=>activity.type === "LISTENING")[0]) {
        presence = "**"+user.presence.activities.filter(activity=>activity.type === "LISTENING")[0].name + "**\n``" + user.presence.activities.filter(activity=>activity.type === "LISTENING")[0].details + "``\n"
    } else if (user.presence.activities.filter(activity=>activity.type === "STREAMING")[0]) {
        presence = "**"+user.presence.activities.filter(activity=>activity.type === "STREAMING")[0].name + "**\n``" + user.presence.activities.filter(activity=>activity.type === "STREAMING")[0].details + "``\n"
    } else if (user.presence.activities.filter(activity=>activity.type === "WATCHING")[0]) {
        presence = "**"+user.presence.activities.filter(activity=>activity.type === "WATCHING")[0].name + "**\n``" + user.presence.activities.filter(activity=>activity.type === "WATCHING")[0].details + "``\n"
    } else if (user.presence.activities.filter(activity=>activity.type !== "CUSTOM_STATUS")[0] === undefined) {
        presence = "**Нет**"
    }
    var status
    if (user.presence.activities.filter(activity=>activity.type === "CUSTOM_STATUS")[0]) {
        status = "**"+user.presence.activities.filter(activity=>activity.type === "CUSTOM_STATUS")[0].state+"**"
    } else {
        status = "**Нет**"
    }
    moment.locale("ru")
    embed.setAuthor("Информация о пользователе " +user.username +"#"+ user.discriminator,user.displayAvatarURL())
        .addField("Игра пользователя", presence, true)
        .addField("Статус пользователя",`${status}`,true)
        .addField("Имя", `\`${user.username}\``, true)
        .addField("Дискриминатор", `\`${user.discriminator}\``, true)
        .addField("Последнее сообщение ", `\`${message.guild.members.cache.get(user.id).lastMessage !== null ? message.guild.members.cache.get(user.id).lastMessage : "Нет сообщений"}\``, true)
        .addField("Высшая роль", `<@&${message.guild.members.cache.get(user.id).roles.highest.id}>`, true)
        .addField("Устройство", `\`${stat}\``, true)
        .addField("Вошёл на сервер",`\`${moment(user.joinedAt).format("llll", true)}\``)
        .addField("Замечен впервые в Discord", `\`${moment(user.createdAt).format("llll", true)}\``, true)
        .setThumbnail(user.avatarURL())
    message.channel.send(embed)
}
module.exports.help = {
    name: "userinfo",
    type: 0,
    des: "узнать информацию о пользователе",
    synt: "userinfo <юзер>",
    test: false
};