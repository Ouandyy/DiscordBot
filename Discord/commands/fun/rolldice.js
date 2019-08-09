const Commando = require('discord.js-commando');

module.exports = class rollDice extends Commando.Command{
    constructor(client) {
        super(client, {
            name: 'rolldice',
            group: 'fun',
            memberName: 'rolldice',
            format: 'rolldice',
            clientPermissions: ['SEND_MESSAGES','CONNECT','SPEAK'],
            description: 'Command to roll dice'
        });
    };  

    run(msg) {
        const rolldice = () => {
            var words = [1,2,3,4,5,6];
            return words[Math.floor(Math.random() * words.length)]
        }
        return msg.say(rolldice())
    };
};