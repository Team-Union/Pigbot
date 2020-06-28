module.exports = {
  name: "스킵",
  description: "다음노래로 이동합니다",
  aliases: ['스킵'],
  cooldown: 5000,
  run(client, message, args) {
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "죄송합니다. 유저가 음성채널에 접속이 안됬습니다."
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send(
        "다음노래가 없읍니다."
      );
    if (message.member.id != serverQueue.user)
      return message.channel.send(
        "현제 노래를 재생해주세요."
      );
    serverQueue.connection.dispatcher.end("다음노래로 이동합니다.");
  }
};