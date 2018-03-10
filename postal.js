module.exports = function getRate(type, weight, res)
{
   var result = calculateRate(type, weight)

   if (result == null)
   {
      res.writeHead(404)
      return res.end()
   }

   var params = {type: type, 
                 weight: weight, 
                 cost: result}

   return params
}

function calculateRate(type, weight)
{
   if (type == 'Letters (Stamped)') 
      return getStamped(weight)
   else if (type == 'Letters (Metered)') 
      return getMetered(weight)
   else if (type == 'Large Envelopes (Flats)') 
      return getFlats(weight)
   else if (type == 'Parcels') 
      return getParcels(weight)
}

function getStamped(weight)
{
   weight = Number(weight)

   if (weight <= 1) 
      return 0.50
   else if (weight <= 2) 
      return 0.71
   else if (weight <= 3) 
      return 0.92
   else
      return 1.13
}

function getMetered(weight)
{
   weight = Number(weight)

   if (weight <= 1) 
      return 0.47
   else if (weight <= 2) 
      return 0.68
   else if (weight <= 3) 
      return 0.89
   else
      return  1.10
}

function getFlats(weight)
{
   weight = Number(weight)

   if (weight <= 1) 
      return 1.00
   else if (weight <= 2) 
      return 1.21
   else if (weight <= 3) 
      return 1.42
   else if (weight <= 4) 
      return 1.63
   else if (weight <= 5) 
      return 1.84
   else if (weight <= 6) 
      return 2.05
   else if (weight <= 7) 
      return 2.26
   else if (weight <= 8) 
      return 2.47
   else if (weight <= 9) 
      return 2.68
   else if (weight <= 10) 
      return 2.89
   else if (weight <= 11) 
      return 3.10
   else if (weight <= 12) 
      return 3.31
   else
      return 3.52
}

function getParcels(weight)
{
   weight = Number(weight)

   if (weight <= 4) 
      return 3.50
   else if (weight <= 8) 
      return 3.75
   else if (weight <= 9) 
      return 4.10
   else if (weight <= 10) 
      return 4.45
   else if (weight <= 11) 
      return 4.80
   else if (weight <= 12) 
      return 5.15
   else
      return 5.50
}