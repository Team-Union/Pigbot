exports.run = async (client, msg, args, prefix) => {
if(!message.member.hasPermission("BAN_MEMBERS") || !message.guild.owner) return message.channel.send("<:dnd2:464520569560498197> 당신은 관리자 권한이 없읍니다..");

if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("<:dnd2:464520569560498197> 봇권한중에 유저 추방 권한이 없읍니다.")
  var user = msg.mentions.users.first();
  if (!user) {
    msg.reply("차단하시기 전에 맨션을 먼저 해주세요!");
  } else {
    var member = msg.guild.member(user);
    if (member) {
      member
        .ban(`${msg.author.username}님의 의해 서버에서 밴됨.`)
        .then(member => {
          msg.reply(`성공적으로 ${member.user.tag}님을 밴하였습니다.`);
        })
        .catch(msg.reply("해당 유저를 차단 할 권한이 없습니다."));
    } else {
      msg.reply("이 서버에 존재하지 않은 유저입니다!");
    }
  }
};

exports.config = {
  name: "밴",
  aliases: ["벤", "차단"],
  category: ["MODERATOR"],
  des: ["유저를 해당 서버에서 차단 시킵니다."],
  use: ["ㄲ 밴 <유저 맨션>"]
};
