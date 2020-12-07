const Discord = require("discord.js")


exports.run = async (client, msg, args, prefix) => {
    let embed = new Discord.MessageEmbed() // var -> let으로 수정하였습니다.
    .setTitle("이벤트 목록")
    .setDescription(`**[:gift: 산타에 선물을 모아라!]**\n> 이벤트 내용\n찾기 어려운 선물 상자들을 찾아 선물을 개봉해서 더 좋은 아이템을 얻어보세요.\n \n> 1등 보상\n명예 전당 에 올라갑니다.\n> 시작일\n2020-12-02일`)
    .setFooter("Powered by 꿀꿀봇")
    .setColor("#0404B4")
    msg.channel.send(embed)
}


exports.config = {
    name: '이벤트',
    aliases: ['event', '이벤트', 'dlqpsxm'],
    category: ['이벤트'],
    des: ['현제 진행중인 이벤트를 확인합니다.'],
    use: ['ㄲ 이벤트']
}