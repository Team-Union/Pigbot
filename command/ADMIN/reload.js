
exports.run = async (client, msg, args, prefix) => {
    if (message.author.id != "552103947662524416")
      return message.channel.send("꿀꿀봇 관리자가 아닙니다");

    if (!args[0]) return message.channel.send("예시:ㄲ 새로고침 [명령어]");
    let c = message.channel.send("리로드중...");

    let commandName = args[0].toLowerCase();

    try {
      delete require.cache[require.resolve(`./${commandName}.js`)]; // usage !reload <name>
      bot.commands.delete(commandName);
      const pull = require(`./${commandName}.js`);
      bot.commands.set(commandName, pull);
    } catch (e) {
      return message.channel.send(
        `Could not reload: \`${args[0].toUpperCase()}\``
      );
    }

    message.channel.send(`커맨드인 \`${args[0].toUpperCase()}\` 성공!!`);
};

exports.config = {
  name: "새로고침",
  aliases: ["reload", "리로드"],
  category: ["관리자"],
  des: ["파일을 새로고침함니다."],
  use: ["ㄲ 리로드 <파일이름>(.js뺴고)"]
};
