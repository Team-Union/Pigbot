const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  message.delete()
  let desc = args.join(" ")
  const rEmded = new Discord.messageEmded()
  .setTitle("공지사항")
  .setDescription(desc)
  .setThumbnail(message.author.displayAvatarURL())
  .setColor("BLUE")
  .setFooter("공식 작성자 안꿀꿀", message.author.displayAvatarURL())
  .setTimestamp();
};

exports.config = {
  name: "공지",
  aliases: ["공지", "공지사항"],
  category: ["ADMIN"],
  des: ["공지사항 을 올립니다 (꿀꿀봇 관리자 필요)"],
  use: ["ㄲ 공지"]
};