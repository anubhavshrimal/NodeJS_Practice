var http = require('http')
var requestHandler = function(req, res){
	res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
	res.end("hiii");
}
var server = http.createServer(requestHandler)

server.listen(8000, function(){
console.log("server started");
});
