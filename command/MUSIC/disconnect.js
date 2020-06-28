module.exports = {
  name: "disconnect",
  description: "모든노래를 종료하고 나갑니다.",
  aliases: ['l'],
  cooldown: 5000,
  run(client, message, args) {
    exports.run = (client, message, args) => {
      const { channel } = message.member.voice;
      if (!channel)
        return message.channel.send(
          "죄송합니다. 유저가 음성채널에 들어가야지 가능합니다."
        );
      const serverQueue = message.client.queue.get(message.guild.id);
      if (!serverQueue)
        return message.channel.send(
          "죄송합니다. 예기지 못한 오류가났습니다."
        );
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end("노래를 종료하고 나갑니다.");
    };
  }
};