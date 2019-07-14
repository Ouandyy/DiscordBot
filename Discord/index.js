const Discord = require('discord.js');
const bot = new Discord.Client();
const coinflip = require('./coinflip')
const rolldice = require('./rolldice')

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
        
        const voiceChannel = msg.member.voiceChannel;
        if(!voiceChannel) return msg.channel.send('Youre not in channel');
        console.log(voiceChannel.name)
        
        
        musicStorage.recorder(msg.content.slice(6));
        msg.channel.send(`now playing ${musicStorage.playList.shift()}`);
    }
});




bot.on('message', msg => {
    if (msg.content === '!!flipcoin') {
        msg.channel.send(coinflip());
    }
});

bot.on('message', msg => {
    if (msg.content === '!!rolldice') {
        msg.channel.send(rolldice());
    }
});

bot.on('message', msg => {
    const user = msg.member.user.username
    if (user === 'SQUINTZ') {
        msg.channel.send('stfu Jordan')
    }else if(user === 'Bl4ckB4ron') {
        msg.channel.send('stfu Andy')
    }
});


    // Welcome greetings
bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'welcome');
    if (!channel) return;
    channel.send(`Welcome to ${member.guild.name}. Now ${greeting()}`);
});



// bot login for heroku
bot.login(process.env.DISCORD_API);

//uncomment for local build and test
// const discordToken = require('./config/discordToken.js');
// bot.login(discordToken); 