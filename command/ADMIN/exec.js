if (!author.includes(message.author.id)) return message.reply({embed:{title:`${client.emojis.cache.find(x=> x.name == "no")}권한을 확인하니, 당신은 \`User(일반유저)\`권한을 가지고잇어요`,description:' **``dev(개발자)``** 권한이 필요합니다',color:"RED"}})
             if(!args.length) {
const embed = new MessageEmbed()
.setTitle('**[오류]**')
.setDescription(`**[개발자]**${message.author}/${message.author.id}님 앞에 글자를 입력해야죠!`) 
.setColor("RED")
return message.channel.send(embed)
 }
 message.channel.send(`${client.emojis.cache.find(x => x.name == "load2")}`).then((m)=>{
   require('child_process').exec(args.join(" "), (err, out) => {
     out = out.length > 2040 ? out.substring(0, 1080) + '..' : out
//      err = err.length > 2040 ? err.substring(0, 1080) + '..' : err
     
     
     
     

    if(out) return m.edit("**``>_``** **|** exec```cmd\n"+out+"```")
       if(err) return m.edit("**``>_``** **|** exec\n```cmd\n"+err+"```");
     
  })
 })
}
