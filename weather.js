var http = require("http")

module.exports.getWeather = getWeather

function getWeather(type, city, state, country, callback)
{
   console.log('inside getWeather()')
   var options = 'http://api.wunderground.com/api/71c6cb041338f31b/' + type + '/q/ID/Rexburg.json'
   
   const req = http.get(options,(res) => {
      console.log('STATUS: ' + res.statusCode)
      console.log('HEADERS: ' + res.headers)

      const {statusCode} = res
      const contentType = res.headers['content-type']

      var error
      if (statusCode !== 200) error = new Error('Request Failed\n Status Code: ' + statusCode)
      else if (!/^application\/json/.test(contentType)) error = new Error('Invalid content-type' + contentType)

      if (error)
      {
         console.error(error.message)
         res.resume()
         return
      }

      res.setEncoding('utf8')
      var rawData = ''
      res.on('data', (chunk) => {rawData += chunk})
      res.on('end', () => {
         var parsedData = JSON.parse(rawData)
         console.log(parsedData)
         callback(parsedData)
      })
      res.on('error', (e) => {console.error(e.message)})
   })
}

