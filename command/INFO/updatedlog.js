const Discord = require("discord.js")
exports.run = async (client, msg, args, prefix) => {
    let embed = new Discord.MessageEmbed() // var -> let으로 수정하였습니다.
        .setTitle("V2.4.1 업데이트 안내")
        .setDescription("```diff\n+ 노래시스탬 추가\n+ 서버정보 안정화!```\n🔗[꿀꿀봇 초대하기](https://discord.com/api/oauth2/authorize?client_id=702857016539873372&permissions=8&scope=bot)\n🔗[지원서버 들어가기](https://invite.gg/pigbot)\n🔗 [꿀꿀봇 추천하기](https://koreanbots.dev/bots/702857016539873372)")
        .setColor("BLUE")
        .setFooter("Updated V2.3.2")
        .setThumbnail("https://media.discordapp.net/attachments/729175908849549363/735719327596150864/file_1.png?width=442&height=442")
//        .setImage("")
        .setTimestamp()
    msg.channel.send(embed)
}

exports.config = {
    name: '업데이트 노트',
    aliases: ['updatelog', '변경사항', "업데이트 기록"],
    category: ['INFO'],
    des: ['업데이트에 대한 설명'],
    use: ['ㄲ 변경사항']
}