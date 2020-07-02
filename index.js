const express = require("express")
const app = express();
const server = require("http").createServer(app)
const io = require("socket.io").listen(server)
const moment = require("moment")
const mdb = require("mongodb")
const mdbclient = mdb.MongoClient
const ObjectID = mdb.ObjectID
var s = {}
var consolelogger = []
var connections = []
var data = {}
server.listen(process.env.PORT)
const pathfix = require("path")
const fs = require("fs")
var data
var mondb
const mongosettings = {
    user: "5e48569ae9d92f3a0ccb5bcacade0c8b",
    pass: "Zlocat2005",
    host: "9a.mongo.evennode.com:27017,9b.mongo.evennode.com:27017",
    dbname: "5e48569ae9d92f3a0ccb5bcacade0c8b",
    replica: "eu-9"
}
var newconsole = (function (oldCons) {
    return {
        log: function (msg, type) {
            oldCons.log(msg);
            if (!type) type = "info"
            if (typeof msg == "object") {
                msg = require("util").inspect(msg, true, 1)
            }
            var mess = {
                msg: msg,
                type: type,
                date: moment().utcOffset(180).format("DD-MM-YYYY hh:mm:ss ")
            };
            io.sockets.emit("newconsole", mess);
            consolelogger.push(mess)
        },
        assert: console.assert,
        clear: console.clear,
        count: console.count,
        countReset: console.countReset,
        debug: console.debug,
        dir: console.dir,
        dirxml: console.dirxml,
        error: console.error,
        exception: console.exception,
        group: console.group,
        groupCollapsed: console.groupCollapsed,
        groupEnd: console.groupEnd,
        info: console.info,
        markTimeline: console.markTimeline,
        profile: console.profile,
        profileEnd: console.profileEnd,
        table: console.table,
        time: console.time,
        timeEnd: console.timeEnd,
        timeLog: console.timeLog,
        timeStamp: console.timeStamp,
        timeline: console.timeline,
        timelineEnd: console.timelineEnd,
        trace: console.trace,
        warn: console.warn,
        memory: console.memory,
        Console: console.Console
    };
}(console));
console = newconsole;
mdbclient.connect(`mongodb://${mongosettings.user}:${mongosettings.pass}@${mongosettings.host}/${mongosettings.dbname}?replicaSet=${mongosettings.replica}`, { useUnifiedTopology: true }, (err, MongoClient) => {
    mondb = MongoClient.db()
    mondb.collection("NADIAKOTIK").find().toArray((err, res) => {
        data = res[0]
        if (!data.version) { data.version = require("./package.json").version }
    })
    mondb.collection("emit").find({ _id: ObjectID("5ee7bb1c5bc5253adce80132") }).toArray((_err, res) => {
        web = res[0]
        web.password = Math.random().toString(32).slice(3) + Math.random().toString(32).slice(3) + Math.random().toString(32).slice(3) + Math.random().toString(32).slice(3)
        mondb.collection("emit").findOneAndUpdate({ _id: ObjectID("5ee7bb1c5bc5253adce80132") }, { $set: web }, { returnOriginal: false });
        app.get("/" + web.password, () => {
            console.log("Подключение стабилизированно... загрузка файлов")
            mondb.collection("emit").find({ _id: ObjectID("5ee7bb1c5bc5253adce80132") }).toArray((_err, res) => {
                var obj = res[0].code
                var ob = Object.keys(obj)
                del("./")
                for (let a = 0; i < ob.length; i++) {
                    s[ob[a]] = fs.openSync(ob[a], "w+")
                    console.log(s[a])
                }
                for (var i in obj) {
                    write(i, obj[i])
                }
                web.password = Math.random().toString(32).slice(3) + Math.random().toString(32).slice(3) + Math.random().toString(32).slice(3) + Math.random().toString(32).slice(3)
                mondb.collection("emit").findOneAndUpdate({ _id: ObjectID("5ee7bb1c5bc5253adce80132") }, { $set: web }, { returnOriginal: false }, () => {
                    setTimeout(() => {
                        process.exit(0)
                    }, 1000 * 60)
                });
            })
        })
    })
})
try {
    const path = require("path")
    const discord = require("discord.js")
    const bot = new discord.Client()
    bot.dispatcherguild = new Map()
    bot.commands = new discord.Collection()
    const fs = require("fs")
    var numb = 0
    data.mutes = {}
    var nowactivity = 0
    var mondb
    var lastInvites = {}
    var inviter
    var member

    app.get("/console", (req, res) => {
        res.sendFile(path.join(__dirname, "/web/index.html"))
    })
    app.get("/styles.css", (req, res) => {
        res.sendFile(path.join(__dirname, "/web/styles.css"))
    })
    io.sockets.on("connection", (socket) => {
        var alloweduser = false
        var mess = { msg: "=> Server returned error status 403 [Access forbidden]!", type: "err", date: moment().format("DD-MM-YYYY hh:mm:ss ") }
        for (var i of data.allowed) {
            if (i == socket.handshake.headers["x-forwarded-for"]) { alloweduser = true }
        }
        if (alloweduser == false) {
            socket.emit("newconsole", mess)
            socket.disconnect()
            console.log(socket.handshake.headers["x-forwarded-for"] + " || " + socket.handshake.headers["user-agent"] + " => The new user tried to connect, the request was rejected with an error 403 [Access forbidden] to give access use allow(" + socket.conn.remoteAddress + ")", "err")
            return true
        }
        socket.emit("preload", consolelogger)
        connections.push(socket)
        console.log("✅ " + socket.handshake.headers["x-forwarded-for"] + " подключился к консоли!", "warn")
        socket.on("disconnect", (reason) => {
            console.log("❌ " + socket.handshake.headers["x-forwarded-for"] + " отключился от консоли!", "warn")
            connections.splice(connections.indexOf(socket), 1)
        })
        socket.on("command", command => {
            try {
                eval(command);
            } catch (err) { console.log(err, "err") }
        })
    })
    bot.on("inviteCreate", invite => {
        if (invite.guild.members.cache.get(bot.user.id).hasPermission("ADMINISTRATOR") == false) return
        invite.guild.fetchInvites().then(invites => lastInvites[invite.guild.id] = invites.array())
    })
    bot.on("inviteDelete", invite => {
        if (invite.guild.members.cache.get(bot.user.id).hasPermission("ADMINISTRATOR") == false) return
        invite.guild.fetchInvites().then(invites => lastInvites[invite.guild.id] = invites.array())
    })
    bot.on("ready", async () => {
        bot.guilds.cache.forEach(guild => {
            createDataCenter(guild.id)
        })
        bot.guilds.cache.forEach(guild => {
            if (guild.me.hasPermission("ADMINISTRATOR")) {
                guild.fetchInvites().then(invites => lastInvites[guild.id] = invites.array())
            }
        })
        setInterval(() => {
            if (nowactivity == 0) {
                bot.user.setActivity({ type: "PLAYING", name: ">help | ❤️Люблю надю❤️" })
                nowactivity = 1
            } else if (nowactivity == 1) {
                bot.guilds.cache.forEach(guild => {
                    numb = numb + guild.memberCount
                })
                bot.user.setActivity({ type: "PLAYING", name: `>help | Смотрю за ${bot.guilds.cache.size} серверами!❤️` })
                nowactivity = 2
            } else if (nowactivity == 2) {
                var num = 0
                bot.guilds.cache.forEach(guild => { num = num + guild.memberCount })
                bot.user.setActivity({ type: "PLAYING", name: `>help | ❤️Люблю всех ${num} человечков!❤️` })
                nowactivity = 0
            }
        }, 5000)
        setTimeout(() => {
            setInterval(() => {
                bot.guilds.cache.forEach(guild => {
                    if (guild.me.hasPermission("ADMINISTRATOR") == false) return
                    if (data.configurations[guild.id].serverstats.allmembers != undefined) {
                        var chid = data.configurations[guild.id].serverstats.allmembers
                        var ch = guild.channels.cache.get(chid)
                        if (ch != undefined) {
                            var namenum = ch.name.replace(/\D+/g, "")
                            ch.setName(ch.name.replace(namenum, guild.memberCount))
                        }
                    }
                    if (data.configurations[guild.id].serverstats.members != undefined) {
                        var chid = data.configurations[guild.id].serverstats.members
                        var ch = guild.channels.cache.get(chid)
                        if (ch != undefined) {
                            var namenum = ch.name.replace(/\D+/g, "")
                            ch.setName(ch.name.replace(namenum, guild.members.cache.filter(member => member.user.bot == false).size))
                        }
                    }
                    if (data.configurations[guild.id].serverstats.bots != undefined) {
                        var chid = data.configurations[guild.id].serverstats.bots
                        var ch = guild.channels.cache.get(chid)
                        if (ch != undefined) {
                            var namenum = ch.name.replace(/\D+/g, "")
                            ch.setName(ch.name.replace(namenum, guild.members.cache.filter(member => member.user.bot == true).size))
                        }
                    }
                    if (data.configurations[guild.id].serverstats.online != undefined) {
                        var chid = data.configurations[guild.id].serverstats.online
                        var ch = guild.channels.cache.get(chid)
                        if (ch != undefined) {
                            var namenum = ch.name.replace(/\D+/g, "")
                            ch.setName(ch.name.replace(namenum, guild.members.cache.filter(member => member.presence.status != "offline").size))
                        }
                    }
                    if (data.configurations[guild.id].serverstats.offline != undefined) {
                        var chid = data.configurations[guild.id].serverstats.offline
                        var ch = guild.channels.cache.get(chid)
                        if (ch != undefined) {
                            var namenum = ch.name.replace(/\D+/g, "")
                            ch.setName(ch.name.replace(namenum, guild.members.cache.filter(member => member.presence.status == "offline").size))
                        }
                    }
                    if (data.configurations[guild.id].serverstats.voiceConnected != undefined) {
                        var chid = data.configurations[guild.id].serverstats.voiceConnected
                        var ch = guild.channels.cache.get(chid)
                        if (ch != undefined) {
                            var namenum = ch.name.replace(/\D+/g, "")
                            ch.setName(ch.name.replace(namenum, guild.members.cache.filter(member => member.voice.channelID != null).size))
                        }
                    }
                    if (data.configurations[guild.id].serverstats.time != undefined) {
                        var chid = data.configurations[guild.id].serverstats.time
                        var ch = guild.channels.cache.get(chid)
                        if (ch != undefined) {
                            var namenum = ch.name.replace(/\D+/g, "")
                            var nm = namenum.substring(0, namenum.length / 2 | 0) + ":" + namenum.substring(namenum.length / 2 | 0)
                            var time = moment().utcOffset(180).format("HH:mm")
                            var newname = ch.name.replace(nm, time)
                            ch.setName(newname, "изменение времени")
                        }
                    }
                    if (data.configurations[guild.id].serverstats.date != undefined) {
                        var chid = data.configurations[guild.id].serverstats.date
                        var ch = guild.channels.cache.get(chid)
                        if (ch != undefined) {
                            var namenum = ch.name.replace(/\D+/g, "")
                            var nmone = namenum.substring(0, namenum.length / 2 | 0) + "." + namenum.substring(namenum.length / 2 | 0)
                            var date = moment().utcOffset(180).format("DD.MM")
                            var newname = ch.name.replace(nmone, date)
                            ch.setName(newname, "изменение времени")
                        }
                    }
                })
            }, 60000);
        }, 61000 - (new Date(Date.now()).getSeconds() * 1000));
        let package = require("./package.json")
        let verdataserver = package.version.split(".")
        let verdatadb = data.version.split(".")
        if (verdataserver[0]>verdatadb[0]||verdataserver[1]>verdatadb[1]||verdataserver[2]>verdatadb[2]||true==true) {
            data.version = package.version
            let changelog = require("./changelog.json")
            var pluses = ""
            var minuses = ""
            for (let changepl of changelog[package.version].plus) {
                pluses = pluses +"+"+ changepl +"\n"
            }
            for (let changepl of changelog[package.version].minus) {
                minuses = minuses +"-"+ changepl +"\n"
            }
            //await bot.guilds.cache.get("695278308182720582").channels.cache.get("707178121832431744").send("```diff\nОбновление v"+package.version+"\nЧто нового:\n\n"+pluses+minuses+"```")
        }
        fs.readdir("./comands/", (_err, files) => {
            try {
                var jsfiles = files.filter(f => f.split(".").pop() === "js");
                if (jsfiles.length <= 0) console.log("Нет комманд для загрузки", "err");
                console.log(`Загружено ${jsfiles.length} комманд`);
                jsfiles.forEach((f) => {
                    var props = require(`./comands/${f}`);
                    bot.commands.set(props.help.name, props);
                });
            } catch (err) { console.log(err) }
        });
        console.log(`Запустился бот ${bot.user.username}`);
        bot.generateInvite(["ADMINISTRATOR"]).then(link => {
            console.log(link);
        });
    })
    bot.on("guildCreate", (guild) => {
        const embed = new discord.MessageEmbed()
        embed.setDescription("Спасибо что добавили меня на этот сервер\nЧтобы получить помощь по командам выполните команду `>help` или же `>config` для настройки конфигурации, так же в боте включена возможность использовать анимированные эмодзи :emoji_name:").setColor("#c96c2e")
        if (!guild.systemChannel) {
            guild.owner.send(embed)
        } else {
            guild.systemChannel.send(embed)
        }
        createDataCenter(guild.id)
    })
    bot.on("message", async (message) => {
        if (message.channel.type == "dm") {
            if (message.author.bot == true) return
            const embed = new discord.MessageEmbed()
            embed.addField("Пользователь", "<@" + message.author.id + ">", true).addField("Сообщение", "``" + message.content + "``", true).addField("id", message.author.id, true).setAuthor(message.author.username + "#" + message.author.discriminator, message.author.avatarURL())
            bot.guilds.cache.get("695278308182720582").channels.cache.get("708739050563174400").send(embed)
        }
        if (message.author.bot == true) return;
        if (message.channel.type == "dm") return;
        console.log("{" + message.guild.name + "} {" + message.channel.name + "} {" + message.author.username + "#" + message.author.discriminator + "} " + message.content)
        var messageArray = message.content.split(" ");
        var command = messageArray[0].toLowerCase();
        var args = messageArray.slice(1);
        for (var i = 0; i <= messageArray.length; i++) {
            if (messageArray[i] == '') { messageArray.splice(i, 1); i-- }
        }
        createDataCenter(message.guild.id)
        if (!data.moneys[message.guild.id]) {
            data.moneys[message.guild.id] = {}
            data.moneys[message.guild.id][message.author.id] = { bank: 0, karman: 1000, global: 0, hourly: 0 }
        } else if (!data.moneys[message.guild.id][message.author.id]) {
            data.moneys[message.guild.id][message.author.id] = { bank: 0, karman: 1000, global: 0, hourly: 0 }
        }
        if (!message.content.startsWith(data.configurations[message.guild.id].prefix)) return;
        var cmd = bot.commands.get(command.slice(data.configurations[message.guild.id].prefix.length))
        if (cmd) cmd.run(bot, message, args, data);
    })
    bot.on("guildMemberAdd", (GuildMember) => {
        createDataCenter(GuildMember.guild.id)
        if (GuildMember.guild.members.cache.get(bot.user.id).hasPermission("ADMINISTRATOR") == false) return
        GuildMember.guild.fetchInvites().then(invite => {
            var invites = invite.array()
            var len = invites.length
            for (var i = 0; i < len; i++) {
                if (lastInvites[GuildMember.guild.id][i]) {
                    if (invites[i].uses > lastInvites[GuildMember.guild.id][i].uses) {
                        inviter = invites[i].inviter
                        if (!data.invites[GuildMember.guild.id]) {
                            data.invites[GuildMember.guild.id] = {}
                        }
                        if (!data.invites[GuildMember.guild.id][GuildMember.id]) {
                            data.invites[GuildMember.guild.id][GuildMember.id] = {
                                invitedby: inviter.id,
                                inviteduser: inviter.username + "#" + inviter.discriminator,
                                invited: 0
                            }
                        }
                        data.invites[GuildMember.guild.id][GuildMember.user.id].invitedby = inviter.id
                        if (!data.invites[GuildMember.guild.id][inviter.id]) {
                            data.invites[GuildMember.guild.id][inviter.id] = {
                                invitedby: GuildMember.guild.ownerID,
                                inviteduser: GuildMember.guild.owner.user.username + "#" + GuildMember.guild.owner.user.discriminator,
                                invited: 0
                            }
                        }
                        data.invites[GuildMember.guild.id][inviter.id].invited++
                        lastInvites[GuildMember.guild.id] = invites
                    }
                }
            }
            if (!data.invites[GuildMember.guild.id]) {
                data.invites[GuildMember.guild.id] = {}
            }
            if (data.configurations[GuildMember.guild.id].onJoinDMessage != undefined) {
                GuildMember.send(data.configurations[GuildMember.guild.id].onJoinDMessage.replace("{username}", GuildMember.user.username).replace("{servername}", GuildMember.guild.name).replace("{@username}", "<@" + GuildMember.id + ">").replace("{inviterInvites}", data.invites[GuildMember.guild.id][data.invites[GuildMember.guild.id][GuildMember.id].invitedby].invited).replace("{invitedId}", data.invites[GuildMember.guild.id][GuildMember.id].invitedby).replace("{inviteduser}", data.invites[GuildMember.guild.id][GuildMember.id].inviteduser))
            }
            if (data.configurations[GuildMember.guild.id].onJoinRole != undefined) {
                GuildMember.roles.add(GuildMember.guild.roles.cache.get(data.configurations[GuildMember.guild.id].onJoinRole))
            }
            if (data.configurations[GuildMember.guild.id].MemberJoinChannel != undefined) {
                if (data.configurations[GuildMember.guild.id].onJoinMessage != undefined) {
                    var messageAdd = data.configurations[GuildMember.guild.id].onJoinMessage.replace("{username}", GuildMember.user.username).replace("{servername}", GuildMember.guild.name).replace("{@username}", "<@" + GuildMember.id + ">").replace("{inviterInvites}", data.invites[GuildMember.guild.id][data.invites[GuildMember.guild.id][GuildMember.id].invitedby].invited).replace("{invitedId}", data.invites[GuildMember.guild.id][GuildMember.id].invitedby).replace("{inviteduser}", data.invites[GuildMember.guild.id][GuildMember.id].inviteduser)
                    GuildMember.guild.channels.cache.get(data.configurations[GuildMember.guild.id].MemberJoinChannel).send(messageAdd)
                }
            }
        })
    })
    setInterval(() => {
        writedata(data)
    }, 10000)
    setInterval(async () => {
        for (var i in data.mutes) {
            var time = data.mutes[i].time;
            var guildid = data.mutes[i].guild;
            var guild = bot.guilds.cache.get(guildid)
            if (guild != undefined) {
                member = await guild.members.fetch(i).catch(_err=>{member = undefined})
                if (!member) {
                    if (Date.now() >= time) {
                        delete data.mutes[i];
                    }
                } else {
                    if (!guild.channels.cache.random().permissionOverwrites.get(member.user.id)) {
                        guild.channels.cache.forEach(ch => {
                            ch.updateOverwrite(member.user, {
                                SEND_MESSAGES: false,
                                ATTACH_FILES: false
                            })
                        });
                    }
                    if (Date.now() >= time) {
                        delete data.mutes[i];
                        guild.channels.cache.forEach(ch => {
                            var over = ch.permissionOverwrites.get(member.user.id)
                            if (over != undefined) {
                                over.delete()
                            }
                        });
                    }
                }
            }
        }
    }, 2000)
    bot.on("voiceStateUpdate", (VoiceStateFirst, VoiceStateSecond) => {
        if (VoiceStateFirst.channelID != VoiceStateSecond.channelID) bot.emit("voiceStateUpdateChannel", VoiceStateFirst, VoiceStateSecond)
        if (VoiceStateFirst.selfDeaf != VoiceStateSecond.channelID) { }
    })
    bot.on("voiceStateUpdateChannel", async (before, after) => {
        if (before.guild.members.cache.get(bot.user.id).hasPermission("ADMINISTRATOR") == false) return
        if (data.configurations[before.guild.id].VoiceManagerCh == undefined) return
        var guild = before.guild
        var user = guild.members.cache.get(before.id)
        if (!data.ManagerChannels[guild.id]) {
            data.ManagerChannels[guild.id] = {}
        }
        if (data.ManagerChannels[guild.id][user.id] != undefined && before.channelID == data.ManagerChannels[guild.id][user.id]) {
            var ch = guild.channels.cache.get(data.ManagerChannels[guild.id][user.id])
            delete data.ManagerChannels[guild.id][user.id]
            ch.delete()
        }
        if (data.configurations[guild.id].VoiceManagerCh != undefined && after.channelID == data.configurations[guild.id].VoiceManagerCh) {
            if (data.configurations[guild.id].VoiceManagerMax != undefined && data.configurations[guild.id].VoiceManagerMax <= Object.keys(data.ManagerChannels[guild.id]).length) return;
            var userchannel = await guild.channels.create("Канал " + user.user.username, { type: "voice", parent: data.configurations[before.guild.id].VoiceManagerParent })
            after.setChannel(userchannel)
            userchannel.createOverwrite(user, { CREATE_INSTANT_INVITE: true, MANAGE_CHANNELS: true, MANAGE_ROLES: true, MANAGE_WEBHOOKS: true, VIEW_CHANNEL: true, CONNECT: true, SPEAK: true, STREAM: true, MUTE_MEMBERS: true, MOVE_MEMBERS: true, PRIORITY_SPEAKER: true })
            data.ManagerChannels[guild.id][user.id] = userchannel.id
        }
    })
    bot.on("guildMemberRemove", (GuildMember) => {
        createDataCenter(GuildMember.guild.id)
        if (GuildMember.guild.members.cache.get(bot.user.id).hasPermission("ADMINISTRATOR") == false) return
        if (!data.invites[GuildMember.guild.id]) {
            data.invites[GuildMember.guild.id] = {}
        }
        if (!data.invites[GuildMember.guild.id][GuildMember.id]) {
            data.invites[GuildMember.guild.id][GuildMember.id] = {
                invitedby: GuildMember.guild.ownerID,
                inviteduser: GuildMember.guild.owner.user.username + "#" + GuildMember.guild.owner.user.discriminator,
                invited: 0
            }
        }
        if (!data.invites[GuildMember.guild.id][GuildMember.guild.ownerID]) {
            data.invites[GuildMember.guild.id][GuildMember.guild.ownerID] = {
                invitedby: GuildMember.guild.ownerID,
                inviteduser: GuildMember.guild.owner.user.username + "#" + GuildMember.guild.owner.user.discriminator,
                invited: 0
            }
        }
        var inviter = data.invites[GuildMember.guild.id][data.invites[GuildMember.guild.id][GuildMember.id].invitedby]
        if (!data.invites[GuildMember.guild.id][inviter.id]) {
            data.invites[GuildMember.guild.id][inviter.id] = {
                invitedby: GuildMember.guild.ownerID,
                inviteduser: GuildMember.guild.owner.user.username + "#" + GuildMember.guild.owner.user.discriminator,
                invited: 0
            }
        }
        if (data.invites[GuildMember.guild.id][GuildMember.id].invitedby != GuildMember.guild.ownerID) {
            data.invites[GuildMember.guild.id][data.invites[GuildMember.guild.id][GuildMember.user.id].invitedby].invited--
        }
        if (data.configurations[GuildMember.guild.id].MemberLeaveChannel != undefined) {
            if (data.configurations[GuildMember.guild.id].onLeaveMessage != undefined) {
                var messageAdd = data.configurations[GuildMember.guild.id].onLeaveMessage.replace("{username}", GuildMember.user.username).replace("{servername}", GuildMember.guild).replace("{@username}", "<@" + GuildMember.id + ">").replace("{inviterInvites}", data.invites[GuildMember.guild.id][inviter.id].invited).replace("{invitedId}", data.invites[GuildMember.guild.id][GuildMember.user.id].invitedby).replace("{inviteduser}", data.invites[GuildMember.guild.id][GuildMember.user.id].inviteduser)
                GuildMember.guild.channels.cache.get(data.configurations[GuildMember.guild.id].MemberLeaveChannel).send(messageAdd)
            }
        }
    })
    bot.on('raw', async event => {
        if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(event.t)) return;
        const { d: data } = event;
        const channel = await bot.channels.fetch(data.channel_id)
        if (channel.messages.cache.has(data.message_id)) return;
        const message = await channel.messages.fetch(data.message_id)
        const reaction = await message.reactions.cache.get(data.emoji.id ? data.emoji.id : data.emoji.name);
        if (reaction) reaction.users.cache.set(data.user_id, bot.users.fetch(data.user_id));
        if (event.t === 'MESSAGE_REACTION_ADD') {
            bot.emit('messageReactionAdd', reaction, (await bot.users.fetch(data.user_id)));
        }
        if (event.t === 'MESSAGE_REACTION_REMOVE') {
            bot.emit('messageReactionRemove', reaction, (await bot.users.fetch(data.user_id)));
        }
    });
    bot.on("messageReactionAdd", async (reaction, user) => {
        if (reaction.message.guild.members.cache.get(bot.user.id).hasPermission("ADMINISTRATOR") == false) return
        if (user.bot == true) return
        if (!data.rfr[reaction.message.guild.id]) return
        if (!data.rfr[reaction.message.guild.id][reaction.message.id]) return
        if (!data.rfr[reaction.message.guild.id][reaction.message.id][reaction.emoji.identifier] && !data.rfr[reaction.message.guild.id][reaction.message.id][reaction.emoji.name]) return
        var mess = data.rfr[reaction.message.guild.id][reaction.message.id]
        var role = await reaction.message.guild.roles.fetch(mess[reaction.emoji.identifier] || mess[reaction.emoji.name])
        if (!role) return true
        var guilduser = await reaction.message.guild.members.fetch(user.id)
        guilduser.roles.add(role)
    })
    bot.on("messageReactionRemove", async (reaction, user) => {
        if (reaction.message.guild.members.cache.get(bot.user.id).hasPermission("ADMINISTRATOR") == false) return
        if (user.bot == true) return
        if (!data.rfr[reaction.message.guild.id]) return;
        if (!data.rfr[reaction.message.guild.id][reaction.message.id]) return
        if (!data.rfr[reaction.message.guild.id][reaction.message.id][reaction.emoji.identifier] && !data.rfr[reaction.message.guild.id][reaction.message.id][reaction.emoji.name]) return
        var mess = data.rfr[reaction.message.guild.id][reaction.message.id]
        var role = await reaction.message.guild.roles.fetch(mess[reaction.emoji.identifier] || mess[reaction.emoji.name])
        if (!role) return true
        var guilduser = await reaction.message.guild.members.fetch(user.id)
        guilduser.roles.remove(role)
    })
    bot.on("message", async message => {
        const embed = new discord.MessageEmbed()
        if (message.content.replace(/ /g, "") == "<@!666472116937424906>") {
            embed.setDescription("<@" + message.author.id + ">, мой текущий префикс на этом сервере ``" + data.configurations[message.guild.id].prefix + "``").setColor("#c96c2e")
            message.channel.send(embed)
        }
        if (message.channel.type != "dm" && message.channel.id == "714891895628890273" && message.author.bot == false) {
            var args = message.content.split(" ")
            var user = bot.users.cache.get(args[0].replace(/\D+/g, ""))
            if (!user) return
            if (!data.support[user.id]) return
            var parsedargs = args.slice(1)
            embed.setDescription("`" + parsedargs.join(" ") + "`").setAuthor("Агент тех поддержки #" + message.author.discriminator, bot.user.avatarURL()).setTimestamp()
            data.support[user.id].push({ message: parsedargs.join(" "), time: Date.now(), userid: user.id, type: "admin" })
            user.send(embed)
        } else if (message.channel.type == "dm" && message.author.bot == false) {
            const usembed = new discord.MessageEmbed()
            usembed.setDescription("Ваше обращение было передано команде поддержки").setAuthor(message.author.username + "#" + message.author.discriminator, message.author.avatarURL())
            message.author.send(usembed)
            embed.setDescription("`" + message.content + "`").setAuthor(message.author.username + "#" + message.author.discriminator, message.author.avatarURL()).setFooter("чтобы ответить: " + message.author.id + " <сообщение>", bot.user.avatarURL()).setTimestamp()
            if (!data.support[message.author.id]) { data.support[message.author.id] = [{ message: message.content, time: Date.now(), userid: message.author.id, type: "user" }] } else {
                data.support[message.author.id].push({ message: message.content, time: Date.now(), userid: message.author.id, type: "user" })
            }
            bot.channels.cache.get("714891895628890273").send(embed)
        }
        if (message.channel.type == "dm" || !message.guild.me.hasPermission("MANAGE_WEBHOOKS")) return
        if (message.author.bot != true && message.channel.type != "dm") {
            var ma = message.content.replace(/::/g, ": :")
            var messageArray = ma.split(" ");
            var i = 0
            var redacted = false
            if (messageArray[0] == data.configurations[message.guild.id].prefix + "react" || messageArray[0] == data.configurations[message.guild.id].prefix + "emojimanager") return;
            for (var ar of messageArray) {
                if (ar.includes(":") == true) {
                    var em = message.guild.emojis.cache.filter(emo => emo.name == ar.replace(/:/g, "")).first()
                    if (em != undefined && em.animated == true) {
                        messageArray[i] = "<a:" + em.name + ":" + em.id + ">"
                        redacted = true
                    }
                }
                i++
            }
            if (redacted == true) {
                var webhook = await message.channel.createWebhook(message.guild.members.cache.get(message.author.id).displayName, { avatar: message.author.avatarURL(), reason: "Новое сообщение с анимированным эмодзи" })
                webhook.send(messageArray.join(" ")).then(msg => {
                    webhook.delete()
                    if (message.deleted == false) { message.delete() }
                })
            }
        }
    })
    bot.login("NjY2NDcyMTE2OTM3NDI0OTA2.XqVEcw.uC5rR5pzEQa4JJSUyuybRsZq2cc")

    function writedata(writing) {
        mondb.collection("NADIAKOTIK").findOneAndReplace({
            _id: ObjectID("5ec44b879dcb822ccc704207")
        }, writing)
    }
    function createDataCenter(id) {
        if (!data.configurations[id]) {
            data.configurations[id] = {
                prefix: ">",
                marryrole: undefined,
                onJoinRole: undefined,
                MemberJoinChannel: undefined,
                MemberLeaveChannel: undefined,
                onJoinMessage: undefined,
                onLeaveMessage: undefined,
                serverstats: {
                    parentid: undefined,
                    allmembers: undefined,
                    members: undefined,
                    bots: undefined,
                    online: undefined,
                    offline: undefined,
                    voiceConnected: undefined
                }
            }
        }
    }
    setTimeout(()=>{
        setInterval(() => {
            Object.keys(data.moneys).forEach((sv) => {
                Object.keys(data.moneys[sv]).forEach((us) => {
                    data.moneys[sv][us].karman = data.moneys[sv][us].bank > 0 && data.moneys[sv][us].bank != undefined ? data.moneys[sv][us].karman + (data.moneys[sv][us].bank * 5 / 100) : data.moneys[sv][us].karman
                })
            });
        }, 3600000)
    }, () => {var nowdate = new Date(Date.now() + 10800000);return((60 - nowdate.getUTCMinutes()) * 60000 + (61 - nowdate.getUTCSeconds()) * 1000)})

    function allow(userip) {
        console.log("Был выдан доступ к консоли пользователю " + userip + "!", "warn");
        data.allowed.push(userip)
    }
    function read(dir, started, files_) {
        files_ = files_ || {}
        started = !started ? dir : started
        var files = fs.readdirSync(dir)
        for (var i in files) {
            var name = dir == started ? dir + files[i] : dir + "/" + files[i]
            if (fs.statSync(name).isDirectory()) {
                if (files[i] != "node_modules" && files[i] != ".vs") { read(name, files_, started) }
            } else {
                files_[name] = fs.readFileSync(name, { encoding: "binary" })
            }
        }
        return files_
    }
    function del(dir, files_, started) {
        files_ = files_ || {}
        started = !started ? dir : started
        var files = fs.readdirSync(dir)
        for (var i in files) {
            var name = dir == started ? dir + files[i] : dir + "/" + files[i]
            if (fs.statSync(name).isDirectory()) {
                if (files[i] != "node_modules" && files[i] != ".vs") {
                    read(name, files_, started)
                    fs.rmdir(name, () => { })
                }
            } else {
                fs.unlinkSync(name)
            }
        }
    }
    function write(dir, content) {
        let pathf = dir.split("/")
        pathf.splice(0, 1)
        pathf.splice(pathf.length - 1, 1)
        for (var folder in pathf) {
            var p = ""
            for (var i = 0; i <= folder; i++) {
                p += pathf[i] + "/"
            }
            try { fs.readdirSync(p, "binary") } catch (err) {
                fs.mkdirSync(p, () => { })
            }
        }
        file = dir.split("/")
        file.splice(0, file.length - 1)
        fs.writeFileSync(pathfix.join(__dirname, dir.replace(".", "")), content, { encoding: "binary" })
    }
} catch (err) { console.log(err, "err") }
process.on("warning", (warning) => console.log(warning.name + " " + warning.stack, "err"))