const Discord = require("discord.js");


exports.run = async (client, message, args, prefix) => {
    let embed = new Discord.MessageEmbed() // var -> let으로 수정하였습니다.
      .setColor("BLUE")
      .setTitle("서버정보")
      .addField("**서버이름:**", `${message.guild.name}`, true)
      .addField("**서버 주인:**", `${message.guild.owner}`, true)
      .addField("**멤버수:**", `${message.guild.memberCount}`, true)
      .addField("**역할수:**", `${message.guild.roles.cache.size}`, true)
      .setFooter(`꿀꿀봇 |`, bot.user.displayAvatarURL());
    message.channel.send(embed);
};



exports.config = {
  name: "서버정보",
  aliases: ["vld"],
  category: ["INFO"],
  des: ["서버정보를 봅니다"],
  use: ["ㄲ 서버정보"]
};
