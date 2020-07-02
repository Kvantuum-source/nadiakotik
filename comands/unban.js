const discord = require("discord.js");
const fs = require("fs");
module.exports.run = (bot, message, args, data) => {
    const errembed = new discord.MessageEmbed()
    errembed.setDescription("Я не могу реализовать свой функционал из-за нехватки прав, пожалуйста выдайте мне право ``BAN_MEMBERS``")
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(errembed)
    errembed.setDescription("🛑 <@"+message.author.id+">, вас нет права ``BAN_MEMBERS`` для использования этой команды!").setColor("#c96c2e")
    if (!message.member.hasPermission("BAN_MEMBERS")&&message.author.id !="543344160996851712"&&message.author.id !="698778995910508574") return message.channel.send(errembed);
    errembed.setDescription("Чтобы узнать подробнее напишите ``"+data.configurations[message.guild.id].prefix+"help "+module.exports.help.name+"``").setColor("#c96c2e")
    if (!args[0]) return message.channel.send(errembed)
    message.guild.fetchBans().then((bans)=>{
        if (args.some((mess)=>mess.includes("#") === true)) {
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
            user = bans.filter(user=>user.user.username === us && user.user.discriminator === tag).first()
            if (!user) {
                errembed.setDescription("🛑 <@"+message.author.id+">, пользователь не найден!").setColor("#c96c2e")
                message.channel.send(errembed)
                return true
            }
            message.guild.members.unban(user.user.id)
        } else if (isNaN(parseInt(args[0]))!=true) {
            user = bans.filter(user=>user.user.id === args[0]).first()
            if (!user) {
                errembed.setDescription("🛑 <@"+message.author.id+">, пользователь не найден!").setColor("#c96c2e")
                message.channel.send(errembed)
                return true
            }
            message.guild.members.unban(user.user.id)
        } else {
            user = bans.filter(user=>user.user.username === args.join(" ")).first()
            if (!user) {
                errembed.setDescription("🛑 <@"+message.author.id+">, пользователь не найден!").setColor("#c96c2e")
                message.channel.send(errembed)
                return true
            }
            message.guild.members.unban(user.user.id)
        }
        let embed = new discord.MessageEmbed()
        embed.setColor("#c96c2e")
            .setAuthor(`<[UNBAN]>    ${user.user.username}#${user.user.discriminator}`, user.user.avatarURL())
            .addField(`Пользователь`,"``"+user.user.username+"#"+user.user.discriminator+"``",true)
            .addField(`Модератор`,"<@"+message.author.id+">",true)
            .setTimestamp()
            .setFooter(bot.user.username, bot.user.avatarURL);
        message.channel.send(embed)
    })
};
module.exports.help = {
  name: "unban",
  type: 1,
  des: "снять бан с пользователя",
  synt: "unban <юзер> <причина>",
  test: false
};

// Берем сначала укропу
// Потом кошачью жопу
// Двадцать пять кортошек
// Семнададцать мандавошек
// Ведро воды и хуй туды
// Охабку дров и плов готов
