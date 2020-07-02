const Discord = require('discord.js')
module.exports.run = async(bot,message,args) => {
  let embed = new Discord.MessageEmbed()
  .setTitle('안될시 "❌"반응을 클릭해주시요')
  .setDescription(`[여기를 클릭하여](https://discord.com/api/oauth2/authorize?client_id=702857016539873372&permissions=8&scope=bot) 봇을 초대하세요.`)
  message.channel.send(embed).then(m=> m.react('❌').then(m.awaitReactions((reaction, user) =>  reaction.emoji.name == '❌' && user.id === message.author.id, { max: 1, time: 30000 }).then(collected => {
                                  if (collected.first().emoji.name == '❌' ){
                                  message.author.send("https://discord.com/api/oauth2/authorize?client_id=702857016539873372&permissions=8&scope=bot")
                                  }                      
                                                         })))
  message.delete()
}
exports.config = {
  name: "초대",
  aliases: ["초대", "초대하기"],
  category: ["INFO"],
  des: ["꿀꿀봇을 초대할수 있는 링크를 지원합니다"],
  use: ["ㄲ 초대"]
};