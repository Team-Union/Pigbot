const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
    name: "뮤트",
    description: "디스코드 서버에 유저를 말 못하게 합니다!",
    use: "ㄲ 뮤트",
    category: "MODERATOR",
    accessableby: "Members",
    aliases: ["말 못해요", "뮤트"]
  },
  run: async (bot, message, args) => {
    // check if the command caller has permission to use the command
    if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner)
      return message.channel.send("서버주인,관리자 권한 필요!");

    if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"]))
      return message.channel.send("꿀꿀봇에 관리자,어드민 권한 팔요");

    //define the reason and mutee
    let mutee =
      message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!mutee) return message.channel.send("유저를 찼지못했습니다!");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "사유를 적어주세요";

    //define mute role and if the mute role doesnt exist then create one
    let muterole = message.guild.roles.cache.find(r => r.name === "Muted");
    if (!muterole) {
      try {
        muterole = await message.guild.createRole({
          name: "Muted",
          color: "#514f48",
          permissions: []
        });
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SEND_TTS_MESSAGES: false,
            ATTACH_FILES: false,
            SPEAK: false
          });
        });
      } catch (e) {
        message.channel.send(e.stack);
      }
    }

    //add role to the mentioned user and also send the user a dm explaing where and why they were muted
    mutee.roles.add(muterole.id).then(() => {
      message.delete();
      mutee
        .send(`Hello, you have been in ${message.guild.name} for: ${reason}`)
        .catch(err => message.channel.send(err));
      message.channel.send(`${mutee.user.username} 뮤트성공!.`);
    });

    //send an embed to the modlogs channel
    let embed = new MessageEmbed()
      .setColor("RED")
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
      .addField("지급여부:", "mute")
      .addField("지급된 사람:", mutee.user.username)
      .addField("부여한 사람:", message.author.username)
      .addField("사유:", reason)
      .addField("날짜:", message.createdAt.toLocaleString());

    return message.channel.send(embed);
  }
};
