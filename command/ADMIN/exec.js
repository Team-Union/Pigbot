const { MessageEmbed, Message } = require('discord.js');

exports.run = async (client, msg, args, prefix) => {
  if (!client.devs.includes(msg.author.id))
    return msg.reply("이 명령어는 꿀꿀봇 관리자만 사용할 수 있습니다.");
     const m = await msg.channel.send("<a:win_load:714119517118267442>잠시만 기달려주세요..")
        if (!args.join(" ")) return msg.channel.send("내용을 써 주세요!");
        require('child_process').exec(args.join(" "), (err, out) => {
         
            if (out) return m.edit(`실행 완료\`\`\`cmd\n${out}\`\`\``);
            if (err) return m.edit(`실행을 했는데 오류남.\`\`\`cmd\n${err}\`\`\``);
        
        })
}
exports.config = {
  name: "콘솔",
  aliases: ["sh","cmd"],
  category: ["관리자"],
  des: ["콘솔을 실행합니다"],
  use: ["ㄲ 콘솔 <코드>"]
};
