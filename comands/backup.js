const discord = require("discord.js")
const fs = require("fs")
const moment = require("moment")
const encoder = require("../MFR/index")
const request = require("request")
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    const errembed = new discord.MessageEmbed()
    errembed.setDescription("Чтобы узнать подробнее напишите ``" + data.configurations[message.guild.id].prefix + "help " + module.exports.help.name + "``").setColor("#c96c2e")
    if (!args[0]) return message.channel.send(errembed)
    errembed.setDescription("Я не могу реализовать свой функционал из-за нехватки прав, пожалуйста выдайте мне право ``ADMINISTRATOR``")
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(errembed)
    errembed.setDescription("🛑 <@" + message.author.id + ">, вас нет права ``Создатель сервера`` для использования этой команды!").setColor("#c96c2e")
    if (message.author.id!=message.guild.ownerID) return message.channel.send(errembed)
    switch (args[0]) {
        case "create":
            embed.setTitle("Было начато создание бэкапа сервера").setDescription("\nвам в личные сообщения будет отправлен файл с бэкапом этого сервера").setTimestamp().setFooter("Вы можете обратиться в службу поддержки за выдачей вам последнего сохраненного бэкапа сервера "+bot.user.username)
            message.channel.send(embed)
            var savedata = {}
            var roles = {}
            var channels = {}
            var guildinfo = {}
            var encdata
            message.guild.roles.cache.forEach(role=>{
                if (role.id!=message.guild.id&&role.managed==false) {
                    roles[role.id]={c:role.hexColor,h:role.hoist,m:role.mentionable,n:role.name,pos:role.permissions,per:role.position}
                } else if (role.id==message.guild.id) {
                    roles["everyone"]={c:role.hexColor,h:role.hoist,m:role.mentionable,n:role.name,pos:role.permissions,per:role.position}
                }
            })
            message.guild.channels.cache.forEach(channel=>{
                var overwrites = {}
                channel.permissionOverwrites.forEach(po=>{
                    overwrites[po.id] = {a:po.allow,d:po.deny}
                })
                channels[channel.id] = {
                    n:channel.name,
                    t:channel.type,
                    o:overwrites,
                    p:channel.parent,
                    topic:channel.topic,
                    nsfw:channel.nsfw,
                    b:channel.bitrate,
                    u:channel.userlimit,
                    r:channel.rateLimitPerUser
                }
            })
            guildinfo = {
                afkch:message.guild.afkChannelID,
                afktime:message.guild.afkTimeout,
                a:message.guild.available,
                b:message.guild.banner,
                dmn:message.guild.defaultMessageNotifications,
                i:message.guild.iconURL(),
                r:message.guild.region,
                e:message.guild.explicitContentFilter,
                s:message.guild.systemChannel,
                v:message.guild.verificationLevel
            }
            savedata={roles:roles,channels:channels,guildinfo:guildinfo}
            encoder.encode(JSON.stringify(savedata),data.encode,(encoded)=>{encdata=encoded})
            fs.writeFile("./storage/"+message.guild.id+".nks",encdata,{encoding:"utf-8"},()=>{
                const attachment = new discord.MessageAttachment("./storage/"+message.guild.id+".nks",moment().utcOffset(180).format("DD-MM-YYYY hh:mm:ss")+".nks")
                message.author.send(attachment)
            })
            break;
        case "load":
            var backup
            errembed.setDescription("🛑 <@" + message.author.id + ">, сперва прикрепите файл бэкапа сервера!").setColor("#c96c2e")
            if (!message.attachments.filter(at=>at.name.endsWith(".nks")).first()) return message.channel.send(errembed)
            request(message.attachments.filter(at => at.name.endsWith(".nks")).first().url, (err, req, body) => {
                encoder.decode(body, data.encode, async (decoded) => {
                    try {
                        backup = JSON.parse(decoded)
                        message.delete()
                        embed.setAuthor(message.author.username + "#" + message.author.discriminator, message.author.avatarURL()).setTitle("Подтвердите это действие").setDescription("Вы уверены что хотите начать загрузку бэкапа?\nДанное действие невозможно будет отменить!").addField("Да я уверен(а)", "🚩", true).addField("Нет, не нужно", "❎", true).setTimestamp().setFooter(bot.user.username)
                        let botmsg = await message.channel.send(embed)
                        botmsg.react("🚩").then(() => {
                            botmsg.react("❎")
                        })
                        let yes = botmsg.createReactionCollector((reaction, user) => reaction.emoji.name == "🚩" && user.id == message.author.id, { time: 60000 })
                        let no = botmsg.createReactionCollector((reaction, user) => reaction.emoji.name == "❎" && user.id == message.author.id, { time: 60000 })
                        yes.on("collect", async (_reaction) => {
                            errembed.setDescription("🛑 <@" + message.author.id + ">, роль NADIAKOTIK должна находиться в лестнице ролей на первом месте, иначе восстановление может закончится некорректно!").setColor("#c96c2e")
                            if (message.guild.me.roles.highest.position != message.guild.roles.cache.size - 1) return message.channel.send(errembed)
                            botmsg.reactions.removeAll()
                            no.stop()
                            yes.stop()
                            message.guild.channels.cache.forEach(ch => { ch.delete() })
                            message.guild.roles.cache.forEach(role => { if (role.position < message.guild.me.roles.highest.position && role.id != message.guild.id) { role.delete() } })
                            var newoldch = {}
                            var newoldrl = {}
                            for (let i in backup.roles) {
                                if (i != "everyone") {
                                    let o = await message.guild.roles.create({
                                        data: {
                                            name: backup.roles[i].n,
                                            color: backup.roles[i].c,
                                            hoist: backup.roles[i].h,
                                            mentionable: backup.roles[i].m,
                                            permissions: backup.roles[i].pos,
                                            position: backup.roles[i].per
                                        }
                                    })
                                    newoldrl[i] = o.id
                                } else {
                                    let everyone = message.guild.roles.cache.get(message.guild.id)
                                    everyone.edit({
                                        name: backup.roles[i].n,
                                        color: backup.roles[i].c,
                                        hoist: backup.roles[i].h,
                                        mentionable: backup.roles[i].m,
                                        permissions: backup.roles[i].pos,
                                        position: backup.roles[i].per
                                    })
                                }
                            }
                            for (let i in backup.channels) {
                                if (backup.channels[i].t == "category") {
                                    let p = await message.guild.channels.create(backup.channels[i].n, {
                                        type: "category",
                                        topic: backup.channels[i].topic,
                                        nsfw: backup.channels[i].nsfw,
                                        rateLimitPerUser: backup.channels[i].r,
                                        userlimit: backup.channels[i].u,
                                        bitrate: backup.channels[i].b,
                                        parent: backup.channels[i].p
                                    })
                                    newoldch[i] = p.id
                                }
                            }
                            for (let i in backup.channels) {
                                if (backup.channels[i].t != "category") {
                                    backup.channels[i].p = backup.channels[i].p == null ? null : newoldch[backup.channels[i].p.id]
                                    message.guild.channels.create(backup.channels[i].n, {
                                        type: backup.channels[i].t,
                                        topic: backup.channels[i].topic,
                                        nsfw: backup.channels[i].nsfw,
                                        rateLimitPerUser: backup.channels[i].r,
                                        userlimit: backup.channels[i].u,
                                        bitrate: backup.channels[i].b,
                                        parent: backup.channels[i].p
                                    })
                                }
                            }
                        })
                        no.on("collect", () => {
                            no.stop()
                            yes.stop()
                            botmsg.delete()
                        })
                    } catch (e) {
                        errembed.setDescription("🛑 <@" + message.author.id + ">, файл был поврежден!").setColor("#c96c2e")
                        message.delete()
                        return message.channel.send(errembed)
                    }
                })
            })
            break;
        default:
            break;
    }
}
module.exports.help = {
    name: "backup",
    type: 4,
    des: "сохранение/загрузка бэкапов сервера",
    synt: "backup <create/load> <прикрепленный файл бэкапа>",
    test: false
};