const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.mentions.users.size) {
    let embed = new MessageEmbed()
      .setTitle("유저정보")
      .setThumbnail(message.author.displayAvatarURL())
      .setColor("BLUE")
      .addField("유저이름 :", message.author.username)
      .addField("디스코드 계정 생성 날짜 :", message.author.createdAt)
      .setFooter("Requested by :", message.author.displayAvatarURL())
      .setTimestamp();
    message.channel.send(embed);
  } else if (message.mentions.users.size) {
    let embed = new MessageEmbed()
      .setTitle("유저정보")
      .setThumbnail(message.mentions.users.first().displayAvatarURL())
      .setColor("BLUE")
      .addField("유저이름 :", message.mentions.users.first().username)
      .addField(
        "디스코드 계정 생성 날짜 :",
        message.mentions.users.first().createdAt
      )
      .setFooter("Requested by :", message.author.displayAvatarURL())
      .setTimestamp();
    message.channel.send(embed);
  }
};
exports.config = {
  name: "유저정보",
  aliases: ["vld", "userinfo"],
  category: ["INFO"],
  des: ["유저정보를 봅니다"],
  use: ["ㄲ 유저정보"]
};
