const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (client, message, args) => {

    if(!message.member.voice.channel) return  message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | You must be in a voice channel!` }})

    if(!client.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: client.colors.error, description: `${client.emotes.error} | There is nothing playing!` }})

    let song = await client.player.nowPlaying(message.guild.id);

    message.channel.send({embed: {color: client.colors.success, description: `${client.emotes.music} | 현재 재생중익 곡:\n${song.name}` }})
}

exports.config = {
    name: '현제노래',
    aliases: ['np', 'nowplaying', '현제노래'],
    category: ['노래'],
    des: ['현제 노래를 보여줍니다'],
    use: ['ㄲ 현제노래']
}
