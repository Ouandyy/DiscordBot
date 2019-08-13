const Commando = require ('discord.js-commando');

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

  run(){
    return
  }
}