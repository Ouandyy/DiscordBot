const Commando = require ('discord.js-commando');
const musicQue = require('./musicStorage');

module.exports = class playCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'stop',
      group: 'music',
      memberName: 'stop',
      format: 'stop',
      clientPermissions: ['SEND_MESSAGES', 'CONNECT', 'SPEAK'],
      description: 'Disconnect from voice chat and clear queue'
    });
  }


  run(msg){
    return (
      msg.member.voiceChannel.leave()
    )
  }
}