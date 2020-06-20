const { MessageEmbed } = require("discord.js");
const Eco = require("quick.eco");
const eco = new Eco.Manager();
const reload = require("self-reload-json");
const User = new reload("./json/user.json");

module.exports.run = async (bot, message, args) => {
  let money = eco.fetchMoney(message.author.id);
  let embed = new MessageEmbed()
    .setTitle(`${message.author.username}님의 지갑`)
    .addField("돈:", `${money.amount}`)
    .addField("코인:", `${User[msg.author.id].money}`)
    .setColor("GREEN")
    .setFooter("Requested By:", message.author.displayAvatarURL());
  message.channel.send(embed);
};
exports.config = {
  name: "내지갑",
  aliases: ["내지갑"],
  category: ["ECONOMY"],
  des: ["내지갑에 뭐가 있는지 보여줍니다"],
  use: ["ㄲ 내지갑"]
};
