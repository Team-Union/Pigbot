const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (client, message, args) => {
  
if(!message.member.voice.channel) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | 먼저 음성채널에 들어가 주세요!` }})
if(!client.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | 먼저 음성채널에 들어가 주세요!` }})

client.player.setRepeatMode(message.guild.id, true);
 // Get the current song
 let song = await client.player.nowPlaying(message.guild.id);
  
 message.channel.send({embed: {color: client.colors.success, description: `${client.emotes.repeat} | 반복중 ${song.name}!` }})    
}

exports.config = {
    name: '반복',
    aliases: ['반복', 'loop', 'repeat'],
    category: ['노래'],
    des: ['노래를 반복 합니다.'],
    use: ['ㄲ 반복']
}
