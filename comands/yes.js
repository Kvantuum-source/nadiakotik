const discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    const errembed = new discord.MessageEmbed()
    var role
    errembed.setDescription("Чтобы узнать подробнее напишите ``" + data.configurations[message.guild.id].prefix + "help " + module.exports.help.name + "``").setColor("#c96c2e")
    if (!args[0]) return message.channel.send(errembed)
    let user = message.guild.members.cache.get(args[0].replace(/\D+/g,""))
    errembed.setDescription("🛑 Данный пользователь не подавал вам заявку").setColor("#c96c2e")
    if (!data.marrymodule[message.guild.id][user.id+"||"+message.author.id]) return message.channel.send(errembed)
    for (let i in data.marrymodule[message.guild.id]) {
        let mus = data.marrymodule[message.guild.id][i]
        errembed.setDescription("🛑 <@"+message.author.id+">, вы уже заняшены!").setColor("#c96c2e")
        if (i.includes(message.author.id)==true && mus.m == true) return message.channel.send(errembed)
    }
    for(let i in data.marrymodule[message.guild.id]) {
        let us = data.marrymodule[message.guild.id][i]
        errembed.setDescription("🛑 <@"+message.author.id+">, пользователь уже заняшен!").setColor("#c96c2e")
        if (i.includes(user.id)==true && us.m == true) return message.channel.send(errembed)
    }
    data.marrymodule[message.guild.id][user.id+"||"+message.author.id].m = true
    data.marrymodule[message.guild.id][user.id+"||"+message.author.id].restimestamp = Date.now()
    embed.setDescription("💕 Поздравляю, вы с "+message.author.username+" теперь счастливая кошко-пара! Желаю вам счастья и деток котяток ;3")
        .setFooter("Я не плачу... это слезы радости")
        .setAuthor("Заявка на женитьбу",message.author.avatarURL())
        .setColor("#c96c2e")
    message.channel.send(embed)
    if (data.configurations[message.guild.id].marryrole == undefined) {
        role = await message.guild.roles.create({data:{name:"💍",color:"f5ff00"}})
        data.configurations[message.guild.id].marryrole = role.id
    }
    user.roles.add(role)
    message.member.roles.add(role)
    user.user.send(embed)
    embed.setDescription("💕 Поздравляю, вы с "+user.user.username+" теперь счастливая кошко-пара! Желаю вам счастья и деток котяток ;3")
    message.author.send(embed)
}
module.exports.help = {
    name: "yes",
    type: 2,
    des: "принять запрос на заняшивание",
    synt: "yes <юзер>",
    test: true
};