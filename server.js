var http = require("http")
var fs = require("fs")
var url = require("url")
var path = require("path")

var port = process.env.PORT || 9998

var server = http.createServer(function(request, response){
  var pathObj = url.parse(request.url, true)
  var query = pathObj.query
  var method = request.method
 

  try{
    var staticPath = path.resolve(__dirname)
    var filePath = path.join(staticPath, pathObj.pathname)
    var fileContent = fs.readFileSync(filePath, 'binary')
    response.setHeader("Content-Type", "html")
    response.write(fileContent, 'binary')
    response.end()
  } catch(error) {
    response.writeHead(404, 'Not Found')
    response.end()
  } 
})

server.listen(port)
console.log('监听成功')
