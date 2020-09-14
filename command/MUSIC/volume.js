const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (client, message, args) => {

  if(!message.member.voice.channel) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | 먼저 은성채널에 들어가 주세요!` }})
    
  if(!client.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | 아무것도 재생중이지 않아요!` }})
  let volume = parseInt(args.join(" "));
  if (!volume) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | 숫자를 입력해주세요!` }})
  if (isNaN(args[0])) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | 숫자만 입력해 주세요 !` }})
  
  client.player.setVolume(message.guild.id, volume);
    
  message.channel.send({embed: {color: client.colors.success, description: `${client.emotes.success} | 볼륨을 설정했어요 \`${args.join(" ")}\` ` }})


}
exports.config = {
    name: '불룜',
    aliases: ['volume', 'vol', '불룜'],
    category: ['노래'],
    des: ['불룜을 설정합니다.'],
    use: ['ㄲ 불룜 [0~100]']
}
