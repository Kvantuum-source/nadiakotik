const discord = require("discord.js")
const fs = require("fs")
module.exports.run = async (bot, message, args, data) => {
    var adm = []
    var info = ""
    var administration = ""
    var music = ""
    var fan = ""
    var util = ""
    var economy = ""
    let embed = new discord.MessageEmbed()
    if (!args[0]) {
        fs.readdir("./comands", (_err, files) => {
            for (let file of files) {
                let rfile = require(`./${file}`)
                let pushlist = {
                    name:rfile.help.name,
                    type:rfile.help.type,
                    des:rfile.help.des,
                    synt:rfile.help.synt,
                    test:rfile.help.test
                }
                adm.push(pushlist)
            }
            for (let index of adm) {
                if (index.test == false) {
                    if (index.type == 0) {
                        info = info + "• " + index.name + " - " + index.des + "\n"
                    } else if (index.type == 1) {
                        administration = administration + "• " + index.name + " - " + index.des + "\n"
                    } else if (index.type == 2) {
                        music = music + "• " + index.name + " - " + index.des + "\n"
                    } else if (index.type == 3) {
                        fan = fan + "• " + index.name + " - " + index.des + "\n"
                    } else if (index.type == 4) {
                        util = util + "• " + index.name + " - " + index.des + "\n"
                    } else if (index.type == 5) {
                        economy = economy + "• " + index.name + " - " + index.des + "\n"
                    }
                }
            }
            embed.setDescription("**Доступные комманды:**\n\n**Информация:**\n```" + info + "```\n**Администрирование:**\n```" + administration + "```\n**Музыка:**\n```" + music + "```\n**Развлечения:**\n```" + fan + "```\n**Утилиты:**\n```" + util + "```\n**Экономика:**\n```" + economy + "```\nЧтобы узнать подробнее напишите ``" + data.configurations[message.guild.id].prefix + "help <команда>``\n\nМой префикс на сервере ``" + data.configurations[message.guild.id].prefix + "``").setColor("#c96c2e").setTimestamp().setFooter(bot.user.username, bot.user.avatarURL)
            message.channel.send(embed)
        }) 
    } else {
        try{
            let props = require(`./${args[0]}.js`);
            let comtype = props.help.type
                if (comtype == 0) {
                    comtype = "информация"
                } else if (comtype == 1) {
                    comtype = "администрирование" 
                } else if (comtype == 2) {
                    comtype = "музыка"
                } else if (comtype == 3) {
                    comtype = "развлечения"
                } else if (comtype == 4) {
                    comtype = "утилиты"
                } else if (comtype == 5) {
                    comtype = "экономика"
                } else {
                    comtype="секретная команда"
                }
            embed.setColor("#c96c2e")
                .setDescription("**Информация о команде **" + args[0] + "\n\nОписание:\n`" + props.help.des + "`\nТип:\n`" + comtype + "`\nИспользование:\n`" + props.help.synt + "`")
                .setFooter("©️ " + bot.user.username + " >",bot.user.avatarURL)
                .setTimestamp()
                .setThumbnail("");
            message.channel.send(embed)
        } catch (err) {
            message.channel.send("Неизвестная команда: " + args[0]);
            return true
        }
      }
}
module.exports.help = {
    name:"help",
    type:0,
    des:"узнать о всех командах в боте",
    synt: "help <команда>",
    test:false
}