var search = require('youtube-search');

const youtubeName = (input) => {
  var opts = {
    maxResults: 1,
    key: process.env.YOUTUBE_API
  };

  return new Promise((res) => {
    search(input, opts, (err, results) => {
      if (err) console.log(err);
      res(results[0].title);
    });
  })
}

module.exports = youtubeName
//example
// youtubeName('kendrick')
//   .then((data) => {console.log(data)})
//   .catch(console.error)

