require('dotenv').config() // Allows you to use local .env to test bot
const path = require('path');
const Commando = require('discord.js-commando');
const coinflip = require('./commands/fun/coinflip');
const rolldice = require('./commands/fun/rolldice');
const settings = require('./config/settings.json');
const greeting = require('./greeting.js');

// Commando is a framework of discord.js to allow for easeir command manipulation
const client = global.client = new Commando.Client({
  commandPrefix: settings.prefix,
  unknownCommandResponse: false
});

tokentest = process.env.DISCORD_API
// Commando Login: Replacing regular discord.js
client.login(process.env.DISCORD_API)

//shows that bot is online through console
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Registering created commands into groups. Allows enabling/disabling of commands.
client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['administration','Administration'],
    ['music','Music'],
    ['fun','Fun']
  ])
  .registerCommandsIn(path.join(__dirname,'commands'));

// Add Inhibitor: Allows the dispersion of commands in registry.
client.dispatcher.addInhibitor(msg => {
  if (msg.channel.type !== 'text') {
    msg.reply('Please run command in a server where the bot has joined.')
      .then(() => console.log(`Sent a reply to ${msg.author.username}`))
  }

  const prefix = '!';
  const args = msg.content.split(' ').slice(1);
  const command = msg.content.split(' ')[0].slice(prefix.length)

  let cmd;
  let botCommandExist = false;

  if (client.registry.commands.has(command)) {
    botCommandExist = true;
    cmd = client.registry.commands.get(command)
    // console.log(cmd)
    console.log(`This command exists: ${command}`)
  }
  else{
    console.log(`This command doesn't exists: ${command}`)
  }
});

/* Use this to test bot variables
// Find servers that the bot is in
console.log(client.guilds.array());
// Find commands in registry
console.log(client.registry.commands)
*/




client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
  if (!channel) return;
  channel.send(`Welcome to ${member.guild.name}. Now ${greeting()}`);
});


