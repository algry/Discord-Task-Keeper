const config = require("./config.json");
const schedule = require("node-schedule");
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(config.token);

var session = {
	active: false
};

client.login(config.token);
var tasks = [];

client.on('ready', () => {
	console.log('I am ready!');
});

client.on('message', (message) => {
	if (message.channel.type !== 'dm') return;
	console.log(message.content);
	if (!message.content.startsWith('.r/')) return;
	var args = message.content.split('/');
	switch(args[1]) {
		case 'new':
			console.log(args);
		
			var description = args[2];
			var time = args[3];
			tasks.push(schedule.scheduleJob(time, ()=>{
				message.channel.send(description);
			}));
			break;
	}
});

//.r/new/Description/Time or /Date