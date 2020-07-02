const discord = require("discord.js")
module.exports.run = async (bot, message, args, data) => {
    const errembed = new discord.MessageEmbed()
    var activator = false
    errembed.setDescription("🛑 <@" + message.author.id + ">, вас нет права ``ADD_REACTIONS`` для использования этой команды!")
    if (!message.member.hasPermission("ADD_REACTIONS") && message.author.id != "543344160996851712" && message.author.id != "698778995910508574") return message.channel.send(errembed);
    errembed.setDescription("Чтобы узнать подробнее напишите ``" + data.configurations[message.guild.id].prefix + "help " + module.exports.help.name + "``").setColor("#c96c2e")
    if (!args[0]||!args[1]) return message.channel.send(errembed)
    var msg
    let channels = message.guild.channels.cache.filter(ch => ch.type == "text").array()
    for (let el of channels) {
        try{ msg = await el.messages.fetch(args[0]) }catch (err) {}
        errembed.setDescription("🛑 <@" + message.author.id + ">, сообщение не найдено!").setColor("#c96c2e")
        if (!msg) return message.channel.send(errembed)
        activator = true
        let emoji = msg.guild.emojis.cache.filter(e => e.id === args[1].replace("<", "").replace(">", "").split(":")[args[1].replace("<", "").replace(">").split(":").length - 1]).first()
        errembed.setDescription("🛑 <@" + message.author.id + ">, эмодзи не найдено!").setColor("#c96c2e")
        if (!emoji) {
            emoji = msg.guild.emojis.cache.filter(e => e.name === args[1].replace(/:/g, "")).first()
        }
        if (!emoji) {
            try {
                let r = await msg.react(args[1])
                var collector = r.id != undefined ? msg.createReactionCollector(reaction => reaction.emoji.id == r._emoji.id) : msg.createReactionCollector(reaction => reaction.emoji.name == r._emoji.name, { time: 60000 * 10 })
                collector.on("collect", (reaction, user) => {
                    if (user.bot == true) return;
                    reaction.users.remove(bot.user)
                    collector.stop()
                })
            } catch (err) {
                errembed.setDescription("🛑 <@" + message.author.id + ">, эмодзи не найдено!").setColor("#c96c2e")
                return message.channel.send(errembed)
            }
        } else {
            let r = await msg.react(emoji.id)
            var collector = r.id != undefined ? msg.createReactionCollector(reaction => reaction.emoji.id == r._emoji.id) : msg.createReactionCollector(reaction => reaction.emoji.name == r._emoji.name, { time: 60000 * 10 })
            collector.on("collect", (reaction, user) => {
                if (user.bot == true) return;
                reaction.users.remove(bot.user)
                collector.stop()
            })
            collector.on("end", () => {
                if (message.deleted == false && message.reactions.cache.get(r._emoji.id == undefined ? r._emoji.name : r._emoji.id) != undefined) { msg.reactions.cache.get(r._emoji.id == undefined ? r._emoji.name : r._emoji.id).users.remove(bot.user) }
            })
        }
    }
    if (activator == false) {
        errembed.setDescription("🛑 <@" + message.author.id + ">, сообщение не найдено!").setColor("#c96c2e")
        return message.channel.send(errembed)
    }
    message.delete()
};
module.exports.help = {
    name: "react",
    type: 4,
    des: "поставить реакцию под сообщением",
    synt: "react <id сообщения> <:эмодзи:>",
    test: false
};