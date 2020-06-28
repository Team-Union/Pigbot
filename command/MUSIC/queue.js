module.exports = {
  name: "queue",
  description: "신청한 모든 노래를 모여줍니다.",
  aliases: ['q'],
  cooldown: 5000,
  run(client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("신청한 노래가 없읍니다.");

    return message.channel.send(`
    __**신청한 노래들:**__
    ${serverQueue.songs.map(song => `**-** ${song.title}`).join("\n")}
    **현제:** ${serverQueue.songs[0].title}
    `);
  }
};