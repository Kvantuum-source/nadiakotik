const discord = require("discord.js");
const fs = require("fs");
const request = require('request');
module.exports.run = async (bot, message, args, data) => {
    let color = '#' + Math.random().toString(16).slice(3, 9)
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    let r = parseInt(result[1], 16)
    let g = parseInt(result[2], 16)
    let b = parseInt(result[3], 16)
    const embed = new discord.MessageEmbed().setColor(color).addField("HEX",color,false).addField("RGB",r+" "+g+" "+b,false)
    message.channel.send(embed)
}
module.exports.help = {
    name: "randomcolor",
    type: 4,
    des: "случайный цвет",
    synt: "randomcolor",
    test: false
};
