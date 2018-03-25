
/*
 * GET_ALMANAC
 * gets almanac data from index.js
 */
function getAlmanac()
{
   $.get("/almanac", function(data, status){
      console.log('called almanac()')
   })
}

/*
 * GET_ASTRONOMY
 * gets astronomy data from index.js
 */
function getAstronomy()
{
   $.get("/astronomy", function(data, status){
      console.log('called astronomy()')
   })
}

/*
 * GET_CONDITIONS
 * gets conditions data from index.js
 */
function getConditions()
{
   $.get("/conditions", function(data, status){
      console.log('called conditions()')
   })
}

/*
 * POST_CONDITIONS
 * posts conditions data from index.js
 */
function postConditions()
{
   $.post("/conditions", {city: $('#city').val(), state: $('#state').val(), country: $('#country').val()}, function(data, status){
      console.log('called conditions() with post')
      
      //make conditions
      var conditions = makeNewConditions(data)
      var wuData = document.createElement('div')
      wuData.appendChild(conditions)
      wuData.setAttribute('class', 'row')

      //make footer 
      var wuLogo = document.createElement('img')
      wuLogo.setAttribute('src', data.current_observation.image.url)
      wuLogo.setAttribute('class', 'img-responsive')

      var link = document.createElement('a')
      link.appendChild(wuLogo)
      link.setAttribute('href', data.current_observation.image.link)
      link.setAttribute('class', 'col')

      var footer = document.createElement('footer')
      footer.appendChild(link)
      footer.setAttribute('class', 'row')

      document.body.appendChild(wuData)
      document.body.appendChild(footer)
   })
}

/*
 * GET_FORECAST
 * gets forecast data from index.js
 */
function getForecast()
{
   $.get("/forecast", function(data, status){
      console.log('called forecast()')
   })
}

/*
 * SET_INIT
 * sets up the webpage after the initual weather search
 */
function setInit()
{
   //alter location button
   var location = $('#location')
   var locaText = document.createTextNode('New Location')
   location.empty()
   location.removeAttr('onclick')
   location.append(locaText)
   
   //make buttons
   var forecast = makeNewButton('Forecast')

   var almanac = makeNewButton('Almanac')
   
   var astronomy = makeNewButton('Astronomy')

   var conditions = makeNewButton('Conditions')

   //add buttons to nav
   var nav = document.createElement('nav')
   nav.appendChild(almanac)
   nav.appendChild(astronomy)
   nav.appendChild(conditions)
   nav.appendChild(forecast)
   nav.setAttribute('class', 'row')

   document.body.appendChild(nav)

   postConditions()
}

/*
 * MAKE_NEW_BUTTON
 * returns a new button defined by params
 */
 function makeNewButton(name)
 {
   var button = document.createElement('button')
   var text = document.createTextNode(name)
   button.appendChild(text)
   button.setAttribute('onclick', 'get'+ name + '()')
   button.setAttribute('class', 'col')

   return button
 }

 /*
 * MAKE_NEW_CONDITIONS
 * returns a new conditions defined by params
 */
 function makeNewConditions(data)
 {
   //current temp
   var temperature = document.createElement('h2')
   var temperaText = document.createTextNode(data.current_observation.temperature_string)
   temperature.appendChild(temperaText)
   temperature.setAttribute('class', 'col')

   //temp icon
   var tempicon = document.createElement('img')
   tempicon.setAttribute('src', data.current_observation.icon_url)
   tempicon.setAttribute('class', 'img-responsive')

   //weather label
   var label = document.createElement('h4')
   var lText = document.createTextNode(data.current_observation.weather)
   label.appendChild(lText)
   label.setAttribute('class', 'col-md-10 col-sm-6')

   //icon row
   var iconrow = document.createElement('div')
   iconrow.appendChild(tempicon)
   iconrow.appendChild(label)
   iconrow.setAttribute('class', 'row')

   //temp/weather icon
   var icon = document.createElement('div')
   icon.appendChild(iconrow)
   icon.setAttribute('class', 'col')
   
   //row for temp data
   var temprow = document.createElement('div')
   temprow.appendChild(temperature)
   temprow.appendChild(icon)
   temprow.setAttribute('class', 'row')

   var conditions = document.createElement('div')
   conditions.appendChild(temprow)
   conditions.setAttribute('class', 'col-md-4')

   return conditions
 }

 /*
 * NEW_Location
 * returns a new conditions defined by params
 */
 function newLocation()
 {
   //set new location

   //get conditions
 }