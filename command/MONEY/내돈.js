const Discord = require("discord.js");
const reload = require("self-reload-json")
const User = new reload("./DB/user.json")
const Event = new reload("./DB/event.json")


exports.run = async(client, msg, args, prefix) => {
    let money = new Discord.MessageEmbed()
         //user.money를 아래와 같이 불러옴.
        .setTitle("리더보드")
        .setDescription(`:coin:보유하고 있는 금액: **${User[msg.author.id].money}**\n \n현재 레벨: **${User[msg.author.id].level}**LVL\n \n:gift:선물 보유 수 : **${Event[msg.author.id].cheast}**`)
        .setColor("7289DA")
        .setTimestamp();
    msg.reply(money)

};

exports.config = {
    name: '리더보드',
    aliases: ['돈', 'money', 'flejqhem', 'ehs'],
    category: ['돈 기능'],
    des: ['유저의 보유하고 있는 금액을 알려드립니다.'],
    use: ['ㄲ 리더보드 <유저 맨션>']
}
