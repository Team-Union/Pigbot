const { MessageEmbed, DiscordAPIError, Discord } = require("discord.js")

const verificationLevels = {
	NONE: '아무것도 보호하지 않아도되요',
	LOW: '보안이 낮아요(이메일이 인증되야해요)',
	MEDIUM: '보안이 중간이에요(5분이 지나야 서버를 이용하실수있어요)',
	HIGH: '보안이 높아요(10분이 지나야 서버를 이용하실수있어요)',
	VERY_HIGH: '보안이 매우 높아요(휴대폰인증이 완료되야해요)'
};

exports.run = async (client, message, args, prefix) => {
 let inline = true
            let sicon = message.guild.iconURL;
            let serverembed = new MessageEmbed()
            .setColor("#0099ff")
            .setThumbnail(sicon)
            .setAuthor(message.guild.name)
            .addField("서버 이름", message.guild.name, inline)
            .addField("서버 ID", message.guild.id, inline)
            .addField("서버 주인", message.guild.owner, inline)
            .addField("현제 이용중인 샤드", message.guild.shardID, inline)
            .addField("서버 위치", message.guild.region, inline)
            .addField("멤버 수", `${message.guild.memberCount}`, inline)
            .addField("역할 개수", message.guild.roles.cache.size, inline)
            .addField("채널 개수", message.guild.channels.cache.size, inline)
            .addField('서버 부스트', [`${message.guild.premiumTier ? `level ${message.guild.premiumTier}` : '아무도 부스트 하지 않음'}`], inline)
            .addField('부스트 수',`${message.guild.premiumSubscriptionCount || '0'}`, inline)
            .addField("서버 보안 레벨",`${verificationLevels[message.guild.verificationLevel]}`, false)
            .addField("서버 가입일", message.member.joinedAt)
            .addField("생일", `${message.guild.createdAt}`)
            .setTimestamp()
            .setFooter(`${message.guild.name} 의 정보`);
        
            message.channel.send(serverembed);
};



exports.config = {
  name: "서버정보",
  aliases: ["serverinfo","섭정","tjqjwjdqh"],
  category: ["INFO"],
  des: ["서버정보를 봅니다"],
  use: ["ㄲ 서버정보"]
};
