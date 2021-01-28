const Discord = require("discord.js")


exports.run = async (client, msg, args, prefix) => {
    let embed = new Discord.MessageEmbed() // var -> let으로 수정하였습니다.
    .setTitle("이벤트 목록")
    .setDescription(`None`)
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