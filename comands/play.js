const discord = require("discord.js");
const fs = require("fs");
const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyDYTC5ItNIEongXKcQEWCXmhtu2iP3KlIM")
const ytdl = require("ytdl-core")
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    const errembed = new discord.MessageEmbed()
    const newembed = new discord.MessageEmbed()
    var songg
    var newed = true
    errembed.setDescription("Чтобы узнать подробнее напишите ``" + data.configurations[message.guild.id].prefix + "help " + module.exports.help.name + "``")
    if (!args[0]) return message.channel.send(errembed)
    var i = 0
    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) return message.channel.send("Вам нужно быть в голосовом канале, чтобы проигрывать музыку!");
    errembed.setDescription("Плеер уже проигрывает музыку в другом канале")
    var pushvideo
    if (!bot.dispatcherguild[message.guild.id]) {
        bot.dispatcherguild[message.guild.id] = {}
    }
    if (!bot.dispatcherguild[message.guild.id].songs) {
        bot.dispatcherguild[message.guild.id].songs = []
    }
    if (bot.dispatcherguild[message.guild.id].voiceChannel != undefined && bot.dispatcherguild[message.guild.id].voiceChannel.id != voiceChannel.id) return message.channel.send(errembed)
    if (args[0].startsWith("https://www.youtube.com")) {
        errembed.setDescription("🛑 <@" + message.author.id + ">, видео не найдено!").setColor("#c96c2e")
        let ytvideo = await youtube.getVideo(args[0]).catch(() => { return message.channel.send(errembed) })
        pushvideo = {
            by:"<@"+message.author.id+">",
            author:ytvideo.channel.title,
            title:ytvideo.title,
            thumb:ytvideo.thumbnails.default.url,
            url:ytvideo.url
        }
        let secondall = await ytdl.getInfo(pushvideo.url)
        var sec = parseInt(secondall.length_seconds), hours = sec / 3600  % 24, minutes = sec / 60 % 60, seconds = sec % 60;
        let time = num(hours) + ":" + num(minutes) + ":" + num(seconds);
        pushvideo.time = time
        newembed.setAuthor("Добавление музыки",message.author.avatarURL()).addField("Название трека","``"+pushvideo.title+"``",true).addField("Автор","``"+pushvideo.author+"``",true).addField("Заказан",pushvideo.by,true).addField("Продолжительность","``"+pushvideo.time+"``",true).addField("Позиция ожидания","#"+(bot.dispatcherguild[message.guild.id].songs.length+1)).setThumbnail(pushvideo.thumb).setColor("#c96c2e")
        message.channel.send(newembed)
        bot.dispatcherguild[message.guild.id].songs.push(pushvideo)
        if (!bot.dispatcherguild[message.guild.id].songs[1] || !message.guild.members.cache.get(bot.user.id).voice.channel) {
            var connecton = await voiceChannel.join()
            bot.dispatcherguild[message.guild.id] = {
                volume:1,
                connection:connection,
                voiceChannel:voiceChannel,
                dispatcher:undefined,
                songs:bot.dispatcherguild[message.guild.id].songs
            }
            play(message,bot.dispatcherguild[message.guild.id].songs[0],connecton,voiceChannel)
            return true;
        }
    } else {
        errembed.setDescription("🛑 <@" + message.author.id + ">, видео не найдено!").setColor("#c96c2e")
        let videos = await youtube.searchVideos(args.join(" "), 1)
        if (!videos[0]) return message.channel.send(errembed)
        pushvideo = {
            by:"<@"+message.author.id+">",
            author:videos[0].channel.title,
            title:videos[0].title,
            thumb:videos[0].thumbnails.default.url,
            url:videos[0].url,
        }
        let secondall = await ytdl.getInfo(pushvideo.url)
        var sec = parseInt(secondall.length_seconds), hours = sec / 3600  % 24, minutes = sec / 60 % 60, seconds = sec % 60;
        let time = num(hours) + ":" + num(minutes) + ":" + num(seconds);
        pushvideo.time = time
        newembed.setAuthor("Добавление музыки",message.author.avatarURL()).addField("Название трека","``"+pushvideo.title+"``",true).addField("Автор","``"+pushvideo.author+"``",true).addField("Заказан",pushvideo.by,true).addField("Продолжительность","``"+pushvideo.time+"``",true).addField("Позиция ожидания","#"+(bot.dispatcherguild[message.guild.id].songs.length+1)).setThumbnail(pushvideo.thumb).setColor("#c96c2e")
        message.channel.send(newembed)
        bot.dispatcherguild[message.guild.id].songs.push(pushvideo)
        if (!bot.dispatcherguild[message.guild.id].songs[1] || !message.guild.members.cache.get(bot.user.id).voice.channel) {
            var connection = await voiceChannel.join()
            bot.dispatcherguild[message.guild.id] = {
                volume:1,
                connection:connection,
                voiceChannel:voiceChannel,
                dispatcher:undefined,
                songs:bot.dispatcherguild[message.guild.id].songs
            }
            play(message,bot.dispatcherguild[message.guild.id].songs[0],connection,voiceChannel)
        }
    }
    async function play(message,song,connection,voiceChannel) {
        const embedforplay = new discord.MessageEmbed()
        embedforplay.setAuthor("Сейчас играет",message.author.avatarURL()).addField("Название трека","``"+song.title+"``",true).addField("Автор","``"+song.author+"``",true).addField("Заказан",song.by,true).addField("Продолжительность","``"+song.time+"``",true).setThumbnail(song.thumb).setColor("#c96c2e")
        let video = await message.channel.send(embedforplay)
        video.react("⬅️").then(()=>{
            video.react("⏯️").then(()=>{
                video.react("➡️").then(()=>{
                    video.react("➕").then(()=>{
                        video.react("❤️").then(()=>{
                            video.react("💔").then(()=>{
                                video.react("➖")
                            })
                        })
                    })
                })
            })
        })
        let likecollector = video.createReactionCollector(reaction=>reaction.emoji.name == "❤️")
        let dislikecollector = video.createReactionCollector(reaction=>reaction.emoji.name == "💔")
        let skip = video.createReactionCollector(reaction=>reaction.emoji.name == "➡️")
        let pauseresum = video.createReactionCollector(reaction=>reaction.emoji.name == "⏯️")
        let plus = video.createReactionCollector(reaction=>reaction.emoji.name == "➕")
        let minus = video.createReactionCollector(reaction=>reaction.emoji.name == "➖")
        let prev = video.createReactionCollector(reaction=>reaction.emoji.name == "⬅️")
        prev.on("collect",(reaction,user)=>{
            if (user.bot == true) return
            newed = false
            bot.dispatcherguild[message.guild.id].dispatcher.end()
            reaction.users.remove(user)
        })
        plus.on("collect",(reaction,user)=>{
            if (user.bot == true) return
            if (bot.dispatcherguild[message.guild.id].volume >= 10) return
            bot.dispatcherguild[message.guild.id].volume = bot.dispatcherguild[message.guild.id].volume+1
            bot.dispatcherguild[message.guild.id].dispatcher.setVolumeLogarithmic(bot.dispatcherguild[message.guild.id].volume / 5);
            reaction.users.remove(user)
        })
        minus.on("collect",(reaction,user)=>{
            if (user.bot == true) return
            if (bot.dispatcherguild[message.guild.id].volume <= 0) return
            bot.dispatcherguild[message.guild.id].volume = bot.dispatcherguild[message.guild.id].volume-1
            bot.dispatcherguild[message.guild.id].dispatcher.setVolumeLogarithmic(bot.dispatcherguild[message.guild.id].volume / 5);
            reaction.users.remove(user)
        })
        skip.on("collect",(reaction,user)=>{
            if (user.bot == true) return
            bot.dispatcherguild[message.guild.id].dispatcher.end()
            reaction.users.remove(user)
        })
        skip.on("end",()=>{
            video.reactions.removeAll()
        })
        pauseresum.on("collect",(reaction,user)=>{
            if (user.bot == true) return
            if (dispatcher.paused == true) {
                dispatcher.resume()
            } else {
                dispatcher.pause()
            }
            reaction.users.remove(user)
        })
        likecollector = likecollector.on("collect",(reaction,user)=>{
            if (user.bot == true) return
            song.by = "<@"+user.id+">"
            if (!data.playlists[user.id]) {
                data.playlists[user.id] = []
            }
            let finded = data.playlists[user.id].filter(sng=>sng.url === song.url)
            if (!finded[0]) {
                data.playlists[user.id].push(song)
            }
            reaction.users.remove(user)
        })
        dislikecollector.on("collect",(reaction,user)=>{
            if (user.bot == true) return
            song.by = "<@"+user.id+">"
            if (!data.playlists[user.id]) {
                data.playlists[user.id] = []
            }
            let finded = data.playlists[user.id].filter(sng=>sng.url === song.url)
            if (finded[0]!=undefined) {
                data.playlists[user.id].splice(data.playlists[message.author.id].indexOf(song),1)
            }
            reaction.users.remove(user)
        })
        const dispatcher = connection.play(ytdl(song.url,{quality:"highest",highWaterMark: 1024 * 1024 * 32}))
        dispatcher.on("finish",()=>{
            console.log("Музыка завершилась")
            if (newed == true) {
                bot.dispatcherguild[message.guild.id].songs.shift()
                if (!bot.dispatcherguild[message.guild.id].songs[0]) {
                    voiceChannel.leave();
                    bot.dispatcherguild[message.guild.id].dispatcher.destroy()
                    likecollector.stop()
                    dislikecollector.stop()
                    skip.stop()
                    pauseresum.stop()
                    plus.stop()
                    minus.stop()
                    return true;
                }
            } else {
                newed = true
            }
            likecollector.stop()
            dislikecollector.stop()
            skip.stop()
            pauseresum.stop()
            plus.stop()
            minus.stop()
            play(message,bot.dispatcherguild[message.guild.id].songs[0],connection,voiceChannel)
        })
        bot.dispatcherguild[message.guild.id].dispatcher = dispatcher
        dispatcher.setVolumeLogarithmic(bot.dispatcherguild[message.guild.id].volume/5);
    }
    function num(val){
        val = Math.floor(val);
        return val < 10 ? '0' + val : val
    }
}
module.exports.help = {
    name: "play",
    type: 2,
    des: "поиск песни по тексту/ссылке",
    synt: "play <текст поиска/ссылка>",
    test: false
};