const https = require('https')

function fetch (url) {
  return new Promise(async (resolve, reject) => {
    var res = await https.get(url, (resp) => {
      let data = ''

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk
      })

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        // return resolve(JSON.parse(data).explanation)
        return resolve(data)
      })

    }).on('error', (err) => {
      reject(err.message)
    })
  })
}

async function init () {
  var res = await fetch('https://www.google.com', 'GET')
  console.log(res)
}

init()