const Discord = require('discord.js');
const client = new Discord.Client();
const { config } = require('dotenv');
config({
	path: __dirname + '/config/.env'
});
const option = require("./config/bot.json")
const { readdirSync } = require('fs');
const fs = require('fs');
const { Player } = require('discord-player');
const player = new Player(client, process.env.youtube_api || option.yt_api);
const WebServer = require('./web.js')
const path = require("path")

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
	for (let dir of await fs.readdir(path.join(__dirname, 'command'))) {
		(await fs.readdir(path.join(__dirname, 'command', dir)))
			.filter(r => r.endsWith('.js'))
			.forEach(file => {
				const cmd = require(path.join(__dirname, 'command', dir, file)) || {};
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

client.on('ready', () => {
	console.log(
		`[System]${client.user.username}로 로그인 하였습니다.`
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

});


WebServer.create(client, option);
client.login(process.env.token || option.token);
