const config = require("./config.json");
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(config.token);

var session = {
	active: false
};

client.login(config.token);

client.on('ready', () => {
  console.log('I am ready!');
  client.channels.findAll("name", "general").forEach(channel=>{
	  channel.send("Start Successful");
  });
});