module.exports = {
  config: {
    name: "새로고침",
    description: "커맨드 새로고침!",
    usage: "ㄲ 새로고침",
    category: "ADMIN",
    accessableby: "Bot Owner",
    aliases: ["creload"]
  },
  run: async (bot, message, args) => {
    if (message.author.id != "552103947662524416")
      return message.channel.send("꿀꿀봇 관리자가 아닙니다");

    if (!args[0]) return message.channel.send("예시:ㄲ 새로고침 [명령어.js]");
    let c = message.channel.send("리로드중......");

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
  }
};
