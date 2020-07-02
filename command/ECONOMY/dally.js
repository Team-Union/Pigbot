const Eco = require("quick.eco");
const eco = new Eco.Manager();
module.exports.run = async (bot, message, args) => {
  let add = eco.daily(message.author.id, 20000);
  if (add.onCooldown)
    return message.reply(
      `출첵실패.${add.time.days} d, ${add.time.hours} h, ${add.time.minutes} m & ${add.time.seconds} s. 후에 다시시도 하세요.`
    );
  else
    return message.reply(`${add.amount}를 획득하고 ${add.after}이 됬습니다.`);
};
exports.config = {
  name: "출첵",
  aliases: ["출첵!"],
  category: ["ECONOMY"],
  des: ["출석체크 합니다."],
  use: ["ㄲ 출첵"]
};
