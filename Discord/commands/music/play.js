const Commando = require('discord.js-commando');
const musicQue = require('./musicStorage')

module.exports = class playCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'play',
      group: 'music',
      memberName: 'play',
      format: 'play {query}',
      clientPermissions: ['SEND_MESSAGES', 'CONNECT', 'SPEAK'],
      description: 'Command to play music in the users voice channel'
    });
  }

  run(msg) {
    if (!msg.member.voiceChannel) {
      return msg.say('You are not in voice channel')
    }else {
      if (musicQue.playList.length > 0) {
        return (
          musicQue.recorder(msg.argString.slice(1)),
          msg.say('Test:has been added to your queue')
        )
      }else {
        return (
          musicQue.recorder(msg.argString.slice(1)),
          msg.say('Now Playing: test')
        )
      }
    
    
      //   return (
      // musicQue.recorder(msg.argString.slice(1)),
    //   msg.say('Now Playing: test')
    // )
    }

    
  }
};