const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (client, message, args) => {
 
  if(!message.member.voice.channel) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | 먼저 음성채널에 들어가 주세요!` }})

  if(!client.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | 아무것도 재생중이지 않아요` }})

  client.player.clearQueue(message.guild.id);

   message.channel.send({embed: {color: client.colors.success, description: `${client.emotes.success} | 대기열을 비웠어요` }})

}

exports.config = {
    name: '대기열초기화',
    aliases: ['대기열 초기화', '대기열 삭제', '초기화'],
    category: ['노래'],
    des: ['대기열을 초기화 합니다.'],
    use: ['ㄲ 대기열 초기화']
}
