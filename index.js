var express = require('express')
var app = express()
var smath = require('./smath')
var postal = require('./postal')
var weather = require('./weather')
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000))

app.use(express.static(__dirname + '/public'))  // for accessing static files

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// views is directory for all template files
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.get('/', function(request, response) {
  response.render('pages/index')
})

app.get('/math', (req, res) => {
   var params = smath(req, res)
   res.render('pages/mathResults', params)
})

app.post('/postal', (req, res) => {
      var params = postal(req.body.type, req.body.weight, res)
      res.render('pages/postalResults', params)   
})

app.post('/almanac', (req, res) => {  
})

app.post('/astronomy', (req, res) => {  
})

app.post('/conditions', (req, res) => { 
   weather.getWeather('conditions', req.body.city, req.body.state, req.body.country, (data) => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(data))
   }) 
})

app.post('/forcast', (req, res) => {  
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))
})
