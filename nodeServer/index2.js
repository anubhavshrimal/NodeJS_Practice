var express = require("express");
var app = express();


app.get("/", function(req, res){
	res.json({"name":"hello world"});
});
app.listen(8000);
