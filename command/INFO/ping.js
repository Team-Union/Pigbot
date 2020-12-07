const Discord = require("discord.js")
exports.run = async (client, msg, args, prefix) => {
    let embed = new Discord.MessageEmbed() // var -> let으로 수정하였습니다.
        .setTitle("봇상태")
        .setDescription("퐁!")
        .setColor("BLUE")
        .setFooter("Powered by 꿀꿀봇")
        .setTimestamp()
        .addField("웹소겟 지연시간", `${client.ws.ping}ms`)
        .addField("봇상태: ", `온라인`)
    msg.reply(embed)
}
exports.config = {
    name: '핑',
    aliases: ['vld', 'botping'],
    category: ['INFO'],
    des: ['봇의 디스코드 웹소켓 지연시간을 알려드립니다'],
    use: ['ㄲ 핑']
}
