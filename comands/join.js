const discord = require("discord.js");
const gamelist = {
    "tictactoe": { maxusers: 2, timer: 120 }
}
const MFR = require("../MFR/index.js")
const numbers = {
    0:":one:",
    1:":two:",
    2:":three:",
    3:":four:",
    4:":five:",
    5:":six:",
    6:":seven:",
    7:":eight:",
    8:":nine:"
}
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    const errembed = new discord.MessageEmbed()
    errembed.setDescription("Чтобы узнать подробнее напишите ``" + data.configurations[message.guild.id].prefix + "help " + module.exports.help.name + "``")
    if (!args[0]) return message.channel.send(errembed)
    args[0] = args[0].replace(/\D+/g,"")
    if (!data.games[message.guild.id][args[0]]) return message.channel.send(errembed)
    var user = await message.guild.members.cache.get(data.games[message.guild.id][args[0]].creator)
    errembed.setDescription().setColor().setFooter(bot.user.username).setTimestamp()
    if (!user) return message.channel.send(errembed)
    errembed.setDescription().setColor().setFooter(bot.user.username).setTimestamp()
    if (data.games[message.guild.id][args[0]].users.indexOf(message.author.id) != -1) return message.channel.send(errembed)
    switch (data.games[message.guild.id][args[0]].type) {
        case "tictactoe":
            let field = [
                undefined, undefined, undefined,
                undefined, undefined, undefined,
                undefined, undefined, undefined
            ]
            let fieldfixed = fieldfix(field)
            data.games[message.guild.id][args[0]].started = true
            let botmsg = await message.channel.send(embed)
            require("../MFR/index").syncreact(message, ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"])
            embed.setDescription("**" + message.author.username + " против " + user.user.username + "**\n\n" + fieldfixed + "").setAuthor("TICTACTOE", bot.user.avatarURL()).setColor().setFooter(bot.user.username).setTimestamp()

            function fieldfix(field) {
                let output = ""
                for (let i in field) {
                    switch (field[i]) {
                        case undefined:
                            field[i] = numbers[i]
                            break;
                        case "x":
                            field[i] = ":o:"
                            break;
                        case "о":
                            field[i] = ":x:"
                            break;
                    }
                }
                for (let i in field) {
                    if (i == 0 || i == 1 || i == 6 || i == 7 || i == 3 || i == 4) {
                        field[i] = field[i] + " ⏐ "
                    } else if (i == 2 || i == 5) {
                        field[i] = field[i] +"\n――――――\n"
                    }
                }
                let all = field.join("")
                return all
            }
            break;
        default:
            errembed.setDescription().setFooter(bot.user.username).setTimestamp()
            return message.channel.send(errembed)
            break;
    }
}
module.exports.help = {
    name: "join",
    type: 3,
    des: "присоединиться к игре",
    synt: "join <@юзер>",
    test: true
};
