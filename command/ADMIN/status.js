const { MessageEmbed } = require("discord.js"),
    os = require("os");
module.exports.run = async (bot, message, args) => {
  message.channel.send(new MessageEmbed().setTitle(`꿀꿀봇 시스템 정보`).setColor(0x00ff00).setDescription(`PLATFORM: **${process.platform}**\nARCH: **${process.arch}**\nCPU: **${os.cpus()[0].model}**\n메모리: **${(os.totalmem() / (1024 * 1024) - os.freemem() / (1024 * 1024)).toFixed(2)}MB / ${(os.totalmem() / (1024 * 1024)).toFixed(2)}MB** (${(100 - (os.freemem() / os.totalmem()) * 100).toFixed(2)}%)`))
};
exports.config = {
  name: "시스템정보",
  aliases: ["system", "osinfo"],
  category: ["관리자"],
  des: ["시스템 상태를 알립니다."],
  use: ["ㄲ 시스템정보"]
};
