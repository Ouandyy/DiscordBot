const Discord = require('discord.js');
const bot = new Discord.Client();
const discordToken = require('./config/discordToken.js');
const musicStorage = require('./musicStorage')


greeting = () => {
    var words = ['Shut...The...Fuckk....UP!!!', 'suck a dick', 'eat my shorts', 'eat a dirty blue waffle', 'fuck me daddy'];
    return words[Math.floor(Math.random() * words.length)]
}

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});


// This records what comes after !
bot.on('message', msg => {
    if (msg.content[0] === '!') {
        msg.channel.send(msg.content.slice(1));
    }
});

// Welcome greetings
bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'member-log');
    if (!channel) return;
    channel.send(`Welcome to BootyPirate, ${member}. Now ${greeting()}`);
});




bot.login(discordToken);