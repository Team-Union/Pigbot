const { MessageEmbed } = require('discord.js'),
    koreanbots = require("koreanbots")

module.exports = {
    ownerID: process.env.OWNER_ID,
    prefix: process.env.PREFIX,
    MyBot: new koreanbots.MyBot(process.env.KOREANBOTS_TOKEN),
    formatTime(time) {
        const date = new Date(time)
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`
    },
    getMember(message, mem) {
        let member = message.guild.members.cache.get(mem);

        if (!member && message.mentions.members) member = message.mentions.members.first()
        if (!member && mem) member = message.guild.members.cache.find(m => m.displayName.toLowerCase().includes(mem) || m.user.username.toLowerCase().includes(mem) || m.user.tag.toLowerCase() === mem)
        if (!member) member = message.member

        return member
    },
    getChannel(message, ch) {
        let channel = message.guild.channels.cache.get(ch)

        if (!channel && message.mentions.channels) channel = message.mentions.channels.first()
        if (!channel && ch) channel = message.guild.channels.cache.find(m => m.name.toLowerCase().includes(ch))
        if (!channel) channel = message.channel

        return channel
    },
    embed: {
        musicError1: new MessageEmbed().setColor(0xFF0000).setTitle('❌ 현재 재생 중인 음악이 없어요!'),
        musicError2: new MessageEmbed().setColor(0xFF0000).setTitle('❌ 음성 채널에 먼저 들어가 주세요!'),
        musicError3: player => new MessageEmbed().setColor(0xFF0000).setDescription(`❌ **${player.voiceChannel.name}** 채널로 들어가 주세요!`)
    }
}