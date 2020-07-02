const discord = require("discord.js");
const fs = require("fs");
const request = require('request');
module.exports.run = async (bot, message, args, data) => {
    const embed = new discord.MessageEmbed()
    var inuser = " :sob:"
    let rip = [
        "https://i.gifer.com/LxmT.gif",
        "https://steamuserimages-a.akamaihd.net/ugc/911288903785421734/EFDDB507FAC574012F636BC73F5BCA1886641BD3/",
        "https://steamuserimages-a.akamaihd.net/ugc/943950534447803289/CBA8E683D3A89E156B4C8A7CBDDB74FD6937410D/",
        "https://i.gifer.com/FNea.gif",
        "https://i.gifer.com/89r5.gif",
        "https://steamuserimages-a.akamaihd.net/ugc/931567646652029172/A352D63C56CEE27710BED680737F3CDF995B5D55/",
        "https://steamuserimages-a.akamaihd.net/ugc/913542046767232198/FCBA72E5FD297925D0C9BC4F51647EC0A218687D/",
        "https://thumbs.gfycat.com/UnrealisticOilyIraniangroundjay-max-1mb.gif",
        "https://pa1.narvii.com/6535/9f21cc94f9503e4dbd2f55a73575c7056775425e_hq.gif",
        "https://em.wattpad.com/5c517b0a4bc4d650e561bccaf31eb6484e3a2561/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f41676d49306f543245516e472d413d3d2d3533363931393537302e313531363431613362323266663232303539353736313837363235352e676966?s=fit&w=720&h=720",
        "https://29.media.tumblr.com/tumblr_lquyvrAPMU1qbajlmo1_r4_500.gif",
        "https://i.gifer.com/4bFV.gif",
        "https://66.media.tumblr.com/f4a33eec030cc791b8f878297a0d98ae/tumblr_mp8fs9HePh1rbmwrxo1_400.gifv",
        "https://data.whicdn.com/images/230771262/original.gif",
        "https://gfycat.com/mildwaterloggedgreendarnerdragonfly",
        "https://i.gifer.com/N11p.gif"
    ]
    if (args[0]) {
        inuser = "из за того что " + args[0] + " :sob:"
    }
    let url = rip[Math.floor(Math.random()*rip.length)]
    embed.setTitle(message.author.username + " покончил(а) жизнь самоубийством "+inuser)
        .setColor("#c96c2e")
        .setFooter(message.guild.name)
        .setImage(url)
    message.channel.send(embed)
}
module.exports.help = {
    name: "rip",
    type: 3,
    des: "самоубиться :<",
    synt: "rip <причина>",
    test: false
};