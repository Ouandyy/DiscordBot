const Commando = require('discord.js-commando');
const musicQue = require('./musicStorage');
const ytdl = require('ytdl-core');
const ytSearch = require('../../config/youtubeSearch');

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
    this.youtubePlayer = this.youtubePlayer.bind(this)
  }
//recursion to checkplay list
  youtubePlayer (msg) {
    msg.member.voiceChannel.join()
      .then(connection => {
        ytSearch(musicQue.playList[0])
        .then((data) => {
          const stream = ytdl(data, { filter: 'audioonly' });
          const dispatcher = connection.playStream(stream);
          dispatcher.on('end', () => {
            if (musicQue.playList[1]) {
              musicQue.playList.shift();
              msg.say('Now playing ' + musicQue.playList[0])
              this.youtubePlayer(msg)
            } else {
              msg.member.voiceChannel.leave(),
                musicQue.playList.shift()
            }
          })
        })
      })
  }


  run(msg) {
    if (!msg.member.voiceChannel) {
      return msg.say('You are not in voice channel')
    }else {
      const musicReq = msg.argString.slice(1);
      if (musicQue.playList.length > 0) {
        return (
          musicQue.recorder(musicReq),
          msg.say(musicReq + ' has been added to your queue.')
        )
      }else {
        return (
          musicQue.recorder(musicReq),
          msg.say('Now Playing: ' + musicReq),
          this.youtubePlayer(msg)
        )
      }
    }
  }
};