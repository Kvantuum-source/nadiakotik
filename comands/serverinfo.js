const discord = require("discord.js");
const fs = require("fs");
const moment = require("moment")
module.exports.run = async (bot, message, args, data) => {
    let create = moment(message.guild.createdAt).format("YYYY-MM-DD hh:mm:ss")
    const verlvl = {
        "NONE": "Отсутствует",
        "LOW": "Низкий",
        "MEDIUM": "Средний",
        "HIGH": "Высокий",
        "VERY_HIGH": "Наивысший"
    };
    const embed = new discord.MessageEmbed()
    embed.setColor("#2F3136")
        .setAuthor(`Информация о сервере`, `https://i.gifer.com/IXNn.gif`)
        .addField("Название сервера", `\`${message.guild.name}\``, true)
        .addField("ID сервера", `\`${message.guild.id}\``, true)
        .addField("Был создан", `\`${create}\``, true)
        .addField("Владелец сервера",`${message.guild.owner}`,true)
        .setThumbnail(message.guild.iconURL())
        .addField("Количество ролей", `\`${message.guild.roles.cache.size}\``, true)
        .addField("Количество каналов", `\`${message.guild.channels.cache.size}\``, true)
        .addField("Количество эмодзи", `\`${message.guild.emojis.cache.size}\``, true)
        .addField("Регион сервера", `\`${message.guild.region}\``, true)
        .addField("Количество котят", `\`${message.guild.memberCount}\``, true)
        .addField("Количество ботиков",`\`${message.guild.members.cache.filter(member => member.user.bot).size}\``,true)
        .addField("Уровень верификации", `\`${verlvl[message.guild.verificationLevel]}\``)
        .setTimestamp()
        .setFooter(message.guild.name);
    message.channel.send(embed);
}
module.exports.help = {
    name: "serverinfo",
    type: 0,
    des: "информация о сервере",
    synt: "serverinfo",
    test: false
};