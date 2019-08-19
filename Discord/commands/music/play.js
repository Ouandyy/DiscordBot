const Commando = require('discord.js-commando');
const musicQue = require('./musicStorage');
const play = require('./youtubeplayer');

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
      const musicReq = msg.argString.slice(1);
      msg.member.voiceChannel.join();
      if (musicQue.playList.length > 0) {
        return (
          musicQue.recorder(musicReq),
          msg.say(musicReq + ' has been added to your queue.')
        )
      }else {
        return (
          musicQue.recorder(musicReq),
          msg.say('Now Playing: ' + musicReq)
        )
      }
    }

    
  }
};