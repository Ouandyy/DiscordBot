const playList = [];

const recorder = (info) => {
    playList.push(info)
}


module.exports = { recorder, playList };