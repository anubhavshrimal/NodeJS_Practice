var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var models = require("./models");

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json()); //for fetching the data hidden in body packet eg. POST request form data or JSON
app.use(bodyParser.urlencoded({extended: true}));

app.post("/savepost", models.savePost);
app.get("/getpost", models.getPost);

app.listen(8080, function () {
   console.log("server started");
});