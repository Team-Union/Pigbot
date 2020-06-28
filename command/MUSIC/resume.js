const Discord = require("discord.js");

module.exports = {
  name: "resume",
  description: "멈춤 노래를 재생합니다.",
  aliases: ['시작'],
  cooldown: 5000,
  run(client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("노래가 없읍니다.");
    const embed = new Discord.MessageEmbed()
      .setTitle(`🎶 현제 **${serverQueue.songs[0].title}**`)
      .setDescription(serverQueue.songs[0].description)
      .addField("Duracion", serverQueue.songs[0].timestamp)
      .setThumbnail(serverQueue.songs[0].image)
      .setColor("BLUE");
    return message.channel.send(embed);
  }
};