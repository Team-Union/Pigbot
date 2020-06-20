const db = require("quick.db");
const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  let overall = db.fetch(`messages_${message.guild.id}`);
  let today = db.fetch(`message_today_${message.guild.id}`);
  try {
    let sEmbed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setTitle("서버정보")
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setAuthor(
        `${message.guild.name} 서버정보`,
        message.guild.iconURL({ dynamic: true })
      )
      .addField("**서버이름:**", `${message.guild.name}`, true)
      .addField("**서버 주인:**", `${message.guild.owner}`, true)
      .addField("**멤버수:**", `${message.guild.memberCount}`, true)
      .addField("**역할수:**", `${message.guild.roles.cache.size}`, true)
      .addField("Total Messages sent", overall)
      .addField("Messages Sent Today", today)
      .setFooter(`꿀꿀봇 |`, bot.user.displayAvatarURL());
    message.channel.send({ embed: sEmbed });
  } catch (e) {
    console.log(e);
  }
};

exports.config = {
  name: "서버정보",
  aliases: ["vld"],
  category: ["INFO"],
  des: ["서버정보를 봅니다"],
  use: ["ㄲ 서버정보"]
};
