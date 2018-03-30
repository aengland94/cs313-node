
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
      $('button.forecast').remove()
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

   //make nav
   var nav = makeNav()

   document.body.appendChild(nav)

   postConditions()
}


/*
 * MAKE_NAV
 * returns the nav
 */
 function makeNav()
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
   var nav = document.createElement('nav')
   nav.appendChild(almanac)
   nav.appendChild(astronomy)
   nav.appendChild(conditions)
   nav.appendChild(forecast)
   nav.setAttribute('class', 'row')

   return nav
 }

/*
 * MAKE_NEW_ALMANAC
 * returns a new almanac widget defined by params
 */
 function makeNewAlmanac(data)
 {
   //Avg 
   var avg = document.createElement('h2')
   var avgText = document.createTextNode('Averages')
   avg.appendChild(avgText)
   avg.setAttribute('class', 'col')

   var avgrow = document.createElement('div')
   avgrow.setAttribute('class', 'row')
   avgrow.appendChild(avg)

   //Avg High
   var avgHigh = document.createElement('h4')
   var avgHighText = document.createTextNode('High: ' + data.almanac.temp_high.normal.F + ' (' + data.almanac.temp_high.normal.C + ')')
   avgHigh.appendChild(avgHighText)
   avgHigh.setAttribute('class', 'col')

   var avgHighrow = document.createElement('div')
   avgHighrow.setAttribute('class', 'row')
   avgHighrow.appendChild(avgHigh)

   //Avg Low
   var avgLow = document.createElement('h4')
   var avgLowText = document.createTextNode('Low:  ' + data.almanac.temp_low.normal.F + ' (' + data.almanac.temp_low.normal.C + ')')
   avgLow.appendChild(avgLowText)
   avgLow.setAttribute('class', 'col')

   var avgLowrow = document.createElement('div')
   avgLowrow.setAttribute('class', 'row')
   avgLowrow.appendChild(avgLow)

   //Avg col
   var avgcol = document.createElement('div')
   avgcol.appendChild(avgrow)
   avgcol.appendChild(avgHighrow)
   avgcol.appendChild(avgLowrow)
   avgcol.setAttribute('class', 'col')


   //Rec
   var rec = document.createElement('h2')
   var recText = document.createTextNode('Records')
   rec.appendChild(recText)
   rec.setAttribute('class', 'col')

   var recrow = document.createElement('div')
   recrow.setAttribute('class', 'row')
   recrow.appendChild(rec)

   //Rec High
   var recHigh = document.createElement('h4')
   var recHighText = document.createTextNode('High: ' + data.almanac.temp_high.record.F + ' (' + data.almanac.temp_high.record.C + ')')
   recHigh.appendChild(recHighText)
   recHigh.setAttribute('class', 'col')

   var recHighrow = document.createElement('div')
   recHighrow.setAttribute('class', 'row')
   recHighrow.appendChild(recHigh)

   //Rec Low
   var recLow = document.createElement('h4')
   var recLowText = document.createTextNode('Low:  ' + data.almanac.temp_low.record.F + ' (' + data.almanac.temp_low.record.C + ')')
   recLow.appendChild(recLowText)
   recLow.setAttribute('class', 'col')

   var recLowrow = document.createElement('div')
   recLowrow.setAttribute('class', 'row')
   recLowrow.appendChild(recLow)

   //Rec col
   var reccol = document.createElement('div')
   reccol.appendChild(recrow)
   reccol.appendChild(recHighrow)
   reccol.appendChild(recLowrow)
   reccol.setAttribute('class', 'col')

   var row = document.createElement('div')
   row.appendChild(avgcol)
   row.appendChild(reccol)
   row.setAttribute('class', 'row')

   var almanac = document.createElement('div')
   almanac.appendChild(row)
   almanac.setAttribute('class', 'col-md-4 widget almanac')

   return almanac
 }

 /*
 * MAKE_NEW_ASTRONOMY
 * returns a new astronomy widget defined by params
 */
 function makeNewAstronomy(data)
 {
   //Sun
   var sun = document.createElement('h2')
   var sunText = document.createTextNode('Sun')
   sun.appendChild(sunText)
   sun.setAttribute('class', 'col')

   var sunrow = document.createElement('div')
   sunrow.setAttribute('class', 'row')
   sunrow.appendChild(sun)

   //Sun rise
   var sunRise = document.createElement('h4')
   var sunRiseText = document.createTextNode('Rise: 0' + data.moon_phase.sunrise.hour + ':' + data.moon_phase.sunrise.minute)
   sunRise.appendChild(sunRiseText)
   sunRise.setAttribute('class', 'col')

   var sunRiserow = document.createElement('div')
   sunRiserow.setAttribute('class', 'row')
   sunRiserow.appendChild(sunRise)

   //Sun set
   var sunSet = document.createElement('h4')
   var sunSetText = document.createTextNode('Set: ' + data.moon_phase.sunset.hour + ':' + data.moon_phase.sunset.minute)
   sunSet.appendChild(sunSetText)
   sunSet.setAttribute('class', 'col')

   var sunSetrow = document.createElement('div')
   sunSetrow.setAttribute('class', 'row')
   sunSetrow.appendChild(sunSet)

   //Sun col
   var suncol = document.createElement('div')
   suncol.appendChild(sunrow)
   suncol.appendChild(sunRiserow)
   suncol.appendChild(sunSetrow)
   suncol.setAttribute('class', 'col')


   //Mon
   var mon = document.createElement('h2')
   var monText = document.createTextNode('Moon')
   mon.appendChild(monText)
   mon.setAttribute('class', 'col')

   var monrow = document.createElement('div')
   monrow.setAttribute('class', 'row')
   monrow.appendChild(mon)

   //Mon rise
   var monRise = document.createElement('h4')
   var monRiseText = document.createTextNode('Rise: ' + data.moon_phase.moonrise.hour + ':' + data.moon_phase.moonrise.minute)
   monRise.appendChild(monRiseText)
   monRise.setAttribute('class', 'col')

   var monRiserow = document.createElement('div')
   monRiserow.setAttribute('class', 'row')
   monRiserow.appendChild(monRise)

   //Mon set
   var monSet = document.createElement('h4')
   var monSetText = document.createTextNode('Set: 0' + data.moon_phase.moonset.hour + ':' + data.moon_phase.moonset.minute)
   monSet.appendChild(monSetText)
   monSet.setAttribute('class', 'col')

   var monSetrow = document.createElement('div')
   monSetrow.setAttribute('class', 'row')
   monSetrow.appendChild(monSet)

   //Mon col
   var moncol = document.createElement('div')
   moncol.appendChild(monrow)
   moncol.appendChild(monRiserow)
   moncol.appendChild(monSetrow)
   moncol.setAttribute('class', 'col')

   var row = document.createElement('div')
   row.appendChild(suncol)
   row.appendChild(moncol)
   row.setAttribute('class', 'row')

   var astronomy = document.createElement('div')
   astronomy.appendChild(row)
   astronomy.setAttribute('class', 'col-md-4 widget astronomy')

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

   //updated string
   var updated = document.createElement('h4')
   var updText = document.createTextNode(data.current_observation.observation_time)
   updated.appendChild(updText)
   updated.setAttribute('class', 'col')

   //update row
   var uprow = document.createElement('div')
   uprow.appendChild(updated)
   uprow.setAttribute('class', 'row')

   var conditions = document.createElement('div')
   conditions.appendChild(temprow)
   conditions.appendChild(uprow)
   conditions.setAttribute('class', 'col-md-4 widget conditions')

   return conditions
 }

 /*
 * MAKE_NEW_FORECAST
 * returns a new forecast widget defined by params
 */
 function makeNewForecast(data)
 {
   var forecast = document.createElement('div')

   return forecast
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