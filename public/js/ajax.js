function getAlmanac()
{
   $.get("/almanac", function(data, status){
      console.log('called almanac()')
   })
}

function getAstronomy()
{
   $.get("/astronomy", function(data, status){
      console.log('called astronomy()')
   })
}

function getConditions()
{
   $.get("/conditions", function(data, status){
      console.log('called conditions()')
   })
}

function postConditions()
{
   $.post("/conditions", {city: $('#city').val(), state: $('#state').val(), country: $('#country').val()}, function(data, status){
      console.log('called conditions() with post')
      var para = document.createElement("P")
      var t = document.createTextNode('called conditions() with post')
      para.appendChild(t)
      document.body.appendChild(para)
   })
}

function getForecast()
{
   $.get("/forecast", function(data, status){
      console.log('called forecast()')
   })
}

function setInit()
{
   var nav      = document.createElement('nav')

   var forecast = document.createElement('button')
   var foreText = document.createTextNode('Forecast')
   forecast.appendChild(foreText)
   forecast.setAttribute('onclick', 'getForecast()')

   var almanac  = document.createElement('button')
   var almText  = document.createTextNode('Almanac')
   almanac.appendChild(almText)
   almanac.setAttribute('onclick', 'getAlmanac()')

   var astronomy = document.createElement('button')
   var astroText = document.createTextNode('Astronomy')
   astronomy.appendChild(astroText)
   astronomy.setAttribute('onclick', 'getAstronomy()')

   nav.appendChild(almanac)
   nav.appendChild(astronomy)
   nav.appendChild(forecast)

   document.body.appendChild(nav)
}