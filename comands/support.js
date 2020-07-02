const discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    if (!args[0]) {
        embed.setColor("#2F3136")
            .setTitle("Есть вопросы? обратитесь к нашей тех поддержке :3")
            .addField("**Сервер технической поддержки бота.**","https://discord.gg/uzWzE7g")
            .setFooter("Чтобы задать вопрос администрации бота, необходимо написать NADIAKOTIK в личные сообщения")
        message.channel.send(embed);
    } else {
        let mes = args.join(" ")
        embed.setDescription("`"+mes+"`").setAuthor(message.author.username+"#"+message.author.discriminator,message.author.avatarURL()).setFooter(message.guild.name+" чтобы ответить: "+message.author.id+" <сообщение>",message.guild.iconURL()).setTimestamp()
        bot.channels.cache.get("714891895628890273").send(embed)
        if (!data.support[message.author.id]) {data.support[message.author.id]=[]}
        data.support[message.author.id].push({message:mes,time:Date.now(),userid:message.author.id,type:"user"})
    }
}
module.exports.help = {
    name: "support",
    type: 4,
    des: "служба поддержки бота",
    synt: "support \nsupport <сообщение>",
    test: false
};