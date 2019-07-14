const Discord = require('discord.js');
const bot = new Discord.Client();
const discordToken = require('./config/discordToken.js');
const musicStorage = require('./musicStorage');
    //contains .recorder which is a method
    //contains .playlist which is array of user input
const greeting = require('./greeting.js')
    // random greeting gen


    //shows that bot is online through console
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});


    // This records what comes after !
bot.on('message', msg => {
    if (msg.content[0] === '!') {
        msg.channel.send(msg.content.slice(1)); 
        musicStorage.recorder(msg.content.slice(1));
    }
});

    // Welcome greetings
bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'general');
    if (!channel) return;
    channel.send(`Welcome to BootyPirate, ${member}. Now ${greeting()}`);
});


    //bot login
bot.login(discordToken);