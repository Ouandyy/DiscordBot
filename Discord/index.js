require('dotenv').config() // Allows you to use local .env to test bot
const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const coinflip = require('./coinflip');
const rolldice = require('./rolldice');
const YTDL = require('ytdl-core');
const settings = require('./config/settings.json');
const musicStorage = require('./musicStorage');
const greeting = require('./greeting.js')

// Commando is a framework of discord.js to allow for easeir command manipulation
const client = global.client = new Commando.Client({
  commandPrefix: settings.prefix
});

tokentest = process.env.DISCORD_API
// Commando Login: Replacing regular discord.js
client.login(process.env.DISCORD_API)

// Will switch up discord.js for Discord functionality (editing messages) versus using it as a bot lien
const bot = new Discord.Client();

//shows that bot is online through console
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

// Registering created commands into groups. Allows enabling/disabling of commands.
client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['administration','Administration'],
    ['music','Music'],
    ['fun','Fun']
  ])




const play = (connection, message) => {
  

   connection.playStream(YTDL(musicStorage.playList[0], {filter: 'audioonly'}));
  
   musicStorage.playList.shift();
  
    // if (musicStorage[0]) {
    //   play(connection, musicStorage[0])
    // }
    // else {
    //   connection.disconnect();
    // }

}


bot.on('message', msg => {
  if (msg.content.slice(0, 6) === '!!play') {
    const musicInput = msg.content.split(' ')[1];
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel) {
      return msg.channel.send('Youre not in channel')
    };
    
    if(!musicInput) {
      return msg.channel.send('No input is provided')
    };

    
    
    musicStorage.recorder(musicInput);
    msg.channel.send(`${musicStorage.playList[0]} has been added`);
    
    
    
    if (!msg.guild.voiceConnection) {
      msg.member.voiceChannel.join()
      .then((connection) => {
        play(connection, musicStorage.playList[0])
      })
      .catch((err) => {console.error("error at voice connection", err)})
    }
    
    
    
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

// bot.on('message', msg => {
//   const user = msg.member.user.username
//   if (user === 'SQUINTZ') {
//     msg.channel.send('stfu Jordan')
//   } else if (user === 'Bl4ckB4ron') {
//     msg.channel.send('stfu Andy')
//   } else if (user === 'Virus') {
//     msg.channel.send('stfu Jimmy')
//   }
// });


// Welcome greetings
bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
  if (!channel) return;
  channel.send(`Welcome to ${member.guild.name}. Now ${greeting()}`);
});



// bot login for heroku
// bot.login(process.env.DISCORD_API)

// uncomment for local build and test
// const discordToken = require('./config/discordToken.js');
// bot.login(discordToken); 