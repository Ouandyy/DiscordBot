const Discord = require('discord.js');
const bot = new Discord.Client();

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
    if (msg.content.slice(0,6) === '!!play') {
        msg.channel.send('now playing'); 
        musicStorage.recorder(msg.content.slice(1));
    }
});

    // Welcome greetings
bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'general');
    if (!channel) return;
    channel.send(`Welcome to BootyPirate, ${member}. Now ${greeting()}`);
});


// bot login for heroku
bot.login(process.env.DISCORD_API);


//uncomment for local build
// const discordToken = require('./config/discordToken.js');
// bot.login(discordToken); 