const Discord = require("discord.js");
const client = new Discord.Client();
const Eco = require("quick.eco");
const db = require("quick.db");
const reload = require("self-reload-json")
const fs = require('fs')
const config = require("./config.json")

client.once("ready", () => {
  console.log("봇작동중...");
  client.user
    .setActivity(`ㄲ 도움말 확인`, { type: "PLAYING" })
    .then(presence =>
      console.log(
        `Activity set to ${presence.game ? presence.game.name : "none"}`
      )
    )
    .catch(console.error);
    const hook = new Discord.WebhookClient('724099546203815996', 'A00OT58nIAjHNMq64wczZbZ8ASgVBVMDfWiG_PyWRV6T_lzZVfMTpVa77M4QJzFoWcjt');
    hook.send(`꿀꿀봇 작동했다.\n \n 평균 핑이 ${client.ws.ping}ms 보인다.`)
});
//https://discord.com/api/webhooks/724099546203815996/A00OT58nIAjHNMq64wczZbZ8ASgVBVMDfWiG_PyWRV6T_lzZVfMTpVa77M4QJzFoWcjt


client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.devs = ['552103947662524416', "1234567890"]
client.category = ['ADMIN', 'ECONOMY', 'MODERATOR', 'INFO']
fs.readdirSync("./command/").forEach(dir => {
    const Filter = fs.readdirSync(`./command/${dir}`).filter(f => f.endsWith(".js"));
    Filter.forEach(file => {
        const cmd = require(`./command/${dir}/${file}`);
        client.commands.set(cmd.config.name, cmd)
        for (let alias of cmd.config.aliases) {
            client.aliases.set(alias, cmd.config.name)
        }
    })
})


function runCommand(command, msg, args, prefix) {
    if (client.commands.get(command) || client.aliases.get(command)) {
        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
        if (cmd) cmd.run(client, msg, args, prefix);
        return
    }
}
client.on("message", async msg => {
    const prefix = "ㄲ "
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;
    let args = msg.content.slice(prefix.length).trim().split(/ +/g)
    let command = args.shift().toLowerCase()
    try {
        runCommand(command, msg, args, prefix)
    } catch (e) {
        console.error(e)
    }

})

// 레벨링을 위하여 message 이벤트를 하나 더 생성함.
client.on("message", async msg => {
    // User[msg.author.id]가 없을 경우
    if (!User[msg.author.id]) {
        User[msg.author.id] = {
                level: 1,
                money: 0,
                xp: 0
            }
            // User 저장
        User.save()
    }

    // 무작위숫자 함수 
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // guild[msg.guild.id]가 없을 경우 return;
    if (!guild[msg.guild.id]) return;

    // guild[msg.guild.id].leveling == false일 경우 return;
    if (guild[msg.guild.id].leveling == false) return;

    // 유저의 경험치는 1,10까지 랜덤으로 획득
    User[msg.author.id].xp += getRandomInt(1, 10)

    // User 저장
    User.save()

    // 만약에 xp가 level * 75보다 클 경우
    if (User[msg.author.id].xp > User[msg.author.id].level * 75) {

        // xp = 0
        User[msg.author.id].xp = 0

        /**
         * level = level + 1
         * 
         * level이 2였다면 3으로 오름.
         */
        User[msg.author.id].level = User[msg.author.id].level + 1

        // 랜덤으로 지급할 돈을 변수로 선언
        let money = getRandomInt(100, 500)

        // money = money + money <- 위에서 선언한 money
        User[msg.author.id].money = User[msg.author.id].money + money
        let levelup = new Discord.MessageEmbed()
            .setDescription(`당신은 ${User[msg.author.id].level}레벨로 레벨업 하였습니다!\n레벨업 보상으로 ${money}코인을 지급하였습니다.`)
            .setColor("7289DA")
        msg.reply(levelup)

        // User 저장
        User.save()
    }
})

client.login(config.token)
