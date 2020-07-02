const discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
        .setColor("#c96c2e")
        .setTitle("Пригласить бота на север")
        .setThumbnail(bot.user.avatarURL())
        .addField("**Пригласить бота на свой сервер**","https://discord.com/oauth2/authorize?client_id=666472116937424906&scope=bot&permissions=2147483647")
        .addField("Присоединиться на сервер тех. поддержки", "https://discord.gg/uzWzE7g")
    message.channel.send(embed);
}
module.exports.help = {
    name: "invite",
    type: 0,
    des: "пригласить меня на свой сервер",
    synt: "invite",
    test: false
};