const discord = require("discord.js");
module.exports.run = async (bot, message, args, data) => {
    const errembed = new discord.MessageEmbed()
    errembed.setDescription("🛑 <@" + message.author.id + ">, вас нет права ``BAN_MEMBERS`` для использования этой команды!")
    if (!message.member.hasPermission("BAN_MEMBERS") && message.author.id != "543344160996851712" && message.author.id != "698778995910508574") return message.channel.send(errembed);
    errembed.setDescription("Чтобы узнать подробнее напишите ``" + data.configurations[message.guild.id].prefix + "help " + module.exports.help.name + "``").setColor("#c96c2e")
    if (!args[0]) return message.channel.send(errembed)
    var item = "";
    var time;
    var winnerCount;
    for (var i = 2; i < args.length; i++){
        item += (args[i] + " ");
    }
    winnerCount = parseInt(args[0]);
    time = parseInt(args[1]);
    if (isNaN(time) == true) return;
    var giveEmbed = new discord.MessageEmbed();
    giveEmbed.setTitle("<a:Holiday:721746453944598530> Розыгрыш <a:Holiday:721746453944598530>");
    giveEmbed.setDescription(`\nПриз: ${item} \n\nСоздал розыгрыш: ${message.author}`)
    let embedSent = await message.channel.send(giveEmbed);
    let react = await embedSent.react("721746453944598530");
    setTimeout(async function() {
        var reactFetch = await react.fetch("721746453944598530");
        var peopleReacted = reactFetch.users.cache.filter(us => us.bot == false);
        var winners = [];
        if (peopleReacted.size >= winnerCount) {
            winners = peopleReacted;
        } else {
            for (var i = 0; i < winnerCount; i++){
                var index = Math.floor(Math.random() * peopleReacted.length);
                winners.push(peopleReacted[index]);
                peopleReacted.splice(index, 1);
            }
        }
        var winnerMsg = "Участник(и) ";
        for (var i = 0; i < winners.length; i++){
            if (!winners[i]) { } else {
                winnerMsg += ('<' + '@' + winners[i] + '>' + " ");
            }
        }
        var Embed = new discord.MessageEmbed();
        Embed.setTitle("<a:Holiday:721746453944598530> Розыгрыш завершён! <a:Holiday:721746453944598530>").setColor(bot.color).setFooter(bot.user.username+" Розыгрыш завершится ").setTimestamp(Date.now()+time*1000)
        peopleReacted[0] == undefined ? Embed.setDescription("Победителей нет, так как никто не поставил реакицю") : Embed.setDescription(`${winnerMsg} выиграл(и) ${item}`)
        message.channel.send(Embed);
    }, time * 1000);
};
module.exports.help = {
  name: "giveaway",
  type: 1,
  des: "Это пользовательская команда",
  synt: "giveaway <кол-во победителей> <время в секундах> <приз>",
  test: true
};
