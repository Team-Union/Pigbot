const Discord = require("discord.js")
const client = new Discord.Client()
const settings = require("./config/bot.json") //The bot connects using the configuration file
const { readdirSync } = require("fs");
const fs = require("fs");
const { Player } = require("discord-player"); //Create a new Player (Youtube API key is your Youtube Data v3 key)
const player = new Player(client, settings.youtube_api);
const table = (new(require("ascii-table"))).setHeading("Commands", "Status");
const reload = require("self-reload-json")
const guild = new reload("./DB/server.json")
const User = new reload("./DB/user.json")

client.player = player;
client.emotes = require("./config/emoji.json");
client.colors = require("./config/color.json");
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.devs = ['552103947662524416', "1234567890"]
client.category = ['관리자', 'MODERATOR', 'INFO','노래', '돈 기능']


readdirSync("./command").forEach(dir => {
    for (let file of readdirSync(`./command/${dir}`).filter(f => f.endsWith(".js"))) {
        let pull = require(`./command/${dir}/${file}`);

        if (pull.name) {
            client.commands.set(pull.name, pull);
            table.addRow(file, "❌");
        } else {
            table.addRow(file, "✅");
            continue;
        }

        pull.aliases.forEach(alias => {
            client.aliases.set(alias, pull.name)
        });
    }
});

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
client.on("warn", console.warn);
client.on("error", console.error);
client.on("ready", () => {
    console.log(`----------------------------\n \n${client.user.username}로 로그인 하였습니다.\n \n현제 상태 : 온라인\n \n----------------------------\n `)
  client.user.setStatus("idle") 
  const botgame = [`ㄲ 도움말 확인`,`${client.guilds.cache.size}서버와 함께`,`${client.users.cache.size}유저들과 게임`]
  setInterval(() => {
          const activity = botgame[Math.floor(Math.random() * botgame.length)]
          client.user.setActivity(activity)
  
        }, 5500)
    console.log(table.toString());
})

client.on("shardDisconnect", (event, id) =>
  console.log( 
    `샤드 ${id}이 연결 해제! (${event.code}) ${event}, 다시 연결하는중!`
  )
);

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
    User[msg.author.id].xp += getRandomInt(10, 100)

    // User 저장
    User.save()

    // 만약에 xp가 level * 75보다 클 경우
    if (User[msg.author.id].xp > User[msg.author.id].level * 300) {

        // xp = 0
        User[msg.author.id].xp = 0

        /**
         * level = level + 1
         * 
         * level이 2였다면 3으로 오름.
         */
        User[msg.author.id].level = User[msg.author.id].level + 1

        // 랜덤으로 지급할 돈을 변수로 선언
        let money = getRandomInt(1000, 10000)

        // money = money + money <- 위에서 선언한 money
        User[msg.author.id].money = User[msg.author.id].money + money
        let levelup = new Discord.MessageEmbed()
            .setDescription(`당신은 ${User[msg.author.id].level}레벨로 레벨업 하였습니다!\n레벨업 보상으로 ${money}원을 지급하였습니다.`)
            .setColor("7289DA")
        msg.reply(levelup)

        // User 저장
        User.save()
    }
})

client.login(settings.token)
