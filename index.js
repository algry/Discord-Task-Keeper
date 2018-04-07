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
			var description = args[2];
			var time = args[3];
			var latestTask = tasks.push({time:time,description:description,job:schedule.scheduleJob(time, ()=>{
				message.channel.send(description);
			})});
			message.channel.send('Your new reminder number is: ' + latestTask);
			break;
		case 'del':
			tasks[args[2]-1].job.cancel();
			tasks.splice(args[2]-1, 1);
			message.channel.send('Deleted task ' + args[2]);
			break;
		case 'list':
			var list = "Tasks: \n";
			tasks.forEach((task,index)=>{
				list+="Your task number " + (index+1) + " is '" + task.description + "', and it will be set off at: " + task.time + "\n";
			})
			message.channel.send(list);
			break;
	}
});

//.r/new/Description/Time or /Date
//.r/del/taskNum
//.r/list