module.exports = {
  name: "volume",
  description: "현제 볼륨을 확인하거나 조절합니다.",
  aliases: ['v'],
  run(client, message, args) {
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "죄송합니다. 유저가 음성채널에 접속이 안됬습니다."
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("현제 노래가 재생되지 않습니다.");
    if (!args[0])
      return message.channel.send(
        `현제 볼륨: **${serverQueue.volume}**`
      );
    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
    return message.channel.send(`현제 볼륨: **${args[0]}**`);
  }
};