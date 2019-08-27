const Commando =  require ('discord.js-commando');
const queue = require ('./musicStorage');

module.exports = class queueCommand extends Commando.Command {
  constructor(client) {
    super (client, {
      name: 'queue',
      group: 'music',
      memberName: 'queue',
      format: 'queue',
      clientPermissions: ['SEND_MESSAGES'],
      description:'sends queue'
    });
  }

  run (msg) {
    return(
      msg.say(queue.playList)
    )
  }
}