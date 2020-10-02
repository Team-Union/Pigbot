const Discord = require("discord.js")
const reload = require("self-reload-json")
const Guild = new reload("./DB/server.json")

exports.run = async(client, msg, args, prefix) => {
    let already = new Discord.MessageEmbed()
        .setDescription("❎  이 서버는 이미 가입되어 있습니다.")
        .setColor("RED")

    // guild[msg.guild.id]가 있을 경우
    if (Guild[msg.guild.id]) return msg.reply(already)
    else {

        // guild[msg.guild.id] 값을 아래의 오브젝트로 저장
        Guild[msg.guild.id] = {
            leveling: true,
            gambling: true
        }
        let registered = new Discord.MessageEmbed()
            .setDescription("✅  성공적으로 해당 서버에 돈기능이 활성화 되었습니다..")
            .setColor("7289DA")

        // Guild 저장
        Guild.save()
        msg.reply(registered)
    }
}

exports.config = {
    name: '서버가입',
    aliases: ['registerGuild'],
    category: ['돈 기능'],
    des: ['해당 서버에 돈기능 활성화 여부를 물어봄니다..'],
    use: ['ㄲ 서버가입']
}