const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (client, message, args) => {
  
  if(!message.member.voice.channel) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | 먼저 음성채널에 들어가주세요!` }})
    
  if(!client.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | 현재 아무것도 재생중이지 않아요` }})
  
  let song = await client.player.skip(message.guild.id);

  message.channel.send({embed: {color: client.colors.success, description: `${client.emotes.success} | 노래를 건너뛰었어요:\n${song.name}` }})

}

exports.config = {
    name: '넘어가기',
    aliases: ['스킵', '넘어가', 'skip', 's'],
    category: ['노래'],
    des: ['현제 재생곡을 넘어갑니다.'],
    use: ['ㄲ 넘어가']
}
