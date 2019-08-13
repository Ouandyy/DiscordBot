const Commando = require('discord.js-commando');

class flipCoin extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'flipcoin',
      group: 'fun',
      memberName:'flipcoin',
      clientPermission: ['SEND_MESSAGES'],
      description: 'Flips a coin head or tail'
    });
  };

  run(msg) {
    const coinflip = () => {
      var words = ['head', 'tails'];
      return words[Math.floor(Math.random() * words.length)]
    }
    return msg.say(coinflip())
  };
};

module.exports = flipCoin