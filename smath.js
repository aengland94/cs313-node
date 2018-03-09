var url = require('url')

module.exports = function doMath(req, res)
{
   var reqUrl = url.parse(req.url, true)

   var result = doOperation(reqUrl)

   if (result == null)
   {
      res.writeHead(404)
      return res.end()
   }

   var params = {operation: reqUrl.query.operation, 
                 num1: Number(reqUrl.query.num1), 
                 num2: Number(reqUrl.query.num2), 
                 result: result}

   return params
}

function doOperation(reqUrl)
{
   var op = reqUrl.query.operation.toLowerCase()

   if (op == 'add') 
      return Number(reqUrl.query.num1) + Number(reqUrl.query.num2)
   else if (op == 'subtract') 
      return Number(reqUrl.query.num1) + Number(reqUrl.query.num2)
   else if (op == 'multiply') 
      return Number(reqUrl.query.num1) * Number(reqUrl.query.num2)
   else if (op == 'divide') 
      return Number(reqUrl.query.num1) / Number(reqUrl.query.num2)
}