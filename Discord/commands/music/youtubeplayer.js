const enterAndPlay = () => {
  const { voiceChannel } = message.member;

  voiceChannel.join()
    .then(connection => {
      const stream = ytdl('https://www.youtube.com/watch?v=BQqEMLOOMCo', { filter: 'audioonly' });
      const dispatcher = connection.playStream(stream);

      dispatcher.on('end', () => voiceChannel.leave());
    })
}

// module.exports = enterAndPlay