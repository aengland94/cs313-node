
/*
 * GET_ALMANAC
 * gets almanac data from index.js
 */
function getAlmanac()
{
   $.get("/almanac", function(data, status){
      console.log('called almanac()')
      $('button.almanac').remove()

      var almanac = makeNewAlmanac(data)

      $('div.conditions').after(almanac)
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
      $('button.astronomy').remove()

      var astronomy = makeNewAstronomy(data)

      $('div.conditions').after(astronomy)
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
      
      //make conditions
      var conditions = makeNewConditions(data)

      $('.conditions').replaceWith(conditions)
   })
}

/*
 * POST_NEW_DATA  
 * posts conditions data from index.js
 * sets up page accounding to response
 */
function postNewData(isInit = true)
{
   $.post("/conditions", {city: $('#city').val(), state: $('#state').val(), country: $('#country').val()}, function(data, status){
      console.log('called conditions() with post')
      var initRes
      var wuData

      if (data.current_observation)
      {
         //fills the nav if location is found
         fillNav()
         //make conditions
         initRes = makeNewConditions(data)
      }
      else
      {
         //location error
         initRes = makeNewText('h1', 'Unkown Location. Please try another.','col error')
      }

      if (isInit)
      {
         //make div for weather data
         wuData = makeNewDiv('row wuData', [initRes])
         document.body.appendChild(wuData)
         //make footer
         var footer = makeNewFooter()
         document.body.appendChild(footer)
      }
      else
      {
         //fill div for weather
         wuData = $('div.wuData')
         wuData.append(initRes)
      }
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
      $('button.forecast').remove()

      var forecast = makeNewForecast(data)

      $('div.wuData').append(forecast)
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
   location.attr('onclick', 'newLocation()')
   location.append(locaText)

   //make nav
   var nav = document.createElement('nav')
   nav.setAttribute('class', 'row')
   document.body.appendChild(nav)

   postNewData()
}


/*
 * FILL_NAV
 * Fills the nav with buttons
 */
 function fillNav()
 {
   //make buttons
   var forecast = makeNewButton('Forecast')
   forecast.setAttribute('class', 'col forecast')

   var almanac = makeNewButton('Almanac')
   almanac.setAttribute('class', 'col almanac')
   
   var astronomy = makeNewButton('Astronomy')
   astronomy.setAttribute('class', 'col astronomy')

   var conditions = makeNewButton('Update Conditions')
   conditions.setAttribute('class', 'col conditions')

   //add buttons to nav
   var nav = $('nav')
   nav.append(almanac)
   nav.append(astronomy)
   nav.append(conditions)
   nav.append(forecast)
 }

/*
 * MAKE_NEW_ALMANAC
 * returns a new almanac widget defined by params
 */
 function makeNewAlmanac(data)
 {
   //Avg 
   var avg = makeNewText('h2', 'Averages', 'col')
   var avgrow = makeNewDiv('row', [avg])

   //Avg High
   var avgHighText = 'High: ' + data.almanac.temp_high.normal.F + ' (' + data.almanac.temp_high.normal.C + ')'
   var avgHigh = makeNewText('h4', avgHighText, 'col')
   var avgHighrow = makeNewDiv('row', [avgHigh])

   //Avg Low
   var avgLowText = 'Low:  ' + data.almanac.temp_low.normal.F + ' (' + data.almanac.temp_low.normal.C + ')'
   var avgLow = makeNewText('h4', avgLowText, 'col')
   var avgLowrow = makeNewDiv('row', [avgLow])

   //Avg col
   var avgcol = makeNewDiv('col', [avgrow, avgHighrow, avgLowrow])


   //Rec
   var rec = makeNewText('h2', 'Records', 'col')
   var recrow = makeNewDiv('row', [rec])

   //Rec High
   var recHighText = 'High: ' + data.almanac.temp_high.record.F + ' (' + data.almanac.temp_high.record.C + ')'
   var recHigh = makeNewText('h4', recHighText, 'col')
   var recHighrow = makeNewDiv('row', [recHigh])

   //Rec Low
   var recLowText = 'Low:  ' + data.almanac.temp_low.record.F + ' (' + data.almanac.temp_low.record.C + ')'
   var recLow = makeNewText('h4', recLowText, 'col')
   var recLowrow = makeNewDiv('row', [recLow])

   //Rec col
   var reccol = makeNewDiv('col', [recrow, recHighrow, recLowrow])

   var row = makeNewDiv('row', [avgcol, reccol])

   var almanac = makeNewDiv('col-md-4 widget almanac', [row])

   return almanac
 }

 /*
 * MAKE_NEW_ASTRONOMY
 * returns a new astronomy widget defined by params
 */
 function makeNewAstronomy(data)
 {
   //Sun
   var sun = makeNewText('h2', 'Sun', 'col')
   var sunrow = makeNewDiv('row', [sun])

   //Sun rise
   var sunRiseText = 'Rise: 0' + data.moon_phase.sunrise.hour + ':' + data.moon_phase.sunrise.minute
   var sunRise = makeNewText('h4', sunRiseText, 'col')
   var sunRiserow = makeNewDiv('row', [sunRise])

   //Sun set
   var sunSetText = 'Set: ' + data.moon_phase.sunset.hour + ':' + data.moon_phase.sunset.minute
   var sunSet = makeNewText('h4', sunSetText, 'col')
   var sunSetrow = makeNewDiv('row', [sunSet])

   //Sun col
   var suncol = makeNewDiv('col', [sunrow, sunRiserow, sunSetrow])


   //Mon
   var mon = makeNewText('h2', 'Moon', 'col')
   var monrow = makeNewDiv('row', [mon])

   //Mon rise
   var monRiseText = 'Rise: ' + data.moon_phase.moonrise.hour + ':' + data.moon_phase.moonrise.minute
   var monRise = makeNewText('h4', monRiseText, 'col')
   var monRiserow = makeNewDiv('row', [monRise])

   //Mon set
   var monSetText = 'Set: 0' + data.moon_phase.moonset.hour + ':' + data.moon_phase.moonset.minute
   var monSet = makeNewText('h4', monSetText, 'col')
   var monSetrow = makeNewDiv('row', [monSet])

   //Mon col
   var moncol = makeNewDiv('col', [monrow, monRiserow, monSetrow])

   var row = makeNewDiv('row', [suncol, moncol])

   var astronomy = makeNewDiv('col-md-4 widget astronomy', [row])

   return astronomy
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
 * returns a new conditions widget defined by params
 */
 function makeNewConditions(data)
 {
   //current temp
   var temperature = makeNewText('h2', data.current_observation.temperature_string, 'col')
   
   //temp icon
   var tempicon = document.createElement('img')
   tempicon.setAttribute('src', data.current_observation.icon_url)
   tempicon.setAttribute('class', 'img-responsive')

   //weather label
   var label = makeNewText('h4', data.current_observation.weather, 'col-md-10 col-sm-6')

   //icon row
   var iconrow = makeNewDiv('row', [tempicon, label])

   //temp/weather icon
   var icon = makeNewDiv('col', [iconrow])
   
   //row for temp data
   var temprow = makeNewDiv('row', [temperature, icon])

   //updated string
   var updated = makeNewText('h4', data.current_observation.observation_time, 'col')
   var uprow = makeNewDiv('row', [updated])

   var conditions = makeNewDiv('col-md-4 widget conditions', [temprow, uprow])

   return conditions
 }

  /*
 * MAKE_NEW_DIV
 * returns a new div element defined by params
 */
 function makeNewDiv(divClass, children)
 {
   var div = document.createElement('div')
   div.setAttribute('class', divClass)

   children.forEach( (child) => {
      div.appendChild(child)
   })

   return div
 }

/*
 * MAKE_NEW_FOOTER
 * returns a new footer
 */
 function makeNewFooter()
 {
   var wuLogo = document.createElement('img')
   wuLogo.setAttribute('src', 'http://icons.wxug.com/graphics/wu2/logo_130x80.png')
   wuLogo.setAttribute('class', 'img-responsive')

   var link = document.createElement('a')
   link.appendChild(wuLogo)
   link.setAttribute('href', 'http://www.wunderground.com')
   link.setAttribute('class', 'col')

   var footer = document.createElement('footer')
   footer.appendChild(link)
   footer.setAttribute('class', 'row')

   return footer
 }

 /*
 * MAKE_NEW_FORECAST
 * returns a new forecast widget defined by params
 */
 function makeNewForecast(data)
 {
   var row = document.createElement('div')
   row.setAttribute('class', 'row')

   var days = data.forecast.simpleforecast.forecastday

   var skippedFirst = false
   days.forEach( (day) => {
      if (skippedFirst)
      {
         console.log(day)
         var dateText = day.date.weekday + ', ' + day.date.day + ' ' + day.date.monthname
         var date = makeNewText('h2', dateText, 'col-md-12')
         var daterow = makeNewDiv('row', [date])

         var conditions = makeNewText('h3', day.conditions, 'col')
         var conrow = makeNewDiv('row', [conditions])

         var highText = 'High: ' + day.high.fahrenheit + ' (' + day.high.celsius + ')'
         var high = makeNewText('h3', highText, 'col-md-6')

         var lowText = 'Low: ' + day.low.fahrenheit + ' (' + day.low.celsius + ')'
         var low = makeNewText('h3', lowText, 'col-md-6')

         var temprow = makeNewDiv('row', [high, low])

         var col = makeNewDiv('col-md-4 day', [daterow, conrow, temprow])

         row.appendChild(col)
      }
      skippedFirst = true
   })

   var forecast = document.createElement('div')
   forecast.setAttribute('class', 'col-md-12 widget forecast')
   forecast.appendChild(row)

   return forecast
 }

 /*
 * MAKE_NEW_TEXT
 * returns a new text element defined by params
 */
 function makeNewText(element, nodeText, nodeClass)
 {
   var node = document.createElement(element)
   var text = document.createTextNode(nodeText)
   node.appendChild(text)
   node.setAttribute('class', nodeClass)

   return node
 }

 /*
 * NEW_Location
 * returns a new conditions defined by params
 */
 function newLocation()
 {
   //clear current data
   $('nav').empty()
   $('div.wuData').empty()
   //get new data
   postNewData(false)
 }