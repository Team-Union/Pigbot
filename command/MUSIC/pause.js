module.exports = {
  name: "pause",
  description: "노래도중에 노래를 멈춤니다.",
  aliases: ['ps'],
  cooldown: 5000,
  run(client, message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue && !queue.playing)
      return message.channel.send("지금 노래를 듣지 않고 있습니다.");
    queue.playing = false;
    queue.connection.dispatcher.pause();
    return message.channel.send("⏸ 노래를 성공적으로 멈줬습니다!");
  }
};