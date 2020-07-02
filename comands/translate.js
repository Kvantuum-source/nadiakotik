const discord = require("discord.js");
const request = require("request");
const detect = require("languagedetect")
const langdetect = new detect()
langdetect.setLanguageType("iso2")
let lang = {
    "af":"Африкаанс",
    "am":"Амхарский",
    "ar":"Арабский",
    "az":"Азербайджанский",
    "be":"Белорусский",
    "bg":"Болгарский",
    "bn":"Бенгальский",
    "bs":"Боснийский",
    "ca":"Каталанский",
    "ceb":"Себуано",
    "co":"Корсиканский",
    "cs":"Чешский",
    "cy":"Валлийский",
    "da":"Датский",
    "de":"Немецкий",
    "el":"Греческий (новогреческий)",
    "en":"Английский",
    "eo":"Эсперанто",
    "es":"Испанский",
    "et":"Эстонский",
    "eu":"Баскский",
    "fa":"Персидский",
    "fi":"Финский (Suomi)",
    "fr":"Французский",
    "fy":"Фризский",
    "ga":"Ирландский",
    "gd":"Гэльский",
    "gl":"Галисийский",
    "gu":"Гуджарати",
    "ha":"Хауса",
    "haw":"Гавайский",
    "he":"Иврит",
    "hi":"Хинди",
    "hmn":"Хмонг",
    "hr":"Хорватский",
    "ht":"Гаитянский креольский",
    "hu":"Венгерский",
    "hy":"Армянский",
    "id":"Индонезийский",
    "ig":"Игбо",
    "is":"Исландский",
    "it":"Итальянский",
    "iw":"Иврит",
    "ja":"Японский",
    "jw":"Яванский",
    "ka":"Грузинский",
    "kk":"Казахский",
    "km":"Камбоджийский",
    "kn":"Каннада",
    "ko":"Корейский",
    "ku":"Курдский",
    "ky":"Киргизский",
    "la":"Латинский",
    "lb":"Люксембургский",
    "lo":"Лаосский",
    "lt":"Литовский",
    "lv":"Латышский",
    "mg":"Малагасийский",
    "mi":"Маори",
    "mk":"Македонский",
    "ml":"Малаялам",
    "mn":"Монгольский",
    "mr":"Маратхи",
    "ms":"Малайский",
    "mt":"Мальтийский",
    "my":"Бирманский",
    "ne":"Непальский",
    "nl":"Нидерландский",
    "no":"Норвежский (букмол)",
    "ny":"Ньянджа",
    "or":"Ория",
    "pa":"Панджаби",
    "pl":"Польский",
    "ps":"Пушту",
    "pt":"Португальский",
    "ro":"Румынский",
    "ru":"Русский",
    "rw":"Руанда",
    "sd":"Синдхи",
    "si":"Сингальский",
    "sk":"Словацкий",
    "sl":"Словенский",
    "sm":"Самоанский",
    "sn":"Шона",
    "so":"Сомалийский",
    "sq":"Албанский",
    "sr":"Сербский",
    "st":"Сесото",
    "su":"Сунданский",
    "sv":"Шведский",
    "sw":"Суахили",
    "ta":"Тамильский",
    "te":"Телугу",
    "tg":"Таджикский",
    "th":"Тайский",
    "tk":"Туркменский",
    "tl":"Тагальский",
    "tr":"Турецкий",
    "tt":"Татарский",
    "ug":"Уйгурский",
    "uk":"Украинский",
    "ur":"Урду",
    "uz":"Узбекский",
    "vi":"Вьетнамский",
    "xh":"Коса",
    "yi":"Идиш",
    "yo":"Йоруба",
    "zh":"Китайский",
    "zh-CN":"Китайский (упрощенный)",
    "zh-TW":"Китайский (традиционный)",
    "zu": "Зулу"
}

module.exports.run = async(bot, message, args, _data) => {
    const embed = new discord.MessageEmbed()
    if (!lang.hasOwnProperty(args[0])) { args[0] = "ru" }
    let text = args.slice(1)
    let detected = langdetect.detect(text.join(" "), 1)[0]
    if (detected == undefined) detected = ["en"]
    if (detected[0] == undefined) detected[0] = "en"
    var options = {
        method: 'GET',
        url: 'https://hirak-translate.p.rapidapi.com/tr/',
        qs: { to: args[0], txt: text.join(" "), from: detected[0]},
        headers: {
            'x-rapidapi-host': 'hirak-translate.p.rapidapi.com',
            'x-rapidapi-key': 'ebe3448999mshd890a46e2c3c7f8p1a9d61jsn56c2d8e62f2b',
            useQueryString: true
        }
    };
    request(options, function (error, _response, body) {
        try { body = JSON.parse(body) } catch (err) {
            body = { result: "Не удалось перевести!" }
        }
        if (error) body.result = "Не удалось перевести!"
        body.result = options.qs.from == args[0] ? text : body.result
        options.qs.to = options.qs.from == args[0] ? args[0] : options.qs.to
        embed.setAuthor("Перевод запрошен " + message.author.username + "#" + message.author.discriminator, message.author.avatarURL()).addField("Входной текст (" + lang[detected[0]] + ")", text.join(" ")).addField("Результат (" + lang[options.qs.to] + ")", body.result).setFooter(bot.user.username).setTimestamp()
        message.channel.send(embed)
    });
};
module.exports.help = {
  name: "translate",
  type: 0,
  des: "перевести текст",
  synt: "translate <ru/en/...> <текст>",
  test: false
};
