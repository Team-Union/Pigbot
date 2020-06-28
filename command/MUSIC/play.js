const ytdl = require("ytdl-core");
const yts = require("yt-search");
const Discord = require("discord.js");

module.exports = {
  name: "play",
  description: "노래 이름 링크를 적어 들을수 있어요.",
  aliases: ['p'],
  cooldown: 5000,
  async run(client, message, args) {
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "죄송합니다. 유저가 음성채널에 접속이 안됬습니다."
      );
    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.channel.send(
        "죄송힙니다. 꿀꿀봇의 권한 설정에 `CONNECT`가 없습니다."
      );
    if (!permissions.has("SPEAK"))
      return message.channel.send(
        "죄송힙니다. 꿀꿀봇의 권한 설정에 `SPEAK`가 없습니다."
      );

    const serverQueue = message.client.queue.get(message.guild.id);
    const songList = await yts(args.join(" "));
    const songInfo = songList.videos[0];

    const song = {
      id: songInfo.videoId,
      title: songInfo.title,
      url: songInfo.url,
      image: songInfo.imagea,
      user: message.member.id,
      description: songInfo.description,
      timestamp: songInfo.timestamp
    };

    if (serverQueue) {
      serverQueue.songs.push(song);
      const embed = new Discord.MessageEmbed()
        .setTitle(song.title)
        .setDescription(song.description)
        .addField("Duracion", song.timestamp)
        .setThumbnail(song.image)
        .setColor("BLUE");
      return message.channel.send(
        `✅ 노래가 성공적으로 목록에 저장되었습니다!`,
        embed
      );
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 2,
      playing: true
    };

    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async song => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
        queue.voiceChannel.leave();
        message.client.queue.delete(message.guild.id);
        return;
      }

      const dispatcher = queue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", error => console.error(error));

      dispatcher.setVolumeLogarithmic(queue.volume / 5);
      const embed = new Discord.MessageEmbed()
        .setTitle(song.title)
        .setDescription(song.description)
        .addField("Duracion", song.timestamp)
        .setThumbnail(song.image)
        .setColor("BLUE");
      queue.textChannel.send(embed);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`오류가...: ${error}`);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return message.channel.send(
        `예기지 못한 오류가 발생했습니다: ${error}`
      );
    }
  }
};