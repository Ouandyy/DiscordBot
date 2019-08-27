const Commando = require('discord.js-commando');
const musicQue = require('./musicStorage');
const ytdl = require('ytdl-core');
const ytSearch = require('../../config/youtubeSearch');

module.exports = class skipCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      group: 'music',
      memberName: 'skip',
      format: 'skip',
      clientPermissions: ['SEND_MESSAGES', 'CONNECT', 'SPEAK'],
      description: 'skip to next song'
    });
    this.youtubePlayer = this.youtubePlayer.bind(this)
  }

  youtubePlayer(msg) {
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
    if (musicQue.playList[1]) {
      return (
        msg.member.voiceChannel.leave(),
        this.youtubePlayer(msg)
      )
    } else {
      return (
        msg.say('No other song in queue')
      )
    }
  }
}