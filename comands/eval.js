const discord = require("discord.js")
const fs = require("fs")
module.exports.run = async(bot, message, args, data) => {
    if (
    message.author.id === "543344160996851712" || message.author.id === '414733597782704128' || message.author.id ==="698778995910508574"
    ) {
    try {
      var code = args.join(" ");
      var evaled = eval(code);
      let hrStart = process.hrtime();
      let hrDiff = process.hrtime(hrStart);
      let type = typeof evaled;
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      try {
        message.channel.send(
          `
\`\`\`fix
Output type: ${type}
Execution time: ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ""}${hrDiff[1] / 1000000}ms
Output:
\`\`\`` +
            `
\`\`\`js
${clean(evaled)}\`\`\``
        );
      } catch (err) {}
    } catch (err) {
      message.channel.send(
        `\`ОШИБКА\` \`\`\`xl\n${clean(err)}\n\`\`\``
      );
    }
    function clean(text) {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }
  }
}
module.exports.help = {
    name: "eval",
    type: -1,
    des: "выполняет js код",
    synt: "eval <js код>",
    test: true
};