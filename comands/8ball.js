const discord = require("discord.js");
const fs = require("fs");
var answers = [
    "Вперед!",
    "Не сейчас",
    "Не делай этого",
    "Ты шутишь?",
    "Да, но позднее",
    "Думаю,не стоит",
    "Не надейся на это",
    "Ни в коем случае",
    "Это неплохо",
    "Кто знает?",
    "Туманный ответ, попробуй еще",
    "Я не уверен",
    "Я думаю, да",
    "Забудь об этом",
    "Это возможно",
    "Определенно да",
    "Быть может",
    "Слишком рано",
    "Да",
    "Конечно, да",
    "Даже не думай",
    "Лучше Вам пока этого не знать"
];
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    const errembed = new discord.MessageEmbed()
    embed.setAuthor("8ball","https://c7.hotpng.com/preview/376/650/386/8-ball-pool-8ball-pool-champions-game-clip-art-8-ball-pool.jpg").setDescription(answers[Math.floor(Math.random()*answers.length)]).setFooter(bot.user.username).setTimestamp()
    if (!args[0]) return message.channel.send(errembed)
    message.channel.send(embed)
}
module.exports.help = {
    name: "8ball",
    type: 3,
    des: "задать вопрос боту",
    synt: "8ball <вопрос>",
    test: false
};