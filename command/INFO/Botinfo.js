const Discord = require("discord.js")


exports.run = async (client, msg, args, prefix) => {
    let embed = new Discord.MessageEmbed() // var -> let으로 수정하였습니다.
    .setTitle("봇 정보")
    .setDescription("꿀꿀봇은 <:nodejs:735724721081155594> 와 :heart: 로 만든 봇입니다.")
    .setFooter("Powered by 꿀꿀봇")
    .addField("<:nodejs:735724721081155594>버전", "V12.16.2")
    .addField("<:djs:735727746294087691>버전", "V12.2.0")
    .addField("봇 제작 날짜 :" , `bot.user.createdAt`)
    .addField("<:Profile:735729140753236038> 봇 제작자 :", `안꿀꿀`)
    .addField("봇 핑 :", `${client.ws.ping}ms`)
    .addField("봇 업타임 :", `${duration(bot.uptime)}`);
    msg.channel.send(embed)
}


exports.config = {
    name: '봇정보',
    aliases: ['botinfo', '봇정보'],
    category: ['INFO'],
    des: ['봇정보에 대한 설명'],
    use: ['ㄲ 봇정보']
}
