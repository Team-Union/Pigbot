const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (client, message, args) => {
  
  if(!message.member.voice.channel) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | 먼저 음성채널에 들어가주세요!` }})
    
  if(!client.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | 현재 아무것도 재생중이지 않아요!` }})
  
  let song = await client.player.stop(message.guild.id);

  message.channel.send({embed: {color: client.colors.success, description: `${client.emotes.stop} | 노래를 멈췄어요!` }})


}
exports.config = {
    name: '정지',
    aliases: ['정지', 'stop', '종료'],
    category: ['노래'],
    des: ['재생중에 노래를 중지 시킵니다 합니다.'],
    use: ['ㄲ 정지']
}
