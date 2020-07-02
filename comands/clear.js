const discord = require("discord.js");
const fs = require("fs");
module.exports.run = async(bot, message, args, data, db) => {
    const embed = new discord.MessageEmbed()
    const errembed = new discord.MessageEmbed()
    errembed.setDescription("Я не могу реализовать свой функционал из-за нехватки прав, пожалуйста выдайте мне право ``MANAGE_MESSAGES``")
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(errembed)
    errembed.setDescription("🛑 <@"+message.author.id+">, вас нет права ``MANAGE_MESSAGES`` для использования этой команды!").setColor("#c96c2e")
    if(!message.member.hasPermission("MANAGE_MESSAGES")&&message.author.id !="543344160996851712"&&message.author.id !="698778995910508574") return message.channel.send(errembed);
    errembed.setDescription("Чтобы узнать подробнее напишите ``"+data.configurations[message.guild.id].prefix+"help "+module.exports.help.name+"``").setColor("#c96c2e")
    if(!args[0]) return message.channel.send(errembed);
    var user
    var dop = ""
    if (args[1] != undefined) {
      user = message.guild.members.cache.get(args[1].replace(/\D+/g,""))
      if (!user) {
        bot.send(errembed)
        return true
      }
    }
    if (parseInt(args[0])>100) {
      for (let b = parseInt(args[0]);b>0;b=b) {
        let del = 0
        if (b>100) {
          b=b-100
          del=100
        } else {
          del=b
          b=0
        }
        if (!user) {
          message.channel.bulkDelete(del)
        } else {
          let messages = await message.channel.messages.fetch()
          let filtered = messages.filter(m => m.author.id === user.user.id)
          if (filtered.size>0) {
            await message.channel.bulkDelete(filtered, true)
            dop = " от "+user.user.username+"#"+user.user.discriminator
          } else {
            errembed.setDescription("Чтобы узнать подробнее напишите ``"+data.configurations[message.guild.id].prefix+"help "+module.exports.help.name+"``").setColor("#c96c2e")
            message.channel.send(errembed)
            return true
          }
        }
      }
      embed.setDescription("<@"+message.author.id+"> удалено "+args[0]+" сообщений"+dop).setColor("#c96c2e")
      message.channel.send(embed).then(msg=>msg.delete({timeout:5000}))
    } else if (parseInt(args[0])<101 && parseInt(args[0])>-1) {
      if (!user) {
        message.channel.bulkDelete(parseInt(args[0]))
      } else {
        let messages = message.channel.messages
        let filtered = messages.filter(m => m.author.id === user.user.id)
        if (filtered.size>0) {
          await message.channel.bulkDelete(filtered, true)
          dop = " от "+user.user.username+"#"+user.user.discriminator
        } else {
          errembed.setDescription("Чтобы узнать подробнее напишите ``"+data.configurations[message.guild.id].prefix+"help "+module.exports.help.name+"``").setColor("#c96c2e")
          bot.send(errembed)
          return true
        }
      }
        embed.setDescription("<@" + message.author.id + "> удалено " + args[0] + " сообщений" + dop).setColor("#c96c2e")
      message.channel.send(embed).then(msg=>msg.delete({timeout:5000}))
    } else return message.channel.send("Количество сообщений не может быть равно нулю или отрицательным")
};
module.exports.help = {
  name: "clear",
  type: 1,
  des: "очистка сообщений в канале",
  synt: "clear <кол-во сообщений> <@юзер>",
  test: false
};
