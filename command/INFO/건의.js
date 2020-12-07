const Discord = require("discord.js")
exports.run = async (client, msg, args, prefix) => {
if (!args[0]) return msg.reply("건의 내용이 없어 취소돼었습니다.");
const hook = new Discord.WebhookClient('770626947273064488', 'uB9u1PhvCaeFWbWsv_Vo2icb5ZMe9YiKR99lF0GVse9EaCRSQZy-i0whaVP8cYWxDuCS');
let sembed = new Discord.MessageEmbed()
    .setTitle("알림!")
    .setDescription(`:white_check_mark: 건의내용 정상적으로 전송되었습니다\n건의 내용 : **${args.join(' ')}**`)
    msg.channel.send(sembed)
    hook.send(`<@552103947662524416>\n건의 내용이 왔네요? \n${msg.author.username} : **${args.join(' ')}**`)
}

exports.config = {
    name: '건의',
    aliases: ['report', 'rjsdml'],
    category: ['INFO'],
    des: ['꿀꿀봇 사용도중에 불편했던 점을 적어주세요'],
    use: ['ㄲ 건의 [내용]']
}