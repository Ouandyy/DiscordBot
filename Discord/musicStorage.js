const playList = [];

const recorder = (info) => {
    playList.push(info)
}

recorder('asdf');

console.log(playList);

module.exports = recorder;