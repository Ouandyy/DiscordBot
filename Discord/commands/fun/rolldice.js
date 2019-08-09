const rolldice = () => {
    var words = [1,2,3,4,5,6];
    return words[Math.floor(Math.random() * words.length)]
}

module.exports = rolldice