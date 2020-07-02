const discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    var num = 0
    bot.guilds.cache.forEach(guild => { num = num + guild.memberCount })
    let resMsg = await message.channel.send('Измерение пинга...');
    let ping = Math.round((resMsg.createdTimestamp - msg.createdTimestamp) - bot.ping)
    embed.setAuthor("Информация о боте", "https://orenburg.stroylandiya.ru/local/client/img/loading.gif")
        .setColor("#c96c2e")
        .setThumbnail("https://cdn.discordapp.com/attachments/594291839297912843/681077647496839303/kisspng-information-technology-business-managed-services-c-system-5abf3780b61946.5359043015224810247.png")
        .addField("Память", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + " MB"}\``, true)
        .addField('Всего котят', `\`${num}\``, true)
        .addField('Всего каналов', `\`${bot.channels.cache.size -1}\``, true)
        .addField("Всего серверов", `\`${bot.guilds.cache.size}\``, true)
        .addField('Версия бота', "`"+ (require("../package.json").version) +"`", true)
        .addField("Префикс бота", "`"+data.configurations[message.guild.id].prefix+"`", true)
        .addField("Пинг", `\`${ping} ms\``, true)
        .addField("Создательница", "💗`06nadia.#2867`💗", true)
        .setFooter(bot.user.username);
    message.channel.send(embed)
}
module.exports.help = {
    name: "botinfo",
    type: 0,
    des: "информация о боте",
    synt: "botinfo",
    test: false
};
