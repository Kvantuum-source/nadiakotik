const discord = require("discord.js");
const fs = require("fs");
const request = require('request');
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    const errembed = new discord.MessageEmbed()
    const chembed = new discord.MessageEmbed()
    errembed.setDescription("Чтобы узнать подробнее напишите ``" + data.configurations[message.guild.id].prefix + "help " + module.exports.help.name + "``")
    if (!args[0]) return message.channel.send(errembed)
    let user = message.guild.members.cache.get(args[0].replace(/\D+/g,""))
    errembed.setDescription("🛑 <@"+message.author.id+">, пользователь не найден!").setColor("#c96c2e")
    if (!user) return message.channel.send(errembed)
    errembed.setDescription("🛑 <@"+message.author.id+">, извините но я не могу вас заняшить с собой же!").setColor("#c96c2e")
    if (user.id == message.author.id) return message.channel.send(errembed)
    errembed.setDescription("🛑 <@"+message.author.id+">, пластите но я не хочу, я очень занятой ботик и люблю только надю ,_,").setColor("#c96c2e")
    if (user.id == bot.user.id) return message.channel.send(errembed)
    errembed.setDescription("🛑 <@"+message.author.id+">, вы действительно хотите заняшиться с ботиком?").setColor("#c96c2e")
    if (user.bot == true) return message.channel.send(errembed)
    if (!data.marrymodule[message.guild.id]) {
        data.marrymodule[message.guild.id] = {}
    }
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
    if(!args[1]) {args[1]="Нет приписания"}
    data.marrymodule[message.guild.id]
    data.marrymodule[message.guild.id][message.author.id+"||"+user.id] = {timestamp: Date.now(),restimestamp:0,guild:message.guild.id}
    embed.setDescription(`Пользователь **${message.author.tag}** подал заявку на заняшивание с вами на сервере **${message.guild.name}**`)
        .addField("Чтобы принять напишите","\`>yes @"+message.author.username+"`")
        .addField("Чтобы отклонить напишите","\`>no @"+message.author.username+"`")
        .addField("P.S.",args.slice(1).join(" "))
        .setAuthor("Заявка на заняшевание",message.author.avatarURL())
        .setColor("#c96c2e")
        .setFooter(message.guild.name)
    user.send(embed);
    chembed.setDescription("💝 <@"+message.author.id+">, вы подали запрос на заняшивание с <@"+user.id+">")
    message.author.send(chembed)
}
module.exports.help = {
    name: "marry",
    type: 3,
    des: "подать запрос на заняшивание с другим котиком",
    synt: "marry <юзер>",
    test: false
};