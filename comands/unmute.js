const discord = require("discord.js");
const fs = require("fs");
module.exports.run = (bot, message, args, data) => {
    const errembed = new discord.MessageEmbed()
    const embed = new discord.MessageEmbed()
    errembed.setDescription("Я не могу реализовать свой функционал из-за нехватки прав, пожалуйста выдайте мне право ``MANAGE_CHANNELS``")
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(errembed)
    errembed.setDescription("🛑 <@"+message.author.id+", вас нет права ``MANAGE_MESSAGES`` для использования этой команды!")
    if (!message.member.hasPermission("MANAGE_MESSAGES")&&message.author.id !="543344160996851712"&&message.author.id !="698778995910508574") return message.channel.send(errembed)
    errembed.setDescription("Чтобы узнать подробнее напишите ``"+data.configurations[message.guild.id].prefix+"help "+module.exports.help.name+"``").setColor("#c96c2e")
    if (!args[0]) return message.channel.send(errembed)
    let rUser = message.guild.members.cache.get(args[0].replace(/\D+/g,""))
    errembed.setDescription("🛑 <@"+message.author.id+">, пользователь не найден!").setColor("#c96c2e")
    if (!rUser) return message.channel.send(errembed)
    message.guild.channels.cache.forEach(ch => {
      if (ch.permissionOverwrites.has(rUser.user.id)) {
        ch.permissionOverwrites.get(rUser.user.id).delete()
      }
    });
    delete data.mutes[rUser.user.id]
    embed.setColor("#c96c2e")
    .setAuthor(`<[UNMUTE]>    ${rUser.user.username}#${rUser.user.discriminator}`, rUser.user.avatarURL())
    .addField(`Пользователь`,"``"+rUser.user.username+"#"+rUser.user.discriminator+"``",true)
    .addField(`Модератор`,"<@"+message.author.id+">",true)
    .setTimestamp()
    .setFooter(bot.user.username,bot.user.avatarURL());
    message.channel.send(embed)
};
module.exports.help = {
  name: "unmute",
  type: 1,
  des: "снять мут с пользователя",
  synt: "unmute <юзер>",
  test: false
};
