const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {
        if (!toSend) return message.channel.send('공지 내용을 써 주세요.');
        const prompt = new Discord.MessageEmbed()
            .setTitle('공지를 전송할까요?')
            .setThumbnail(client.user.displayAvatarURL())
            .setColor('RANDOM')
            .addField('전송할 내용', toSend, true)
            .addField('전송자', message.author.tag, true)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
        let p = await message.channel.send(prompt);
        p.react('✅');
        p.react('❌');
        const filter = (reaction, user) => (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && user.id === message.author.id;
        const collector = p.createReactionCollector(filter, {
            time: 30000,
            max: 1
        });
        collector.on('end', async collected => {
            if (collected && collected.first() && collected.first().emoji.name == '✅') {
                let permissionDeniedCnt = 0;
                const noticeEmbed = new Discord.MessageEmbed()
                    .setTitle(`꿀꿀봇 공지`)
                    .setColor('BLUE')
                    .setThumbnail(client.user.displayAvatarURL())
                    .setDescription(`${toSend}
공지가 왜 여기로 오나요?
꿀꿀봇 공지는 기본적으로 랜덤 채널에 발송돼요. 공지 채널을 설정하려면 채널 주제에 \`${client.user.id}\`를 포함시키거나 \`봇공지\` 또는 \`봇-공지\` 또는 \`봇_공지\`를 포함하는 이름을 가진 채널을 만들어주세요.
🔗 [봇 초대하기](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)
🔗 [꿀꿀봇 공식 디스코드](https://invite.gg/pigbot)
🔗 [꿀꿀봇 추천하기](https://koreanbots.dev/bots/702857016539873372)
[${client.user.username} 사이트](${process.env.WEBSITE})`)
                    .setFooter(message.author.tag, message.author.displayAvatarURL())
                    .setTimestamp();
                prompt.setTitle(`${client.emojis.cache.find(x => x.name == 'loading')} 공지 전송 중...`)
                    .setColor('RANDOM')
                    .setTimestamp();
                await p.edit(prompt);
                for (let x of client.guilds.cache.array()) {
                  if (x.channels.cache.find(c => (c.type == 'text' || c.type == 'news') && c.permissionsFor(client.user).has(['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS']) && c.topic && c.topic.includes(client.user.id))) {
                    x.channels.cache.find(c => (c.type == 'text' || c.type == 'news') && c.permissionsFor(client.user).has(['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS']) && c.topic && c.topic.includes(client.user.id)).send(noticeEmbed);
                  } else if (x.channels.cache.find(c => (c.type == 'text' || c.type == 'news') && c.permissionsFor(client.user).has(['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS']) && (c.name.includes('봇공지') || c.name.includes('봇-공지') || c.name.includes('봇_공지')))) {
                    x.channels.cache.find(c => (c.type == 'text' || c.type == 'news') && c.permissionsFor(client.user).has(['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS']) && (c.name.includes('봇공지') || c.name.includes('봇-공지') || c.name.includes('봇_공지'))).send(noticeEmbed);
                  } else if (x.channels.cache.find(c => (c.type == 'text' || c.type == 'news') && c.permissionsFor(client.user).has(['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS']))) {
                    x.channels.cache.filter(c => (c.type == 'text' || c.type == 'news') && c.permissionsFor(client.user).has(['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'])).random().send(noticeEmbed);
                  } else {
                    permissionDeniedCnt++;
                  }
                }
                prompt.setTitle(`공지 전송 완료!`)
                  .spliceFields(0, 2)
                  .addField('전송한 내용', toSend)
                  .addField('전송한 서버 수', client.guilds.cache.size - permissionDeniedCnt)
                  .addField('전송하지 못한 서버 수', permissionDeniedCnt)
                  .addField('전송자', message.author.tag)
                  .setColor('RED')
                  .setTimestamp()
              p.edit(prompt);
            } else {
                const cancled = new Discord.MessageEmbed()
                    .setTitle('공지 전송이 취소되었어요.')
                    .setColor(0xff0000)
                    .setThumbnail(client.user.displayAvatarURL())
                    .addField('전송 예정이었던 내용', toSend, true)
                    .setFooter(message.author.tag, message.author.displayAvatarURL())
                    .setTimestamp()
                p.edit(cancled);
            }
            p.reactions.removeAll();
        });
    }
}

exports.config = {
  name: "공지",
  aliases: ["공지", "공지사항"],
  category: ["ADMIN"],
  des: ["공지사항 을 올립니다 (꿀꿀봇 관리자 필요)"],
  use: ["ㄲ 공지"]
};
