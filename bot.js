const Discord = require("discord.js")
const client = new Discord.Client()
const settings = require("./config/bot.json") //The bot connects using the configuration file
const { readdirSync } = require("fs");
const fs = require("fs");
const table = (new(require("ascii-table"))).setHeading("Commands", "Status");
//https://discord.com/api/webhooks/724099546203815996/A00OT58nIAjHNMq64wczZbZ8ASgVBVMDfWiG_PyWRV6T_lzZVfMTpVa77M4QJzFoWcjt


client.emotes = require("./config/emoji.json");
client.colors = require("./config/color.json");
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.devs = ['552103947662524416', "1234567890"]
client.category = ['관리자', 'MODERATOR', 'INFO','노래']


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
  client.user
    .setActivity(`ㄲ 도움말 확인`, { type: "PLAYING" })
    .then(presence =>
      console.log(
        `상태를 변경했습니다.\n \n----------------------------`
      )
    )
    console.log(table.toString());
})

client.login(settings.token)
