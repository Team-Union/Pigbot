const Discord = require("discord.js")


module.exports.run = async (bot, message, args) => {

    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds, `
    } 
  try {

    let embed = new Discord.MessageEmbed()
    .setThumbnail(bot.user.displayAvatarURL())
    .setTitle("봇 정보")
    .setFooter("Requested By:", message.author.displayAvatarURL())
    .addField("봇 제작 날짜 :" , `bot.user.createdAt`)
    .addField("봇 제작자 :", `안꿀꿀`)
    .addField("봇 핑 :", `${client.ws.ping}ms`)
    .addField("봇 업타임 :", `${duration(bot.uptime)}`);
    message.channel.send(embed)
    } catch(e) {
      console.log(e)
    }
}

exports.config = {
    name: '봇정보',
    aliases: ['embed', 'dlaqpem'],
    category: ['INFO'],
    des: ['봇정보에 대한 설명'],
    use: ['ㄲ 봇정보']
}
