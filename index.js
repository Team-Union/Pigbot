const Discord = require("discord.js");
const client = new Discord.Client();
const Eco = require("quick.eco");
const db = require("quick.db");
const reload = require("self-reload-json")
const fs = require('fs')
const config = require("./config.json")
const { KoreanbotsClient } = require("koreanbots")
const client = new KoreanbotsClient({
    koreanbotsToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwMjg1NzAxNjUzOTg3MzM3MiIsImlhdCI6MTU5Mzc1NDcwMiwiZXhwIjoxNjI1MzEyMzAyfQ.eZGTMfy2Gej6I4Gxakh0UiexMO9YYS3682oZ68cNj09nJ7z5EBh2mCvBmXVBKFeUbXwxb6dk6e29wpW6AVZ4z4BjaW2VcAXqYmqzVpLyNxbwxp4d6yAkA0NjNDcYb_PA6mbaiTy8INqdGJV7fmtBk9fj8DpcRjuVrUxkjs_QWh",
    koreanbotsOptions: {
        interval: 600000 //10분마다 서버 수를 업데이트합니다. (기본값 30분)
    }
})


process.on("SIGINT", () => {
    client.destroy()
    process.exit()
})


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

client.login(config.token)
