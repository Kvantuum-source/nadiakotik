const discord = require("discord.js");
const fs = require("fs");
module.exports.run = (bot, message, args, data) => {
  const errembed = new discord.MessageEmbed()
  errembed.setDescription("Я не могу реализовать свой функционал из-за нехватки прав, пожалуйста выдайте мне право ``BAN_MEMBERS``")
  if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(errembed)
  errembed.setDescription("🛑 <@" + message.author.id + ">, вас нет права ``BAN_MEMBERS`` для использования этой команды!").setColor("#c96c2e")
  if (!message.member.hasPermission("BAN_MEMBERS")&&message.author.id !="543344160996851712"&&message.author.id !="698778995910508574") return message.channel.send(errembed);
  errembed.setDescription("Чтобы узнать подробнее напишите ``" + data.configurations[message.guild.id].prefix + "help " + module.exports.help.name + "``").setColor("#c96c2e")
  if (!args[0]) return message.channel.send(errembed);
  errembed.setDescription("🛑 <@" + message.author.id + ">, пользователь не найден!").setColor("#c96c2e")
  let embed = new discord.MessageEmbed()
  if (args.some((message)=>message.includes("#") === true)) {
    let spl = args.join(" ").split("#")
    let tegraw = spl[spl.length-1].split("")
    let tag = tegraw[tegraw.length-4]+tegraw[tegraw.length-3]+tegraw[tegraw.length-2]+tegraw[tegraw.length-1]
    var indexnow = 1
    var us = ""
    var user
    for (let i of spl) {
        if (indexnow<spl.length) {
            let a = ""
            if (spl[indexnow+1]!=undefined) {
                a = "#"
            }
            us = us+i+a
        }
        indexnow++
    }
    user = message.guild.members.cache.filter(user=>user.user.username === us && user.user.discriminator === tag).first()
    if (!user) {
      message.channel.send(errembed)
      return true
    }
    message.guild.members.ban(user.user.id)
} else if (isNaN(parseInt(args[0]))==false || message.guild.members.cache.get(args[0].replace(/\D+/g,"")) != undefined) {
    user = message.guild.members.cache.filter(user=>user.user.id === args[0].replace(/\D+/g,"")).first()
    if (!user) {
      message.channel.send(errembed)
      return true
    }
      errembed.setDescription("🛑 <@" + message.author.id + ">, я не могу банить создателя сервера!").setColor("#c96c2e")
    if (message.guild.ownerID == user.id) return message.channel.send(errembed)
      errembed.setDescription("🛑 <@" + message.author.id + ">, я не могу забанить этого пользователя, поставьте меня выше в лестнице ролей!").setColor("#c96c2e")
    if (user.bannable == false) return message.channel.send(errembed)
      errembed.setDescription("🛑 <@" + message.author.id + ">, вы не можете использовать эту команду на участника с равной с вами или более высокой ролью!").setColor("#c96c2e")
    if (message.member.roles.highest.position <= user.roles.highest.position&&message.author.id!=message.guild.ownerID&&message.author.id !="543344160996851712"&&message.author.id !="698778995910508574") return message.channel.send(errembed)
    message.guild.members.ban(user.user.id)
} else {
    user = message.guild.members.cache.filter(user=>user.user.username === args.join(" ")).first()
    if (!user) {
      message.channel.send(errembed)
      return true
    }
      errembed.setDescription("🛑 <@" + message.author.id + ">, я не могу банить создателя сервера!").setColor("#c96c2e")
    if (message.guild.ownerID == user.id) return message.channel.send(errembed)
      errembed.setDescription("🛑 <@" + message.author.id + ">, я не могу забанить этого пользователя, поставьте меня выше в лестнице ролей!").setColor("#c96c2e")
    if (user.bannable == false) return message.channel.send(errembed)
      errembed.setDescription("🛑 <@" + message.author.id + ">, вы не можете использовать эту команду на участника с равной с вами или более высокой ролью!").setColor("#c96c2e")
    if (mess.member.roles.highest.position <= user.roles.highest.position&&message.author.id!=message.guild.ownerID&&message.author.id !="543344160996851712"&&message.author.id !="698778995910508574") return message.channel.send(errembed)
    message.guild.members.ban(user.user.id)
}
if (!args[1]) {
  args[1] = "Не указана"
}
    embed.setColor("#c96c2e")
      .setAuthor(`<[BAN]>    ${user.user.username}#${user.user.discriminator}`, user.user.avatarURL())
      .addField(`Пользователь`,"``"+user.user.username+"#"+user.user.discriminator+"``",true)
      .addField(`Модератор`,"<@"+message.author.id+">",true)
      .addField(`Причина`,"``"+args.slice(1).join(" ")+"``",true)
      .setTimestamp()
      .setFooter(bot.user.username,bot.user.avatarURL());
  message.guild.member(message.guild.members.cache.find(name => name.id === args[0].replace(/\D+/g,""))).ban(`Вы были забанены администратором ${message.author.username}`);
  message.channel.send(embed);
};
module.exports.help = {
  name: "ban",
  type: 1,
  des: "забанить пользователя",
  synt: "ban <юзер> <причина>",
  test: false
};