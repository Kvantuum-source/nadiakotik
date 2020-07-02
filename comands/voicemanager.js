const discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, data) => {
    const errembed = new discord.MessageEmbed()
    const embed = new discord.MessageEmbed()
    errembed.setDescription("Я не могу реализовать свой функционал из-за нехватки прав, пожалуйста выдайте мне право ``MANAGE_CHANNELS``")
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(errembed)
    errembed.setDescription("🛑 <@"+message.author.id+">, вас нет права ``MANAGE_CHANNELS`` для использования этой команды!").setColor("#c96c2e")
    if(!message.member.hasPermission("MANAGE_CHANNELS")&&message.author.id !="543344160996851712"&&message.author.id !="698778995910508574") return message.channel.send(errembed);
    errembed.setDescription("Чтобы узнать подробнее напишите ``"+data.configurations[message.guild.id].prefix+"help "+module.exports.help.name+"``").setColor("#c96c2e")
    if (!args[0]) return message.channel.send(errembed)
    switch (args[0]) {
        case "max":
            errembed.setDescription("🛑 <@"+message.author.id+">, введите положительное число").setColor("#c96c2e")
            if (isNaN(parseInt(args[1]))==true && args[1] != "нет") return message.channel.send(errembed)
            if (parseInt(args[1])<0) return message.channel.send(errembed)
            data.configurations[message.guild.id].VoiceManagerMax = args[1]=="нет"?undefined:parseInt(args[1])
            args[1] == "нет"?embed.setDescription("✅ максимум пользовательских каналов был удален").setColor("#c96c2e"):embed.setDescription("✅ установлен новый максимум пользовательских каналов - ``"+args[1]+"``").setColor("#c96c2e")
            message.channel.send(embed)
            break;
        case "create":
            if (data.configurations[message.guild.id].VoiceManagerCh != undefined && message.guild.channels.cache.has(data.configurations[message.guild.id].VoiceManagerCh) == true) {
                message.guild.channels.cache.get(data.configurations[message.guild.id].VoiceManagerCh).delete()
                if (message.guild.channels.cache.has(data.configurations[message.guild.id].VoiceManagerParent)==true) {
                    message.guild.channels.cache.get(data.configurations[message.guild.id].VoiceManagerParent).delete()
                }
            }
            let parent = await message.guild.channels.create("Приваты",{type:"category"})
            data.configurations[message.guild.id].VoiceManagerParent = parent.id
            let ch = await message.guild.channels.create("Создать приватик",{parent:parent.id,type:"voice"})
            data.configurations[message.guild.id].VoiceManagerCh = ch.id
            embed.setDescription("✅ менеджер приватных каналов был успешно создан").setColor("#c96c2e")
            message.channel.send(embed)
            break
        case "delete":
            errembed.setDescription("🛑 <@"+message.author.id+">, менеджер приватных каналов уже выключен").setColor("#c96c2e")
            if (data.configurations[message.guild.id].VoiceManagerCh == undefined || message.guild.channels.cache.has(data.configurations[message.guild.id].VoiceManagerCh) == false && message.guild.channels.cache.has(data.configurations[message.guild.id].VoiceManagerParent)==false) return message.channel.send(errembed)
            if (message.guild.channels.cache.has(data.configurations[message.guild.id].VoiceManagerCh) == true) message.guild.channels.cache.get(data.configurations[message.guild.id].VoiceManagerCh).delete()
            if (message.guild.channels.cache.has(data.configurations[message.guild.id].VoiceManagerParent) == true) message.guild.channels.cache.get(data.configurations[message.guild.id].VoiceManagerParent).delete()
            embed.setDescription("✅ менеджер приватных каналов был отключен").setColor("#c96c2e")
            message.channel.send(embed)
            break
        default:
            errembed.setDescription("Чтобы узнать подробнее напишите ``"+data.configurations[message.guild.id].prefix+"help "+module.exports.help.name+"``").setColor("#c96c2e")
            message.channel.send(errembed)
            break;
    }
}
module.exports.help = {
    name: "voicemanager",
    type: 4,
    des: "голосовые каналы для пользователей",
    synt: "voicemanager <max> <цифра/нет>\nvoicemanager <create/delete>",
    test: false
};



