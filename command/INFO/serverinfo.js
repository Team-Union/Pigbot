const Discord = require("discord.js");


module.exports.run = async (bot, msg, message, args) => {
    let embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setTitle("서버정보")
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addField("**서버이름:**", `${message.guild.name}`, true)
      .addField("**서버 주인:**", `${message.guild.owner}`, true)
      .addField("**멤버수:**", `${message.guild.memberCount}`, true)
      .addField("**역할수:**", `${message.guild.roles.cache.size}`, true)
      .setFooter(`꿀꿀봇 |`, bot.user.displayAvatarURL());
    message.channel.send({ embed: sEmbed });
};



exports.config = {
  name: "서버정보",
  aliases: ["vld"],
  category: ["INFO"],
  des: ["서버정보를 봅니다"],
  use: ["ㄲ 서버정보"]
};
