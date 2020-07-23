const Discord = require("discord.js")
exports.run = async (client, msg, args, prefix) => {
    let embed = new Discord.MessageEmbed() // var -> let으로 수정하였습니다.
        .setTitle("V2.2.1 업데이트 안내")
        .setDescription("```diff\n+ 네이버 검색 순위 추가\n+ 업데이트 노트 추가 \n+ Discord.JS API 추가\n-뮤트 명령어 오류 고치는중..```")
        .setColor("BLUE")
        .setFooter("Updated V2.2.1")
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
    use: ['ㄲ 기록']
}