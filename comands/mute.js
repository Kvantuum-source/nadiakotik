const discord = require("discord.js");
const fs = require("fs");
module.exports.run = (bot, message, args, data) => {
    var time;
    const errembed = new discord.MessageEmbed()
    const embed = new discord.MessageEmbed()
    errembed.setDescription("Я не могу реализовать свой функционал из-за нехватки прав, пожалуйста выдайте мне право ``MANAGE_CHANNELS``")
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(errembed)
    errembed.setDescription("🛑 <@" + message.author.id + ">, вас нет права ``MANAGE_MESSAGES`` для использования этой команды!")
    if (!message.member.hasPermission("MANAGE_MESSAGES")&&message.author.id !="543344160996851712"&&message.author.id !="698778995910508574") return message.channel.send(errembed)
    errembed.setDescription("Чтобы узнать подробнее напишите ``"+data.configurations[message.guild.id].prefix+"help "+module.exports.help.name+"``").setColor("#c96c2e")
    if (!args[0]||!args[1]) return message.channel.send(errembed)
    let rUser = message.guild.members.cache.get(args[0].replace(/\D+/g,""))
    if (!rUser) return message.channel.send(errembed)
    errembed.setDescription("🛑 <@"+message.author.id+">, вы не можете использовать эту команду на участника с равной с вами или более высокой ролью!").setColor("#c96c2e")
    if (message.member.roles.highest.position <= rUser.roles.highest.position&&message.author.id!=message.guild.ownerID&&message.author.id !="543344160996851712"&&message.author.id !="698778995910508574") return message.channel.send(errembed)
    if (message.guild.channels.cache.random().permissionOverwrites.get(rUser.user.id)) message.guild.channels.cache.forEach(ch => {
        ch.permissionOverwrites.get(rUser.user.id).delete()
    });
    if (args[1] != args[1].replace("s","")) {
        time = parseInt(args[1].replace(/\D+/g,""))*1000
    } else if (args[1] != args[1].replace("m","")) {
        time = parseInt(args[1].replace(/\D+/g,""))*1000*60
    } else if (args[1] != args[1].replace("h","")) {
        time = parseInt(args[1].replace(/\D+/,""))*1000*60*60
    } else if (args[1] != args[1].replace("d","")) {
        time = parseInt(args[1].replace(/\D+/g,""))*1000*60*60*24
    } else return message.channel.send(errembed)
    message.guild.channels.cache.forEach(ch => {
        ch.updateOverwrite(rUser.user,{
            SEND_MESSAGES: false,
            ATTACH_FILES: false
        })
    });
    data.mutes[rUser.user.id] = {
        guild: message.guild.id,
        time: parseInt(Date.now() + time)
    };
    if (!args[2]) {
        args[2] = "Не указана"
    }
    embed.setColor("#c96c2e")
    .setAuthor(`<[MUTE]>    ${rUser.user.username}#${rUser.user.discriminator}`, rUser.user.avatarURL())
    .addField(`Пользователь`,"``"+rUser.user.username+"#"+rUser.user.discriminator+"``",true)
    .addField(`Модератор`,"<@"+message.author.id+">",true)
    .addField(`Причина`,"``"+args.slice(2).join(" ")+"``",true)
    .addField(`Время`,"``"+args[1]+"``",true)
    .setTimestamp()
    .setFooter(bot.user.username, bot.user.avatarURL());
    message.channel.send(embed)
};
module.exports.help = {
  name: "mute",
  type: 1,
  des: "выдать мут пользователю",
  synt: "mute <юзер> <время мута>[s/m/h/d] <причина>",
  test: false
};