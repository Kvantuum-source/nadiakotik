const discord = require("discord.js");
const fs = require("fs");
const request = require('request');
module.exports.run = async (bot, message, args, data) => {
    try{const embed = new discord.MessageEmbed()
    request('https://aws.random.cat/meow', function (error, response, body) {
        if(response && response.statusCode == "200") {
            obj = JSON.parse(body);
            embed.setTitle("🐱 больше котят!")
                .setColor('#f1c40f')
                .setImage(`${obj.file}`)
            message.channel.send(embed);
        }
    });}catch (err) {}
}
module.exports.help = {
    name: "cat",
    type: 3,
    des: "котики",
    synt: "cat",
    test: false
};
