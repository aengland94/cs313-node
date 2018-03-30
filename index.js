var express = require('express')
var app = express()
var smath = require('./smath')
var postal = require('./postal')
var weather = require('./weather')
var bodyParser = require('body-parser')
var cookieSession = require('cookie-session')

app.set('port', (process.env.PORT || 5000))

app.use(express.static(__dirname + '/public'))  // for accessing static files

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieSession({
   name: 'session',
   keys: ['fhbh->2|BH10C2|^|fcr/c#'],
 
   // Cookie Options
   maxAge: 1 * 60 * 60 * 1000 // 1 hour
}))  // for accessing sessions

// views is directory for all template files
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')


app.get('/math', (req, res) => {
   var params = smath(req, res)
   res.render('pages/mathResults', params)
})

app.post('/postal', (req, res) => {
      var params = postal(req.body.type, req.body.weight, res)
      res.render('pages/postalResults', params)   
})

app.get('/almanac', (req, res) => {  
   if(req.session.city)
   {
      weather.getWeather('almanac', req.session.city, req.session.state, req.session.country, (data) => {
         res.writeHead(200, { 'Content-Type': 'application/json' })
         res.end(JSON.stringify(data))
      })
   }
   else
   {
      console.log('redirecting to index.html')
      res.redirect('/')
   }
})

app.get('/astronomy', (req, res) => {  
   if(req.session.city)
   {
      weather.getWeather('astronomy', req.session.city, req.session.state, req.session.country, (data) => {
         res.writeHead(200, { 'Content-Type': 'application/json' })
         res.end(JSON.stringify(data))
      })
   }
   else
   {
      console.log('redirecting to index.html')
      res.redirect('/')
   }
})

app.post('/conditions', (req, res) => { 
   console.log('inside post conditions callback()')
   req.session.city = req.body.city
   req.session.state = req.body.state
   req.session.country = req.body.country
   console.log('after setting sessions')
   weather.getWeather('conditions', req.body.city, req.body.state, req.body.country, (data) => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(data))
   }) 
})

app.get('/conditions', (req, res) => {  
   if(req.session.city)
   {
      weather.getWeather('conditions', req.session.city, req.session.state, req.session.country, (data) => {
         res.writeHead(200, { 'Content-Type': 'application/json' })
         res.end(JSON.stringify(data))
      })
   }
   else
   {
      console.log('redirecting to index.html')
      res.redirect('/')
   }
})

app.get('/forecast', (req, res) => {  
   if(req.session.city)
   {
      weather.getWeather('forecast', req.session.city, req.session.state, req.session.country, (data) => {
         res.writeHead(200, { 'Content-Type': 'application/json' })
         res.end(JSON.stringify(data))
      })
   }
   else
   {
      console.log('redirecting to index.html')
      res.redirect('/')
   }
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))
})
