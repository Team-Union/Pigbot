const Discord = require('discord.js');
const client = new Discord.Client();
const { config } = require('dotenv');
config({
	path: __dirname + '/config/.env'
});
const { readdirSync } = require('fs');
const fs = require('fs');
const { Player } = require('discord-player');
const player = new Player(client, process.env.youtube_api);
const table = new (require('ascii-table'))().setHeading('명령어', '상태');
const reload = require('self-reload-json');
const guild = new reload('./DB/server.json');
const User = new reload('./DB/user.json');

client.player = player;
client.emotes = require('./config/emoji.json');
client.colors = require('./config/color.json');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.devs = [
	'552103947662524416',
	'674813875291422720',
	'628595345798201355',
	'616570697875193866'
];
client.category = ['관리자', 'MODERATOR', 'INFO', '노래', '돈 기능', '이벤트'];
client.reloadCommands = async function() {
	client.commands.clear();
	client.aliases.clear();

	let cache = Object.keys(require.cache).filter(
		r => !r.includes('node_modules')
	);

	for (let key of cache) {
		delete require.cache[key];
	}
	for (let dir of await fss.readdir(path.join(__dirname, 'commands'))) {
		(await fss.readdir(path.join(__dirname, 'commands', dir)))
			.filter(r => r.endsWith('.js'))
			.forEach(file => {
				const cmd = require(path.join(__dirname, 'commands', dir, file)) || {};
				if (!cmd.name) {
					console.warn(
						`Command file ${dir}/${file} doesn't have name field. skipping..`
					);
					return;
				}
				if (!cmd.run) {
					console.warn(
						`Command file ${dir}/${file} doesn't have run field. skipping..`
					);
					return;
				}
				cmd.category = dir;

				client.commands.set(cmd.name, cmd);
				cmd.aliases.forEach(alias => {
					client.aliases.set(alias, cmd.name);
				});
			});
	}

	return {
		commands: client.commands.size,
		aliases: client.aliases.size,
		cache: cache.length
	};
};

fs.appendFile('log.txt', `${client.readyTimestamp}`, function(err) {
	if (err) {
		// append failed
	} else {
		// done
	}
});

//module.exports = require('knex')(
//    client : 'mysql',
//    connection: {
//   	port: '3306'
//        host: 'piko.app',
//        user: 'MadeGOD',
//        password: 'anhgerel2008',
//        database: 'pigbot'
//})
readdirSync('./command').forEach(dir => {
	for (let file of readdirSync(`./command/${dir}`).filter(f =>
		f.endsWith('.js')
	)) {
		let pull = require(`./command/${dir}/${file}`);

		if (pull.name) {
			client.commands.set(pull.name, pull);
			table.addRow(file, '❌오류남 ㅅㄱ');
		} else {
			table.addRow(file, '✅안정화');
			continue;
		}

		pull.aliases.forEach(alias => {
			client.aliases.set(alias, pull.name);
		});
	}
});

fs.readdirSync('./command/').forEach(dir => {
	const Filter = fs
		.readdirSync(`./command/${dir}`)
		.filter(f => f.endsWith('.js'));
	Filter.forEach(file => {
		const cmd = require(`./command/${dir}/${file}`);
		client.commands.set(cmd.config.name, cmd);
		for (let alias of cmd.config.aliases) {
			client.aliases.set(alias, cmd.config.name);
		}
	});
});

function runCommand(command, msg, args, prefix) {
	if (client.commands.get(command) || client.aliases.get(command)) {
		const cmd =
			client.commands.get(command) ||
			client.commands.get(client.aliases.get(command));
		if (cmd) cmd.run(client, msg, args, prefix);
		return;
	}
}
client.on('message', async msg => {
	const { prefix } = require('./config/bot.json');
	if (msg.author.bot) return;
	if (!msg.content.startsWith(prefix)) return;
	let args = msg.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	let command = args.shift().toLowerCase();
	try {
		runCommand(command, msg, args, prefix);
	} catch (e) {
		console.error(e);
	}
});

/*client.on('message', async msg => {
  if (msg.author.bot) return
  if (msg.channel.type !== "dm") return
  const Hook = new Discord.WebhookClient(settings.webhook.id, settings.webhook.token)
  console.log(`${msg.author.tag}(${msg.author.id})\n${msg.content}\n${msg.createdAt}`)
  msg.react("✅") 
  let embed = new Discord.MessageEmbed()
    .setTitle(`문의자 : **${msg.author.tag}** (${msg.author.id})`)
    .setDescription(`\`ㄲ 답변 ${msg.author.id} [내용]`)
    .setColor("BLUE")
    .setFooter("보낸 일")
    .setTimestamp()
    .addField("메세지 내용", `${msg.content}`)
 Hook.send('<@552103947662524416>', embed)
      .catch((e)=>{
    Hook.send("에러가 발생\n"+e)
  })
})
*/
client.on('ready', () => {
	console.log(
		`----------------------------\n \n${
			client.user.username
		}로 로그인 하였습니다.\n \n현재 상태 : 온라인\n \n----------------------------\n `
	);
	client.user.setStatus('idle');
	const botgame = [
		`ㄲ 도움말 확인`,
		`${client.guilds.cache.size}서버와 함께`,
		`${client.users.cache.size}유저들과 게임`
	];
	setInterval(() => {
		const activity = botgame[Math.floor(Math.random() * botgame.length)];
		client.user.setActivity(activity);
	}, 5500);
	console.log(table.toString());
	/* let on = new Discord.MessageEmbed() // var -> let으로 수정하였습니다.
	    .setTitle("봇 정보")
	    .setDescription(`${client.user.username}로 로그인 하였습니다.\n현재 상태 : 온라인`)
        .setTimestamp()
	    .setFooter("가동시간")
	    .setColor("0x00FF46")
    const hook = new Discord.WebhookClient('762264612807639091', 'wWJTYmQK2DL-RlVJ8RuPr6rKZsgxo8i7wvH1AtvBrVAq0Bjkn0xOgkVOse6BsBB4PrHe');
    hook.send(on)*/
});

client.on('message', async msg => {
	if (!User[msg.author.id]) {
		User[msg.author.id] = {
			level: 1,
			money: 1000,
			xp: 0
		};
		User.save();
	}
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	if (!guild[msg.guild.id]) {
		guild[msg.guild.id] = {
			gamble: false,
			leveling: false
		};
		guild.save();
	}
	if (msg.author.bot) return;
	if (guild[msg.guild.id].leveling == false) return;
	User[msg.author.id].xp += getRandomInt(20, 40);
	User.save();
	if (User[msg.author.id].xp > User[msg.author.id].level * 1000) {
		User[msg.author.id].xp = 0;
		User[msg.author.id].level = User[msg.author.id].level + 1;

		let money = getRandomInt(1000, 10000);

		User[msg.author.id].money = User[msg.author.id].money + money;
		let levelup = new Discord.MessageEmbed()
			.setDescription(
				`***${msg.author.username}***님 ${
					User[msg.author.id].level
				}LVL로 레벨업 하였습니다!\n레벨업 보상: ${money}:coin:.`
			)
			.setColor('7289DA');
		msg.reply(levelup);

		// User 저장
		User.save();
	}
});

client.login(process.env.token);
