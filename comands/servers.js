const discord = require("discord.js")
const fs = require("fs")
module.exports.run = async(bot, message, args, data) => {
    let embed = new discord.MessageEmbed()
    const errembed = new discord.MessageEmbed()
    var add=""
    var i = 0
    var list = []
    var allmembers = 0
    var page = 1
    errembed.setDescription("🛑 <@"+message.author.id+">, вас нет права ``BOT_CREATOR`` для использования этой команды!")
    if (message.author.id != "543344160996851712"&&message.author.id != "414733597782704128"&&message.author.id !="698778995910508574") return message.channel.send(errembed)
    bot.guilds.cache.forEach((guild)=>{
        list.push({
            id:guild.id,
            name:guild.name,
            members:guild.memberCount,
            channels:guild.channels.cache.size,
            rolesnum:guild.roles.cache.size,
            url:guild.iconURL(),
            creator:guild.owner
        })
    })
    list.sort(function (a, b) {
        if (a.members > b.members) {
            return -1;
        }
        if (a.members < b.members) {
            return 1;
        }
        return 0;
    });
    let maxpage = Math.ceil(list.length/10)
    for (let inf of list) {
        i++
        inf.number = i
        allmembers = allmembers + inf.members
        if (i>10) {} else {
            add = add+"{"+inf.number+"}** "+inf.name+" - **``"+inf.members+"``** котят **\n"
        }
    }
    if (!args[0]) {
        embed.setDescription("**Список серверов на которых я есть**\n\n" + add + "\n**Всего котят:** ``" + allmembers + "``\n**Всего серверов:** ``" + bot.guilds.cache.size + "``").addField(`Страница`, page + "/" + maxpage, false).setColor("#c96c2e")
        let botmsg = await message.channel.send(embed)
        botmsg.react("🔼").then(()=>{
            botmsg.react("🔽")
        })
        let rcollectorup = botmsg.createReactionCollector((reaction,user)=>reaction.emoji.name === "🔽" && user.id == message.author.id, {time:120000})
        rcollectorup.on("collect",(messagereaction,user)=>{
            messagereaction.users.remove(user)
            embed = new discord.MessageEmbed()
            add = ""
            allmembers = 0
            page++
            i = 0
            for (let inf of list) {
                i++
                allmembers = allmembers + inf.members
                if (i>page*10 || i<page*10-10) {} else {
                    add = add+"{"+inf.number+"}** "+inf.name+" - **``"+inf.members+"``** котят **\n"
                }
            }
            if (page == maxpage) {
                let but = maxpage*10 - i
                for (let i;but>0;but--) {
                    if (but == 1) {
                        add = add + "*Вот и конец этого ~~длинного~~ списка ;D*"
                    } else {
                        add = add+"\n"
                    }
                }
            }
            embed.setDescription("**Список серверов на которых я есть**\n\n"+add+"\n**Всего котят:** ``"+allmembers+"``\n**Всего серверов:** ``"+bot.guilds.cache.size+"``").addField(`Страница`,page+"/"+maxpage,false).setColor("#c96c2e")
            botmsg.edit(embed)
        })
        let rcollectordown = botmsg.createReactionCollector((reaction,user)=>reaction.emoji.name === "🔼" && user.id == message.author.id, {time:120000})
        rcollectordown.on("collect",(messagereaction,user)=>{
            messagereaction.users.remove(user)
            embed = new discord.MessageEmbed()
            add = ""
            allmembers = 0
            page--
            i = 0
            for (let inf of list) {
                i++
                allmembers = allmembers + inf.members
                if (i>page*10 || i<page*10-10) {} else {
                    add = add+"{"+inf.number+"}** "+inf.name+" - **``"+inf.members+"``** котят **\n"
                }
            }
            embed.setDescription("**Список серверов на которых я есть**\n\n"+add+"\n**Всего котят:** ``"+allmembers+"``\n**Всего серверов:** ``"+bot.guilds.cache.size+"``").addField(`Страница`,page+"/"+maxpage,false).setColor("#c96c2e")
            botmsg.edit(embed)
        })
    } else if (isNaN(parseInt(args[0]))==false) {
        let getted = list.filter((value,index)=>value.number === parseInt(args[0]))[0]
        var invite = {url:"Не могу создать приглашение"}
        try{invite = await bot.guilds.cache.get(getted.id).channels.cache.filter(ch=>ch.type === "text").first().createInvite({maxAge:864000,maxUses:100})} catch (err) {invite.url = "Не могу создать прилашение"}  
        embed.setDescription("**Ссылка на сервер** "+getted.name+"**\nКотят:** ``"+allmembers+"``\n**Всего серверов:** ``"+bot.guilds.cache.size+"``")
            .setColor("#c96c2e")
            .addField(`Котят`,"``"+getted.members+"``",true)
            .addField(`Каналов`,"``"+getted.channels+"``",true)
            .addField(`Ролей`,"``"+getted.rolesnum+"``",true)
            .addField(`Создатель`,"``"+getted.creator.user.username+"#"+getted.creator.user.discriminator+"``",true)
            .addField(`ID сервера`,"``"+getted.id+"``",true)
            .addField(`Ссылка`,invite.url,true)
            .setThumbnail(getted.url)
        message.channel.send(embed)
    } else {
        let getted = list.filter((value,index)=>value.name.toLowerCase().includes(args.join(" ").toLowerCase()))[0]
        var invite = {url:"Не могу создать приглашение"}
        try{invite = await bot.guilds.cache.get(getted.id).channels.cache.filter(ch=>ch.type === "text").first().createInvite({maxAge:86400,maxUses:100})} catch (err) {invite.url = "Не могу создать прилашение"}  
        embed.setDescription("**Ссылка на сервер** "+getted.name+"**\nКотят:** ``"+allmembers+"``\n**Всего серверов:** ``"+bot.guilds.cache.size+"``")
            .setColor("#c96c2e")
            .addField(`Котят`,"``"+getted.members+"``",true)
            .addField(`Каналов`,"``"+getted.channels+"``",true)
            .addField(`Ролей`,"``"+getted.rolesnum+"``",true)
            .addField(`Создатель`,"``"+getted.creator.user.username+"#"+getted.creator.user.discriminator+"``",true)
            .addField(`ID сервера`,"``"+getted.id+"``",true)
            .addField(`Ссылка`,invite.url,true)
            .setThumbnail(getted.url)
        message.channel.send(embed)
    }
}
module.exports.help = {
    name: "servers",
    type: 0,
    des: "узнать на каких серверах я нахожусь",
    synt: "servers <номер>",
    test: true
};
