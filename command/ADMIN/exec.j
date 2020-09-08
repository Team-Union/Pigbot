
const {MessageEmbed} = require('discord.js')
const {discord} = require('discord.js')

exports.run = async (client, message, args, prefix) => {
  if (!client.devs.includes(message.author.id))
    return message.reply("이 명령어는 꿀꿀봇 관리자만 사용할 수 있습니다."); // bot.js에서 client.devs를 저장한 것을 불러와 포함하지 않으면 해당 메세지로 답변해줍시다.
const embed = new MessageEmbed()
.setTitle('**[오류]**')
.setDescription(`**[개발자]**${message.author}/${message.author.id}님 앞에 글자를 입력해야죠!`) 
.setColor("RED")
return message.channel.send(embed)
 }
message.channel.send(`x`).then((m)=>{
   require('child_process').exec(args.join(" "), (err, out) => {
     out = out.length > 2040 ? out.substring(0, 1080) + '..' : out
//      err = err.length > 2040 ? err.substring(0, 1080) + '..' : err
     
     
     
     

    if(out) return m.edit("**``>_``** **|** exec```cmd\n"+out+"```")
       if(err) return m.edit("**``>_``** **|** exec\n```cmd\n"+err+"```");
     
  })
})

exports.config = {
  name: "콘솔",
  aliases: ["exe", "실행", "콘솔"],
  category: ["관리자"],
  des: ["콘솔에서 명령어를 사용가능합니다."],
  use: ["ㄲ 실행 <명령어>"]
};
