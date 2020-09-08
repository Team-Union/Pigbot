const {MessageEmbed} = require('discord.js')
const {discord} = require('discord.js')
module.exports = {
  name: "공지", 
      category: "관리자",
  description: "모든서버에 공지를 보냅니다.",
  run: async (client, message, args,dev) => {

        const author = dev
if (!author.includes(message.author.id)) return message.reply({embed:{title:`${client.emojis.cache.find(x=> x.name == "no")}권한을 확인하니, 당신은 \`User(일반유저)\`권한을 가지고잇어요`,description:' **``dev(개발자)``** 권한이 필요합니다',color:"RED"}})
     
    
    
    
    
    if (!args.join(" ")) return message.channel.send("내용을 써 주세요!");

        message.channel.send(new MessageEmbed().setTitle(`${client.user.username} 공지사항`).setDescription(`\`\`\`\n${args.join(" ")}\n\`\`\``).setColor("RANDOM")).then(async th => {
            await th.react("⭕");
            await th.react("❌");
            
            th.awaitReactions((reaction, user) => (reaction.emoji.name === "❌" || reaction.emoji.name === "⭕") && user.id === message.author.id, {
                max: 1
            }).then(collected => {
                if (collected.array()[0].emoji.name === "⭕") {
                    let result = '';
th.edit(new MessageEmbed().setTitle('📡공지가 전송되었습니다.').setColor('GREEN'))
                    client.guilds.cache.forEach(g => {
                        let gc;

                        g.channels.cache.forEach(c => {
                            if (c.name.includes("봇-명령어")||c.name.includes("bot-notice") || c.name.includes("bot_notice") || c.name.includes("botnotice") || c.name.includes("봇공지") || c.name.includes("봇-공지") || c.name.includes("봇_공지") || c.name.includes('🤖┃bot_announcement')|| c.name.includes('📜ㅣ공지사항')||c.name.includes('  ')) gc = c.id;
                        
                        
                        });
                        if (!gc && (g.channels.cache.some(x => x.type == 'text' && x.permissionsFor(client.user).has(['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'])))) gc = g.channels.cache.filter(x => x.type == 'text' && x.permissionsFor(client.user).has(['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'])).random().id; 
                        const Ch = client.channels.cache.get(gc);
                        try {
                         
                            if (!Ch) return message.author.send(`${g.name}: 발신 실패 (채널 없음)\n`).then((m) => {
                              
                            })
                            if (!Ch.permissionsFor(g.me).has(['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'])) return message.author.send(`${g.name}: 발신 실패 (메시지 발신 실패)\n`)
                            
                            Ch.send(new MessageEmbed().setTitle(`${client.user.username} 공지`).setThumbnail(client.user.displayAvatarURL()).setDescription(args.join(" ")+"\n\n[서포트 참여](https://discord.gg/SXx598F)").setColor(0x00ff00).setFooter(message.author.tag, message.author.displayAvatarURL()).setTimestamp())
                        } catch (e) {
                            message.author.send(`에러남.\n${e.message || e}`)
                        }
                    })
                } else {
                    th.edit(new MessageEmbed().setTitle("공지사항 발신 취소됨").setColor(0x00ff00))
                }
            })
        })
    
  
  
  
  }
}
