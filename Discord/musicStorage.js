const playList = [];

const recorder = (info) => {
    playList.push(info)
}


console.log(playList);

module.exports = { recorder, playList };