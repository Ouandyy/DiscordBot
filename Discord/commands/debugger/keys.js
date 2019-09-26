const Commando = require('discord.js-commando');

class keys extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'keys',
      group: 'debugger',
      memberName: 'keys',
      clientPermission: ['SEND_MESSAGES'],
      description: 'Gives all key that is used with bot'
    });
  };

  run(msg) {
    
    return msg.say(process.env.YOUTUBE_API)
  };
};

module.exports = keys