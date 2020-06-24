const { MessageEmbed } = require("discord.js");
const Eco = require("quick.eco");
const eco = new Eco.Manager();

module.exports.run = async (bot, message, args) => {
  let add = eco.daily(message.author.id, 20000);
  if (message.content === "work") {
        let add = eco.work(message.author.id, 1000);
        if (add.onCooldown) return message.reply(`${add.time.minutes}분 & ${add.time.seconds}초 후 시도해보세요`);
        else return message.reply(`${add.amount}${add.workedAs}${add.after}`);
};
exports.config = {
  name: "일",
  aliases: ["일하기"],
  category: ["ECONOMY"],
  des: ["일을 합니다."],
  use: ["ㄲ 일"]
};