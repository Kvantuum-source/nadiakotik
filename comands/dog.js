const discord = require("discord.js");
const fs = require("fs");
const request = require('request');
module.exports.run = async (bot, message, args, data) => {
    try{const embed = new discord.MessageEmbed()
    request("https://random.dog/woof.json", function (error, response, body) {
        if(response && response.statusCode == "200") {
            obj = JSON.parse(body);
            embed.setTitle("🐶 больше собачек!")
                .setColor('#f1c40f')
                .setImage(`${obj.url}`)
            message.channel.send(embed);
        }
    });}catch (err) {}
}
module.exports.help = {
    name: "dog",
    type: 3,
    des: "собачки",
    synt: "cat",
    test: false
};
