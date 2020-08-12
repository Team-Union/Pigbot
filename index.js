const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const reload = require("self-reload-json")
const fs = require('fs')
const config = require("./config.json")
const { MyBot } = require("koreanbots")
const Bot = new MyBot("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwMjg1NzAxNjUzOTg3MzM3MiIsImlhdCI6MTU5Mzc1NDcwMiwiZXhwIjoxNjI1MzEyMzAyfQ.eZGTMfy2Gej6I4Gxakh0UiexMO9YYS3682oZ68cNj09nJ7z5EBh2mCvBmXVBKFeUbXwxb6dk6e29wpW6AVZ4z4BjaW2VcAXqYmqzVpLyNxbwxp4d6yAkA0NjNDcYb_PA6mbaiTy8INqdGJV7fmtBk9fj8DpcRjuVrUxkjs_QWhs")

let update = count => Bot.update(count) 
    .then(res => console.log("서버 수를 정상적으로 업데이트하였습니다!\n반환된 정보:" + JSON.stringify(res)))
    .catch(console.error)

client.on("warn", console.warn);
client.on("error", console.error);

client.on("ready", () => {
    console.log(`${table.toString()}\nLogin ${client.user.username}\n----------------------------`)

    const activity = [`${client.guilds.cache.size}개의 서버`, `${client.users.cache.filter(e => !e.bot).size}명의 유저`, `${client.guilds.cache.size} guilds`, `${client.users.cache.filter(e => !e.bot).size} users`]

    setInterval(() => client.user.setActivity(activity[Math.floor(Math.random() * activity.length)]), 10000)

    ops.MyBot.update(client.guilds.cache.size).then(e => console.log(e.code)).catch(e => console.error(e.message))

    client.musicManager = new(require("./structures/MusicManager"))(client)
})
//https://discord.com/api/webhooks/724099546203815996/A00OT58nIAjHNMq64wczZbZ8ASgVBVMDfWiG_PyWRV6T_lzZVfMTpVa77M4QJzFoWcjt

readdirSync("./command/").forEach(dir => {
    readdirSync(`./command/${dir}`).filter(f => f.endsWith(".js")).forEach(file => {
        let pull = require(`./command/${dir}/${file}`)

        if (pull.name) {
            client.commands.set(pull.name, pull)
            table.addRow(file, ":white_check_mark:")
        } else table.addRow(file, ":x:")

        if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(a => client.aliases.set(a, pull.name))
    })
})

client.categories = readdirSync("./command/")
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.devs = ['552103947662524416', "1234567890"]
client.category = ['ADMIN', 'MODERATOR', 'INFO']
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
