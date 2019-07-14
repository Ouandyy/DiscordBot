const coinflip = () => {
    var words = ['head', 'tails'];
    return words[Math.floor(Math.random() * words.length)]
}

module.exports = coinflip