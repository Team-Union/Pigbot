const Discord = require("discord.js")

exports.run = async (client, msg, args, prefix) => {
    let embed = new Discord.MessageEmbed() // var -> let으로 수정하였습니다.
        .setTitle("봇정보")
        .setDescription(`**꿀꿀봇은 <:nodejs:735724721081155594>와 :heart:로 만든 봇입니다!\n모든 문의 사항 및 제보는 [지원 서버](https://invite.gg/pigbot)를 이용해주세요.\n 항상 꿀꿀봇을 이용해주셔서 감사합니다.**`)
        .setColor("BLUE")
        .setFooter("꿀꿀봇")
        .setThumbnail("https://cdn.discordapp.com/attachments/729175908849549363/735719327596150864/file_1.png")
        .setTimestamp()
        .addField("봇상태", "온라인")
        .addField("봇 제작 날짜", "2020-03-04")
        .addField("봇 만든이", "!안꿀꿀!#9202")
        .addField("봇 제작 언어", "Discord.js")
    msg.reply(embed)
}

exports.config = {
    name: '봇정보',
    aliases: ['봇정보', 'qhtwjdqh'],
    category: ['INFO'],
    des: ['봇정보에 대한 설명'],
    use: ['ㄲ 봇정보']
}
