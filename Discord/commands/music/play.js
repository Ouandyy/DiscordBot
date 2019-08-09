const Commando = require('discord.js-commando');

module.exports = class playCommand extends Commando.Command{
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'music',
            memberName: 'play',
            format: 'play {query}',
            clientPermissions: ['SEND_MESSAGES','CONNECT','SPEAK'],
            description: 'Command to play music in the users voice channel'
        });
    }  

    run(msg) {
        return msg.say('Now Playing: Test')
    }
};