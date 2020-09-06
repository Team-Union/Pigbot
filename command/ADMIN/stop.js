exports.run = async (client, message, args, prefix) => {
  if (!client.devs.includes(message.author.id))
    return message.reply("이 명령어는 꿀꿀봇 관리자만 사용할 수 있습니다.");
    try {
      await message.channel.send("꿀꿀봇 종료중...");
      process.exit();
    } catch (e) {
      message.channel.send(`ERROR: ${e.message}`);
    }
};

exports.config = {
  name: "리봇",
  aliases: ["restart", "재시작", "종료"],
  category: ["관리자"],
  des: ["꿀꿀봇 리봇을 합니다."],
  use: ["ㄲ 리봇"]
};
